import { tryReadFile } from './file';
import { Pattern } from './patterns';
import { readPatternFile } from './ruleManager';
import { LintOut } from './output';
import { getInitPattern } from './extend';

export function lint(fileName: string, fileContents: string, ruleFileName?: string): LintOut[] {
    let patterns = readPatternFile(ruleFileName);
    if (patterns === []) {
        patterns = getInitPattern(fileName)
    }
    const adoptablePatterns = lintWithPattern(fileName, fileContents, patterns);

    return adoptablePatterns;
}

export function lintWithPattern(fileName: string, contents: string, patterns: Pattern[]): LintOut[] {
    const matched: LintOut[] = [];
    for (const pattern of patterns) {

        if (!verifyPattern(pattern)) { continue; }
        const result = makeSnippetRegex(pattern.before, contents, pattern.regex);
        if (result !== undefined) {
            matched.push({pattern,
                          snippet: result[0],
                          fileName,
                          position: makePatternPosition(result)});
        }
    }

    return matched;
}

export function fixWithPattern(fileContents: string, pattern: Pattern): string | undefined {
    if (pattern.after.length === 0 || pattern.before.length === 0) {
        return '';
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let after = pattern.after.join('\n').replace(dollar, (_, y) => (`$<token${(parseInt(y, 10) + 1)}>`));

    if (pattern.regex) {
        after = pattern.after[0];
    }
    const reBefore = before2regex2(pattern.before, pattern.regex);

    if (reBefore !== undefined) {
        const matchedStr = reBefore.exec(fileContents);
        if (matchedStr !== null) {
            return fileContents.replace(reBefore, after);
        }

        return undefined;
    }

    return undefined;
}

export function lintFromFile(fileName: string, ruleFileName?: string): LintOut[] {
    const fileContents = tryReadFile(fileName);
    if (fileContents !== undefined) {
        return lint(fileName, fileContents, ruleFileName);
    }

    return [];
}

export function fixFromFile(fileName: string, ruleFileName?: string): string | undefined {
    const fileContents = tryReadFile(fileName);
    if (fileContents !== undefined) {
        const problems = lint(fileName, fileContents, ruleFileName);
        if (problems.length !== 0) {
            return fixWithPattern(fileContents, problems[0].pattern);
        }
    }

    return '';
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
        const matchedStr = reBefore.exec(contents);
        if (matchedStr !== null) {
            return matchedStr;
        }

        return undefined;
    }

    return undefined;
}

function verifyPattern(pattern: Pattern) {
    return Array.isArray(pattern.before) && Array.isArray(pattern.after);
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
