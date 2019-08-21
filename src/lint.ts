/* tslint:disable no-console object-literal-sort-keys */
import { tryReadFile } from "./file";
import { IPattern } from "./patterns";
import { readPatternFile } from "./rulemanage";
import { getSource } from "./source";

export interface ILintOut {
    pattern: IPattern;
    snippet: string;
    position: {fileName: string, start: number, end: number};
}

export async function lint(fileName: string, fileContents: string, ruleFileName?: string) {
    const fileSource = getSource(fileName);
    if (fileSource) {
        const patterns = await readPatternFile(fileSource, ruleFileName);
        const pattern = getTriggarableCode(fileContents, patterns, fileName);
        return pattern;
    }
    return [];
}

export async function lintFromFile(fileName: string, ruleFileName?: string) {
    const fileContents = await tryReadFile(fileName);
    if (fileContents) {
        return await lint(fileName, fileContents, ruleFileName);
    }
    return [];
}

export async function lintAndFix(fileName: string, ruleFileName?: string) {
    const fileContents = await tryReadFile(fileName);
    if (fileContents) {
        const result = await lint(fileName, fileContents, ruleFileName);
        if (result !== undefined && result.length !== 0) {
            return await fixByLint(fileContents, result[0]);
        }
    }
    return "";
}

export async function fixByLint(fileContents: string, pattern: ILintOut) {
    if (pattern.pattern.consequent === undefined || pattern.pattern.condition === undefined) {
        return "";
    }
    const consequent = pattern.pattern.consequent.join("\n").replace(/\${?(\d+)(:[a-zA-Z_]+})?/gm,
                                                                    (x) => ("$" + (parseInt(x[1], 10) + 1).toString()));
    const reCondition = conditon2regex(pattern.pattern.condition);
    const matchedStr = reCondition.exec(fileContents);
    if (matchedStr == null) {
        return fileContents;
    } else {
        return fileContents.replace(reCondition, consequent);
    }
}

function conditon2regex(condition: string[]) {
    const dollar = /\${?(\d+)(:[a-zA-Z_]+})?/gm;
    let joinedCondition = condition.length < 2 ? condition[0] : condition.join("\n");
    joinedCondition = joinedCondition.replace(dollar, (x) => ("$" + (parseInt(x[1], 10) + 1).toString()));
    joinedCondition = joinedCondition.replace(/[<>*()?.]/g, "\\$&");

    const tokenIndex: string[] = [];
    joinedCondition = joinedCondition.replace(dollar, (x) => {
        if (tokenIndex.includes(x[1])) {
            return `(\\k<token${x[1]}>)`;
        } else {
            tokenIndex.push(x[1]);
            return `(?<token${x[1]}>.+)`;
        }
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
        if (result != null) {
            matched.push({pattern, snippet: result[0], position: makePatternPosition(fileName, result)});
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
    return `${matched.position.fileName}:${matched.position.start}:
            ${code2String(matched.pattern.condition, matched.pattern.consequent)}`;
}

export function code2String(condition: string[], consequent: string[]) {
    return `${condition.join("")} should be ${consequent.join("")}`;
}
