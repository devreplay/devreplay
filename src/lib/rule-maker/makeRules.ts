import { tokenize, Token, strDiff2treeDiff } from './code-parser';
import { Rule, isEmptyRule, ruleJoin } from './rule';
import { Chunk, makeDiffObj } from './diffparser';
import { DetailedDiff } from './gitMiner';

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
export async function makeRulesFromDetailedDiffs(logs: DetailedDiff[]): Promise<Rule[]> {
    let allRules: Rule[] = [];
    for (const log of logs) {
        let rules = await makeRulesFromDiff(log.diff);
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
export async function makeRulesFromDiffs(diffs: string[]): Promise<Rule[]> {
    let allRules: Rule[] = [];
    for (const diff of diffs) {
        let rules = await makeRulesFromDiff(diff);
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
export async function makeRulesFromDiff(diff: string): Promise<Rule[]> {
    const chunks = makeDiffObj(diff);
    const rules: Rule[] = [];
    for (const chunk of chunks) {
        const rule = await makeRules(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source);
        if (rule === undefined) {
            continue;
        }
        if (!isEmptyRule(rule.before) && !isEmptyRule(rule.after)) {
            rules.push(rule);
        }
    }
    return rules;
}

// /**
//  * Generate rules from source code diff chunk
//  * @param chunk Code chunk that has before and after changed code
//  */
export async function makeRulesFromChunk(chunk: Chunk): Promise<Rule | undefined> {
    const change = await strDiff2treeDiff(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source);
    let rule = {
        before: chunk.deleted,
        after: chunk.added
    };
    if (change === undefined) {
        return;
    }
    rule = {
        before: change.before,
        after: change.after
    };
    const { before, after } = formatRules(rule.before, rule.after);

    return {
        before: before,
        after: after,
        matchCase: true
    };
    // return makeRules(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source); 
}

/**
 * Make rules from changed content
 * @param deletedContents Deleted source code string
 * @param addedContents Added source code string
 * @param source Source code language
 */
export async function makeRules(deletedContents: string, addedContents: string, source: string): Promise<Rule|undefined> {
    const change = await strDiff2treeDiff(deletedContents, addedContents, source);
    if (change === undefined) {
        return;
    }

    const before = await tokenize(change.before.join('\n'), source);
    const after = await tokenize(change.after.join('\n'), source);
    const identifiers = makeCommonIdentifiers(before, after);
    if (identifiers.length === 0) {
        return {
            before: change.before.length === 1 ? change.before[0] : change.before,
            after: change.after.length === 1 ? change.after[0] : change.after,
            matchCase: true
        };
    }
    return tokens2Rules(before, after, identifiers);
}

function makeCommonIdentifiers(tokens: Token[], tokens2: Token[]): string[] {
    const tokenTexts = tokens.filter(x => x.type === 'identifier').map(x => x.text);
    const tokenTexts2 = tokens2.filter(x => x.type === 'identifier').map(x => x.text);
    const originalSet = new Set(tokenTexts);
    const diff = new Set([...tokenTexts2].filter(x => originalSet.has(x)));
    return Array.from(diff);
}

function tokens2Rules(before: Token[], after: Token[], commonIdentifiers: string[]): Rule {

    let beforeStr = '';
    const usedIdentifiers: string[] = [];
    let prevColumn = undefined;

    for (const token of before) {
        if (prevColumn === undefined) {
            prevColumn = token.range.start.column;
        }
        const columnDiff = token.range.start.column - prevColumn;
        if (columnDiff > 0) {
            beforeStr += '\\s*';
        }
        prevColumn = token.range.end.column;

        if (token.type === 'identifier' && commonIdentifiers.includes(token.text)) {
            if (usedIdentifiers.includes(token.text)) {
                beforeStr += `\\k<${token.text}>`;
            } else {
                beforeStr += `(?<${token.text}>\\w+)`;
                usedIdentifiers.push(token.text);
            }
        } else {
            beforeStr += escapeRegExpCharacters(token.text);
        }
    }

    let afterStr = '';
    prevColumn = undefined;
    for (const token of after) {
        if (prevColumn === undefined) {
            prevColumn = token.range.start.column;
        }
        const columnDiff = token.range.start.column - prevColumn;
        if (columnDiff > 0) {
            afterStr += ' '.repeat(columnDiff);
        }
        prevColumn = token.range.end.column;

        if (token.type === 'identifier' && commonIdentifiers.includes(token.text)) {
            const identIndex = commonIdentifiers.indexOf(token.text) + 1;
            afterStr += `$${identIndex}`;
        } else {
            afterStr += token.text;
        }

    }


    return {
        before: beforeStr,
        after: afterStr,
        isRegex: true,
        matchCase: true
    };
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

/**
 * Escapes regular expression characters in a given string
 */
 function escapeRegExpCharacters(value: string): string {
	return value.replace(/[\\{}*+?|^$.[\]()]/g, '\\$&');
}