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
    if (fileSource !== undefined) {
        const patterns = readPatternFile(fileSource, ruleFileName);
        const pattern = getTriggarableCode(fileContents, patterns, fileName);

        return pattern;
    }

    return [];
}

export function lintWithPattern(fileName: string, fileContents: string, patterns: IPattern[]) {
    const fileSource = getSource(fileName);
    if (fileSource !== undefined) {
        const pattern = getTriggarableCode(fileContents, patterns, fileName);

        return pattern;
    }

    return [];
}

export function fixWithPattern(fileName: string, fileContents: string, patterns: IPattern[]) {
    const out: Array<[string, ILintOut]> = [];
    const results = lintWithPattern(fileName, fileContents, patterns);
    for (const result of results) {
        out.push([fixByLint(fileContents, result), result]);
    }

    return out;
}

export function lintFromFile(fileName: string, ruleFileName?: string) {
    const fileContents = tryReadFile(fileName);
    if (fileContents !== undefined) {
        return lint(fileName, fileContents, ruleFileName);
    }

    return [];
}

export function lintAndFix(fileName: string, ruleFileName?: string) {
    const fileContents = tryReadFile(fileName);
    if (fileContents !== undefined) {
        const result = lint(fileName, fileContents, ruleFileName);
        if (result.length !== 0) {
            return fixByLint(fileContents, result[0]);
        }
    }

    return "";
}

export function fixByLint(fileContents: string, pattern: ILintOut) {
    if (pattern.pattern.consequent.length === 0 || pattern.pattern.condition.length === 0) {
        return "";
    }
    const consequent = pattern.pattern.consequent.join("\n")
                                                 .replace(/\${?(\d+)(:[a-zA-Z_]+})?/gm,
                                                          (_, y) => (`\$${(parseInt(y, 10) + 1)}`));
    const reCondition = conditon2regex(pattern.pattern.condition);
    const matchedStr = reCondition.exec(fileContents);
    if (matchedStr === null) {
        return fileContents;
    }

    return fileContents.replace(reCondition, consequent);
}

function conditon2regex(condition: string[]) {
    const dollar = /\${?(\d+)(:[a-zA-Z_]+})?/gm;
    let joinedCondition = condition.length < 2 ? condition[0] : condition.join("\n");
    joinedCondition = joinedCondition.replace(dollar, (_, y) => (`\$${(parseInt(y, 10) + 1)}`));
    joinedCondition = joinedCondition.replace(/[<>*()?.]/g, "\\$&");

    const tokenIndex: string[] = [];
    joinedCondition = joinedCondition.replace(dollar, (x) => {
        if (tokenIndex.includes(x[1])) {
            return `(\\k<token${x[1]}>)`;
        }
        tokenIndex.push(x[1]);

        return `(?<token${x[1]}>.+)`;
    });

    return new RegExp(joinedCondition, "gm");
}

function makeSnippetRegex(condition: string[], contents: string) {
    const reCondition = conditon2regex(condition);

    return reCondition.exec(contents);
}

function getTriggarableCode(contents: string, patterns: IPattern[], fileName: string) {
    const matched: ILintOut[] = [];
    for (const pattern of patterns) {

        if (!verifyPattern(pattern)) { continue; }
        const result = makeSnippetRegex(pattern.condition, contents);
        if (result !== null) {
            matched.push({pattern,
                          snippet: result[0],
                          position: makePatternPosition(fileName, result)});
        }
    }

    return matched;
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
    return `${makeSeverity(matched.pattern.severity)}:${matched.position.fileName}:${matched.position.start}:
            ${code2String(matched.pattern)}`;
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
