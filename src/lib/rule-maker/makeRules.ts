import { tokenize, Token } from 'source-code-tokenizer';

import { Rule, isEmptyRule, ruleJoin } from './rule';
import { Chunk, makeDiffObj } from './diffparser';
import { DetailedDiff } from './gitMiner';
import { strDiff2treeDiff } from './code-parser';

/** Token identifier */
export interface Identifier {
    /** Concrete element value */
    value: string;
    /** Element category in the abstracted syntax tree */
    scope: string;
}

/**
 * Generate rule from git diff information
 * @param logs git diff log
 */
export function makeRulesFromDetailedDiffs(logs: DetailedDiff[]): Rule[] {
    let allRules: Rule[] = [];
    for (const log of logs) {
        let rules = makeRulesFromDiff(log.diff);
        rules = rules.map(rule => {
            rule.author = log.log.author_name;
            rule.message = log.log.message;
            rule.ruleId = log.log.hash;
            delete rule.identifiers;
            return rule;
        });

        allRules = allRules.concat(rules);
    }
    allRules = filterSameRules(allRules);

    return allRules;
}

/**
 * Generate rules from concrate diff
 * @param diffs diffs in the one changes
 */
export function makeRulesFromDiffs(diffs: string[]): Rule[] {
    let allRules: Rule[] = [];
    for (const diff of diffs) {
        let rules = makeRulesFromDiff(diff);
        rules = rules
        .map(rule => {
            delete rule.identifiers;
            return rule;
        });

        allRules = allRules.concat(rules);
    }
    allRules = filterSameRules(allRules);

    return allRules;
}

/**
 * Make rules from diff contnt
 * @param diff Git diff
 */
export function makeRulesFromDiff(diff: string): Rule[] {
    const chunks = makeDiffObj(diff);
    const rules: Rule[] = [];
    for (const chunk of chunks) {
        const rule = makeRulesFromChunk(chunk);
        if (rule === undefined) {
            continue;
        }
        if (!isEmptyRule(rule.before) && !isEmptyRule(rule.after)) {
            rules.push(rule);
        }
    }
    return rules;
}

/**
 * Generate rules from source code diff chunk
 * @param chunk Code chunk that has before and after changed code
 */
export function makeRulesFromChunk(chunk: Chunk): Rule | undefined {
    const change = strDiff2treeDiff(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source);
    let rule = {
        before: chunk.deleted,
        after: chunk.added
    };
    if (change === undefined) {
        return;
    }
    rule = {
        before: change.before.split('\n'),
        after: change.after.split('\n')
    };
    const { before, after } = formatRules(rule.before, rule.after);

    return {
        before: before,
        after: after
    };
    // return makeRules(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source); 
}

/**
 * Make rules from changed content
 * @param deletedContents Deleted source code string
 * @param addedContents Added source code string
 * @param source Source code language
 */
export async function makeRules(deletedContents?: string, addedContents?: string, source?: string): Promise<Rule|undefined> {
    if (deletedContents === undefined || addedContents === undefined || source === undefined) {
        return undefined;
    }

    const beforeTokens = await tokenize(deletedContents, source);
    const afterTokens = await tokenize(addedContents, source);

    if (beforeTokens === undefined || afterTokens === undefined) {
        return undefined;
    }

    // MEMO Remove comment token and lines

    // 1 token changep rule
    const identifiers: Identifier[] = collectCommonIdentifiers(beforeTokens.tokens, afterTokens.tokens);

    if (identifiers.length > 0) {
        const diffs = getSingleDiff(beforeTokens.tokens, afterTokens.tokens);
        if (diffs.length === 1) {
            if (isAbstractable(diffs[0].before)) {
                return {
                    before: [diffs[0].before.value],
                    after: [diffs[0].after.value]
                };
            }
        }
    }

    // MEMO Minimum AST change rule
    

    // 1 line change rule
    const deletedLines = deletedContents.split('\n');
    const addedLines = addedContents.split('\n');
    if (deletedLines.length !== 1 && addedLines.length !== 1){
        const lineDiffs = getSingleLineDiff(deletedLines, addedLines);
        if (lineDiffs.length === 1) {
            return makeRules(lineDiffs[0].before, lineDiffs[0].after, source);
        }
    }

    // Multi line change rule
    const beforeRules = makeAbstractedCode(beforeTokens.tokens, identifiers);
    const afterRules = makeAbstractedCode(afterTokens.tokens, identifiers);

    const { before, after } = formatRules(beforeRules, afterRules);

    return {
        before: before,
        after: after
    };
}

function collectCommonIdentifiers(beforeTokens: Token[], afterTokens: Token[]) {
    const identifiers: Identifier[] = [];
    for (const beforeToken of beforeTokens) {
        if (!(checkInIdentifiers(identifiers, beforeToken) === undefined &&
            isAbstractable(beforeToken))) {
            continue;
        }
        const beforeScope = beforeToken.scopes[beforeToken.scopes.length - 1];
        for (const afterToken of afterTokens) {
            const afterScope = afterToken.scopes[afterToken.scopes.length - 1];
            if (beforeToken.value === afterToken.value && beforeScope === afterScope){
                identifiers.push({
                    value: beforeToken.value,
                    scope: beforeScope
                });
            }
        }
    }
    return identifiers;
}


/**
 * Generate original string list from tokens.
 * @param tokens Original string tokens
 * @param identifiers Identifiers that are included in tokens
 */
function makeAbstractedCode(tokens: Token[], identifiers: Identifier[]) {
    const rules: string[] = [];
    let previousPosition = 1;
    let previousLine = 0;
    let lineContents = '';
    for (const token of tokens) {
        if (previousLine === 0) {
            previousLine = token.line;
        }

        if (token.line !== previousLine) {
            rules.push(lineContents);
            previousPosition = 1;
            previousLine = token.line;
            lineContents = '';
        }

        const spaceNum = token.columns.start - previousPosition;
        previousPosition = token.columns.end;
        const identIndex = checkInIdentifiers(identifiers, token);
        if (identIndex !== undefined) {
            const abstractedToken = token.scopes[token.scopes.length - 1].split('.')[0];
            lineContents += ' '.repeat(spaceNum) + `\${${identIndex}:${abstractedToken}}`;
        } else {
            lineContents += ' '.repeat(spaceNum) + token.value;
        }
    }
    rules.push(lineContents);
    return rules;
}


function checkInIdentifiers(identifiers: Identifier[], token: Token) {
    let identIndex = 1;
    const scope = token.scopes[token.scopes.length - 1];
    for (const identifier of identifiers) {
        if (token.value === identifier.value &&
            scope === identifier.scope) {
                return identIndex;
        }
        identIndex++;
    }
    return undefined;
}

function isAbstractable(token: Token) {
    const scope = token.scopes[token.scopes.length - 1];
    const isAlphanumeric = /^([a-zA-Z][a-zA-Z0-9]*)|[0-9]+$/i.exec(token.value);
    return isAlphanumeric && ['keyword', 'builtin', 'strage'].every(x => !scope.includes(x));
}

function getSingleDiff(beforeTokens: Token[], afterTokens: Token[]) {
    const differentTokens: {before: Token, after: Token}[] = [];

    for (let index = 0; index < Math.min(beforeTokens.length, afterTokens.length); index++) {
        const beforeToken = beforeTokens[index];
        const afterToken = afterTokens[index];
        if (beforeToken.value !== afterToken.value) {
            differentTokens.push({before: beforeToken, after: afterToken});
        }
    }

    return differentTokens;
}

/**
 * Collecting different tokens from single line code tokens
 * @param beforeTokens Prechanged code tokens
 * @param afterTokens Changed code tokens
 */
function getSingleLineDiff(beforeTokens: string[], afterTokens: string[]) {
    const differentTokens: {before: string, after: string}[] = [];

    for (let index = 0; index < Math.min(beforeTokens.length, afterTokens.length); index++) {
        const beforeToken = beforeTokens[index];
        const afterToken = afterTokens[index];
        if (beforeToken !== afterToken) {
            differentTokens.push({before: beforeToken, after: afterToken});
        }
    }

    return differentTokens;
}

/**
 * Make the unique rules from rule list
 * @param rules rule list
 */
export function filterSameRules(rules: Rule[]): Rule[] {
    const uniqueRules: Rule[] = [];
    for (const rule of rules) {
        if (!uniqueRules.some(x => {
            return (
                ruleJoin(x.after) === ruleJoin(rule.after) &&
                ruleJoin(x.before) === ruleJoin(rule.before));       
        })){
            uniqueRules.push(rule);
        }
    }
    return uniqueRules;
}


/**
 * Remove redundant rule spaces
 * @param before Search code
 * @param after Replace code
 */
function formatRules(before: string[], after: string[]) {
    const minSpace = Math.min(countSpace(before), countSpace(after));
    const formatBefore = [];
    for (const line of before) {
        const slicedLine = line.slice(minSpace);
        if (line.length === 0 || /^\s*$/.test(line)) {
            continue;
        }
        formatBefore.push(slicedLine);
    }
    const formatAfter = [];
    for (const line of after) {
        const slicedLine = line.slice(minSpace);
        if (line.length === 0 || /^\s*$/.test(line)) {
            continue;
        }
        formatAfter.push(slicedLine);
    }
    return {before: formatBefore, after: formatAfter};
}

/**
 * Counting minimize spaces from code lines
 * @param ruleLines Rule code lines
 */
function countSpace(ruleLines: string[]) {
    const spaces: number[] = [];
    for (const ruleLine of ruleLines) {
        if (ruleLine.length === 0) { continue; } 
        let spaceNum = 0;
        for (const character of ruleLine) {
            if (character === ' ' || character === '\t') {
                spaceNum++;
            } else {
                break;
            }
        }
        spaces.push(spaceNum);
    }
    return Math.min(...spaces);
}