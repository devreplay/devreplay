import { tryReadFile } from './file';
import { Rule } from './rule-maker/rule';
import { readRuleFile } from './ruleManager';
import { LintOut } from './output';
import { getInitRules } from './extend';

export function lint(fileNames: string[], ruleFileName?: string): LintOut[] {
    let rules = readRuleFile(ruleFileName);
    if (rules === []) {
        if (fileNames.length > 0) {
            rules = getInitRules(fileNames[0]);
        } else{
            return [];
        }
    }

    const out: LintOut[] = [];
    for (const fileName of fileNames) {
        const fileContents = tryReadFile(fileName);
        if (fileContents === undefined) {
            continue;
        }
        const lintResult = lintWithRules(fileName, fileContents, rules);
        out.push(...lintResult);
    }

    return out;
}

export function lintWithRules(fileName: string, contents: string, rules: Rule[]): LintOut[] {
    const matched: LintOut[] = [];
    for (const rule of rules) {

        if (!verifyPattern(rule)) { continue; }
        const matchedResult = makeSnippetRegex(rule.before, contents, rule.regex);
        for (const result of matchedResult) {
            matched.push({rule: rule,
                snippet: result[0],
                fileName,
                position: makePatternPosition(result)});
        }
    }

    return matched;
}

export function fix(fileName: string, ruleFileName?: string): string {
    let rules = readRuleFile(ruleFileName);
    if (rules === []) {
        rules = getInitRules(fileName);
    }

    const fileContents = tryReadFile(fileName);
    if (fileContents === undefined) {
        throw new Error(`Failed to read ${fileName}`);
    }
    const lintResult = lintWithRules(fileName, fileContents, rules);
    const detectedRules = lintResult.map(x => { return x.rule; });
    let fixedContents = fileContents;
    for (const rule of detectedRules) {
        fixedContents = fixWithRule(fixedContents, rule);
    }

    return fixedContents;
}

export function fixWithRule(fileContents: string, rule: Rule): string {
    if (rule.after.length === 0 || rule.before.length === 0) {
        return fileContents;
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let after = rule.after.join('\n').replace(dollar, (_, y) => (`$<token${(parseInt(y, 10) + 1)}>`));

    if (rule.regex) {
        after = rule.after[0];
    }
    const reBefore = before2regex2(rule.before, rule.regex);

    if (reBefore !== undefined) {
        const matchedStr = reBefore.exec(fileContents);
        if (matchedStr !== null) {
            return fileContents.replace(reBefore, after);
        }

        return fileContents;
    }

    return fileContents;
}

function before2regex2(before: string[], regex?: boolean) {
    if (regex) {
        return new RegExp(before[0], 'gm');
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let joinedBefore = before.length < 2 ? before[0] : before.join('\n');
    joinedBefore = joinedBefore.replace(dollar, (_, y) => (`$${(parseInt(y, 10) + 1)}`));
    joinedBefore = joinedBefore.replace(/[<>*()?.[\]]/g, '\\$&');

    const tokenIndex: number[] = [];
    joinedBefore = joinedBefore.replace(dollar, (x) => {
        const index = parseInt(x[1], 10);
        if (tokenIndex.includes(index)) {
            return `(\\k<token${index}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${index}>[\\w.]+)`;
    });
    try {
        return new RegExp(joinedBefore, 'gm');
    } catch (error) {
        return undefined;
    }
}

function before2regex(before: string[], regex?: boolean) {
    if (regex) {
        return new RegExp(before[0], 'gm');
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let joinedBefore = before.length < 2 ? before[0] : before.join('\n');
    joinedBefore = joinedBefore.replace(dollar, (_, y) => (`$${(parseInt(y, 10) + 1)}`));
    joinedBefore = joinedBefore.replace(/[<>*()?.[\]]/g, '\\$&');

    const tokenIndex: number[] = [];
    joinedBefore = joinedBefore.replace(dollar, (x) => {
        const index = parseInt(x[1], 10);
        if (tokenIndex.includes(index)) {
            return `(\\k<token${tokenIndex.indexOf(index) + 1}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${tokenIndex.indexOf(index) + 1}>[\\w.]+)`;
    });
    try {
        return new RegExp(joinedBefore, 'gm');
    } catch (error) {
        return undefined;
    }
}

function makeSnippetRegex(before: string[], contents: string, regex?: boolean) {
    const reBefore = before2regex(before, regex);
    if (reBefore !== undefined) {
        let match: RegExpExecArray | null;
        const matches: RegExpExecArray[] = [];
        while ((match = reBefore.exec(contents)) !== null) {
            matches.push(match);
        }
        return matches;
    }

    return [];
}

// function findMatchecContents(before: string[], contents: string, regex?: boolean) {
//     // コンテンツをtext mate化する

//     // トークンの並びで評価
    
//     const reBefore = before2regex(before, regex);
//     if (reBefore !== undefined) {
//         let match: RegExpExecArray | null;
//         const matches: RegExpExecArray[] = []
//         while ((match = reBefore.exec(contents)) !== null) {
//             matches.push(match);
//         }
//         return matches
//     }

//     return [];
// }


function verifyPattern(rule: Rule) {
    return Array.isArray(rule.before) && Array.isArray(rule.after);
}

function makePatternPosition(result: RegExpExecArray) {
    const startIndex = result.index;
    const headSlice = result.input.slice(undefined, startIndex).split(/\r\n|\r|\n/);
    const startLine = headSlice.length;
    const startChar = startLine === 1 ?
                      startIndex + 1 - headSlice.slice(undefined, -1).join('\n').length:
                      startIndex - headSlice.slice(undefined, -1).join('\n').length;
    const matchedSlice = result[0].split(/\r\n|\r|\n/);
    const endLine = startLine + matchedSlice.length - 1;
    const endChar = startLine === endLine ?
                    startChar + matchedSlice[matchedSlice.length - 1].length :
                    1 + matchedSlice[matchedSlice.length - 1].length;

    return {
        start:{
            line: startLine,
            character: startChar
        }, 
        end: {
            line: endLine,
            character: endChar
        }};
}
