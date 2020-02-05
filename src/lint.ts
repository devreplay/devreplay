import { tryReadFile } from "./file";
import { IPattern } from "./patterns";
import { readPatternFile } from "./rulemanage";
import { getSource } from "./source";

export interface ILintOut {
    pattern: IPattern;
    snippet: string;
    position: {fileName: string; start: number; end: number};
}

export function lint(fileName: string, fileContents: string, ruleFileName?: string) {
    const fileSource = getSource(fileName);
    const patterns = readPatternFile(ruleFileName, fileSource);
    const adoptablePatterns = lintWithPattern(fileName, fileContents, patterns);

    return adoptablePatterns;
}

export function lintWithPattern(fileName: string, contents: string, patterns: IPattern[]) {
    const matched: ILintOut[] = [];
    for (const pattern of patterns) {

        if (!verifyPattern(pattern)) { continue; }
        const result = makeSnippetRegex(pattern.condition, contents);
        if (result !== undefined) {
            matched.push({pattern,
                          snippet: result[0],
                          position: makePatternPosition(fileName, result)});
        }
    }

    return matched;
}

export function fixWithPattern(fileContents: string, pattern: IPattern) {
    if (pattern.consequent.length === 0 || pattern.condition.length === 0) {
        return "";
    }
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_]+})?/gm;
    let consequent = pattern.consequent.join("\n").replace(dollar, (_, y) => (`\$<token${(parseInt(y, 10) + 1)}>`));
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

    return "";
}

function conditon2regex2(condition: string[]) {
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_]+})?/gm;
    let joinedCondition = condition.length < 2 ? condition[0] : condition.join("\n");

    const tokenIndex: number[] = [];
    joinedCondition = joinedCondition.replace(dollar, (x) => {
        const index = parseInt(x[1], 10) + 1;
        if (tokenIndex.includes(index)) {
            return `(\\k<token${index}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${index}>.+)`;
    });
    try {
        return new RegExp(joinedCondition, "gm");
    } catch (error) {
        return undefined;
    }
}


function conditon2regex(condition: string[]) {
    const dollar = /\${?(\d+)(:[a-zA-Z0-9_]+})?/gm;
    let joinedCondition = condition.length < 2 ? condition[0] : condition.join("\n");
    joinedCondition = joinedCondition.replace(dollar, (_, y) => (`\$${(parseInt(y, 10) + 1)}`));
    joinedCondition = joinedCondition.replace(/[<>*()?.]/g, "\\$&");

    const tokenIndex: number[] = [];
    joinedCondition = joinedCondition.replace(dollar, (x) => {
        const index = parseInt(x[1], 10);
        if (tokenIndex.includes(index)) {
            return `(\\k<token${tokenIndex.indexOf(index) + 1}>)`;
        }
        tokenIndex.push(index);

        return `(?<token${tokenIndex.indexOf(index) + 1}>.+)`;
    });
    try {
        return new RegExp(joinedCondition, "gm");
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

function verifyPattern(pattern: IPattern) {
    return Array.isArray(pattern.condition) && Array.isArray(pattern.consequent);
}

function makePatternPosition(fileName: string, result: RegExpExecArray) {
    const startChar = result.index;
    const startSlice = result.input.slice(undefined, startChar);
    const startLine = startSlice.split(/\r\n|\r|\n/).length;
    const endLine = startLine + result[0].split(/\r\n|\r|\n/).length - 1;

    return {fileName, start: startLine, end: endLine};
}

export function formatILintOut(matched: ILintOut) {
    return `${makeSeverity(matched.pattern.severity)}:${matched.position.fileName}:${matched.position.start}:${code2String(matched.pattern)}`;
}

export function makeSeverity(severity?: string) {
    if (severity === undefined) {
        return "W";
    }
    let outSeverity;
    if (severity.toUpperCase().startsWith("E")) {
        outSeverity = "E";
    } else if (severity.toUpperCase().startsWith("W")) {
        outSeverity = "W";
    } else if (severity.toUpperCase().startsWith("I")) {
        outSeverity = "I";
    } else if (severity.toUpperCase().startsWith("H")) {
        outSeverity = "H";
    } else {
        outSeverity = "W";
    }

    return outSeverity;
}

export function code2String(pattern: IPattern) {
    if (pattern.description !== undefined) {
        return pattern.description;
    }

    return `${pattern.condition.join("")} should be ${pattern.consequent.join("")}`;
}
