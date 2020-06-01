import { tryReadFile } from './file';
import { Pattern } from './patterns';
import { readPatternFile } from './rulemanage';
import { LintOut } from './output';

export function lint(fileName: string, fileContents: string, ruleFileName?: string) {
    const patterns = readPatternFile(fileName, ruleFileName);
    const adoptablePatterns = lintWithPattern(fileName, fileContents, patterns);

    return adoptablePatterns;
}

export function lintWithPattern(fileName: string, contents: string, patterns: Pattern[]) {
    const matched: LintOut[] = [];
    for (const pattern of patterns) {

        if (!verifyPattern(pattern)) { continue; }
        const result = makeSnippetRegex(pattern.condition, contents);
        if (result !== undefined) {
            matched.push({pattern,
                          snippet: result[0],
                          fileName,
                          position: makePatternPosition(result)});
        }
    }

    return matched;
}

export function fixWithPattern(fileContents: string, pattern: Pattern) {
    if (pattern.consequent.length === 0 || pattern.condition.length === 0) {
        return '';
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    const consequent = pattern.consequent.join('\n').replace(dollar, (_, y) => (`\$<token${(parseInt(y, 10) + 1)}>`));
    const reCondition = conditon2regex2(pattern.condition);

    if (reCondition !== undefined) {
        const matchedStr = reCondition.exec(fileContents);
        if (matchedStr !== null) {
            return fileContents.replace(reCondition, consequent);
        }

        return undefined;
    }

    return undefined;
}

export function lintFromFile(fileName: string, ruleFileName?: string) {
    const fileContents = tryReadFile(fileName);
    if (fileContents !== undefined) {
        return lint(fileName, fileContents, ruleFileName);
    }

    return [];
}

export function fixFromFile(fileName: string, ruleFileName?: string) {
    const fileContents = tryReadFile(fileName);
    if (fileContents !== undefined) {
        const problems = lint(fileName, fileContents, ruleFileName);
        if (problems.length !== 0) {
            return fixWithPattern(fileContents, problems[0].pattern);
        }
    }

    return '';
}

function conditon2regex2(condition: string[]) {
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let joinedCondition = condition.length < 2 ? condition[0] : condition.join('\n');
    joinedCondition = joinedCondition.replace(dollar, (_, y) => (`\$${(parseInt(y, 10) + 1)}`));
    joinedCondition = joinedCondition.replace(/[<>*()?.\[\]]/g, '\\$&');

    const tokenIndex: number[] = [];
    joinedCondition = joinedCondition.replace(dollar, (x) => {
        const index = parseInt(x[1], 10);
        if (tokenIndex.includes(index)) {
            return `(\\k<token${index}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${index}>[\\w\.]+)`;
    });
    try {
        return new RegExp(joinedCondition, 'gm');
    } catch (error) {
        return undefined;
    }
}

function conditon2regex(condition: string[]) {
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_.]+})?/gm;
    let joinedCondition = condition.length < 2 ? condition[0] : condition.join('\n');
    joinedCondition = joinedCondition.replace(dollar, (_, y) => (`\$${(parseInt(y, 10) + 1)}`));
    joinedCondition = joinedCondition.replace(/[<>*()?.\[\]]/g, '\\$&');

    const tokenIndex: number[] = [];
    joinedCondition = joinedCondition.replace(dollar, (x) => {
        const index = parseInt(x[1], 10);
        if (tokenIndex.includes(index)) {
            return `(\\k<token${tokenIndex.indexOf(index) + 1}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${tokenIndex.indexOf(index) + 1}>[\\w\.]+)`;
    });
    try {
        return new RegExp(joinedCondition, 'gm');
    } catch (error) {
        return undefined;
    }
}

function makeSnippetRegex(condition: string[], contents: string) {
    const reCondition = conditon2regex(condition);
    if (reCondition !== undefined) {
        const matchedStr = reCondition.exec(contents);
        if (matchedStr !== null) {
            return matchedStr;
        }

        return undefined;
    }

    return undefined;
}

function verifyPattern(pattern: Pattern) {
    return Array.isArray(pattern.condition) && Array.isArray(pattern.consequent);
}

function makePatternPosition(result: RegExpExecArray) {
    const startIndex = result.index;
    const headSlice = result.input.slice(undefined, startIndex).split(/\r\n|\r|\n/);
    const startLine = headSlice.length;
    const startChar = startIndex - headSlice.slice(undefined, -1).join('\n').length;
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
