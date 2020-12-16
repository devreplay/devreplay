import { tokenize, Token } from 'source-code-tokenizer';

import { Rule } from './rule';
import { Chunk, makeDiffObj } from './diffparser';
import { DetailedDiff } from './gitMiner';

export interface Identifier {
    value: string;
    scope: string;
}

export async function makeRulesFromDetailedDiffs(logs: DetailedDiff[]): Promise<Rule[]> {
    let allRules: Rule[] = [];
    for (const log of logs) {
        let rules = await makeRulesFromDiff(log.diff);
        rules = rules.map(rule => {
            rule.author = log.log.author_name;
            rule.message = log.log.message;
            rule.ruleId = log.log.hash;
            delete rule.identifiers;
            delete rule.scopeName;
            return rule;
        });

        allRules = allRules.concat(rules);
    }
    allRules = filterSameRules(allRules);

    return allRules;
}

export async function makeRulesFromDiffs(diffs: string[]): Promise<Rule[]> {
    let allRules: Rule[] = [];
    for (const diff of diffs) {
        let rules = await makeRulesFromDiff(diff);
        rules = rules
        .map(rule => {
            delete rule.identifiers;
            delete rule.scopeName;
            return rule;
        });

        allRules = allRules.concat(rules);
    }
    allRules = filterSameRules(allRules);

    return allRules;
}

export async function makeRulesFromDiff(diff: string): Promise<Rule[]> {
    const chunks = makeDiffObj(diff);
    const rules: Rule[] = [];
    for (const chunk of chunks) {
        const rule = await makeRulesFromChunk(chunk);
        if (rule !== undefined && !isEmptyRule(rule.before) && !isEmptyRule(rule.after)) {
            rules.push(rule);
        }
    }
    return rules;
}

export function makeRulesFromChunk(chunk: Chunk): Promise<Rule | undefined> {
    return makeRules(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source); 
}

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
                    after: [diffs[0].after.value],
                    scopeName: source
                };
            }
        }
    }

    // MEMO Minimum AST change rule
    

    // 1 line change rule
    const deletedLines = deletedContents.split('\n')
    const addedLines = addedContents.split('\n')
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
        after: after,
        scopeName: source
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

function isEmptyRule(rule: string[]) {
    return rule.length === 1 && rule[0] === '';
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

function filterSameRules(rules: Rule[]) {
    const uniqueRules: Rule[] = [];
    for (const rule of rules) {
        if (!uniqueRules.some(x => {
            return (
                x.after.join('\n') === rule.after.join('\n') &&
                x.before.join('\n') === rule.before.join('\n'));       
        })){
            uniqueRules.push(rule);
        }
    }
    return uniqueRules;
}


function formatRules(before: string[], after: string[]) {
    const minSpace = Math.min(countSpace(before), countSpace(after));
    const formatBefore = [];
    for (const line of before) {
        formatBefore.push(line.slice(minSpace));
    }
    const formatAfter = [];
    for (const line of after) {
        formatAfter.push(line.slice(minSpace));
    }
    return {before: formatBefore, after: formatAfter};
}

function countSpace(ruleLines: string[]) {
    const spaces: number[] = [];
    for (const ruleLine of ruleLines) {
        if (ruleLine === '') { continue; } 
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