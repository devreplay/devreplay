/* tslint:disable no-console object-literal-sort-keys */
import { tryReadFile } from "./file";
import { ILintOut } from "./lintout";
import { getTriggarableCode, readPatternFile } from "./rulemanage";
import { getSource } from "./source";
import { IToken2String, ITokenPair } from "./token";
import { Tokenizer } from "./tokenizer/tokenizer";

export async function lint(fileName: string, fileContents: string, ruleFileName?: string) {
    const fileSource = getSource(fileName);
    const lintResults: ILintOut [] = [];
    if (fileSource) {
        const lineTokens = await makeTokens(fileContents);
        let lineIndex = 0;
        for (const tokens of lineTokens) {
            const patterns = await readPatternFile(fileSource, ruleFileName);
            const pattern = getTriggarableCode(tokens, patterns);
            if (pattern && pattern.code) {
                lintResults.push({fileName, line: lineIndex, pattern});
            }
            lineIndex++;
        }
    }
    return lintResults;
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
    if (!fileContents) {
        return "";
    }

    const lintResults = await lint(fileName, fileContents, ruleFileName);
    if (lintResults.length === 0) {
        return fileContents;
    }
    const lintResult = lintResults[0];
    const devideContents = fileContents.split("\n");
    const contents = await makeTokensWithLength(fileContents);
    if (contents.length < lintResult.line) {
        return "";
    }
    const line = contents[lintResult.line];
    devideContents[lintResult.line - 1] = IToken2String(fixLineByPattern(line, lintResult.pattern.code));

    return devideContents.join("\n");
}

export function fixLineByPattern(line: ITokenPair[], code: string[]) {
    const newTokens: ITokenPair[] = [];
    let startIndex = 0;
    let startPosition = line[0].start;

    for (let tokenIndex = 0; tokenIndex < line.length; tokenIndex++) {
        const token = line[tokenIndex].value;
        let isFound = false;
        const nextSpace = tokenIndex !== 0 ? line[tokenIndex].start - line[tokenIndex - 1].end : 0;

        if (startIndex >= code.length) {
            const currentTokens = makeTokenPosition([token], startPosition + nextSpace);
            startPosition = currentTokens.slice(-1)[0].end;
            newTokens.push(...currentTokens);
            continue;
        }
        const change = code[startIndex];
        const changeTokens = change.slice(2).split(" ");
        const codeLen = changeTokens.length;
        switch (change.slice(0, 1)) {
            case "+":
                const addedToken = makeTokenPosition(changeTokens, startPosition + nextSpace);
                newTokens.push(...addedToken);
                startPosition = addedToken.slice(-1)[0].end + 1;
                startIndex++;
                break;
            case "-":
                if (isSameArray(line.slice(tokenIndex, tokenIndex + codeLen), changeTokens)) {
                    tokenIndex += codeLen - 1;
                    isFound = true;
                }
                break;
            case "=":
                if (isSameArray(line.slice(tokenIndex, tokenIndex + codeLen), changeTokens)) {
                    const updatedToken = updateTokenPosition(line.slice(tokenIndex, tokenIndex + codeLen),
                                                             startPosition + nextSpace);
                    newTokens.push(...updatedToken);
                    startPosition = updatedToken.slice(-1)[0].end;
                    tokenIndex += codeLen - 1;
                    isFound = true;
                }
                break;
            case "*":
                const devidedChange = change.slice(2).split("-->");
                if (devidedChange.length < 2) {
                    break;
                }
                const beforeTokens = devidedChange[0].slice(undefined, -1).split(" ");
                const afterTokens = devidedChange[1].slice(1).split(" ");
                if (isSameArray(line.slice(tokenIndex, tokenIndex + beforeTokens.length), beforeTokens)) {
                    const replaceToken = makeTokenPosition(afterTokens, startPosition + nextSpace);
                    newTokens.push(...replaceToken);
                    startPosition = replaceToken.slice(-1)[0].end;
                    tokenIndex += beforeTokens.length - 1;
                    isFound = true;
                }
                break;
            default:
                break;
        }
        if (isFound) {
            startIndex++;
        } else {
            const currentTokens = makeTokenPosition([token], startPosition + nextSpace);
            startPosition = currentTokens.slice(-1)[0].end;
            newTokens.push(...currentTokens);
        }
    }

    if (startIndex <= code.length) {
        for (const change of code.slice(startIndex)) {
            if (change.slice(0, 1) !== "+") {
                break;
            }
            const changeTokens = change.slice(2).split(" ");
            const addedToken = makeTokenPosition(changeTokens, startPosition);
            newTokens.push(...addedToken);
            startPosition = addedToken.slice(-1)[0].end + 1;
            startIndex++;
        }
    }

    return newTokens;
}

function updateTokenPosition(tokens: ITokenPair[], start: number) {
    const newToken: ITokenPair[] = [];
    let currentPosition = start;
    let previousEnd = tokens[0].start;
    for (const token of tokens) {
        newToken.push({
            value: token.value,
            start: currentPosition + (token.start - previousEnd),
            end: currentPosition + token.value.length});
        previousEnd = token.end;
        currentPosition += token.value.length;
    }
    return newToken;
}

function makeTokenPosition(tokens: string[], start: number) {
    const newToken: ITokenPair[] = [];
    let currentPosition = start;
    for (const token of tokens) {
        newToken.push({
            value: token,
            start: currentPosition,
            end: currentPosition + token.length});
        currentPosition += token.length;
    }
    return newToken;
}

function isSameArray(array1: ITokenPair[], array2: string[]) {
    return array1.length === array2.length &&
    array1.every((value, index) => value.value === array2[index]);
}

async function makeTokens(fileContents: string) {
    const tokens: string[][] = [[]];
    for (const line of fileContents.split("\n")) {
        const lineTokenValue: string[] = [];
        const t = new Tokenizer();
        const lineTokens = t.tokenize(line);
        for (let i = 0; i < lineTokens.count; i += 1) {
            const currentToken = lineTokens.getItemAt(i);
            const token = line.slice(currentToken.start, currentToken.start + currentToken.length);
            lineTokenValue.push(token);
        }
        tokens.push(lineTokenValue);
    }
    return tokens;
}

async function makeTokensWithLength(fileContents: string) {
    const tokens: ITokenPair[][] = [[]];
    for (const line of fileContents.split("\n")) {
        const lineTokenValue: ITokenPair[] = [];
        const t = new Tokenizer();
        const lineTokens = t.tokenize(line);
        for (let i = 0; i < lineTokens.count; i += 1) {
            const currentToken = lineTokens.getItemAt(i);
            const token = line.slice(currentToken.start, currentToken.end);
            const newToken: ITokenPair = {value: token,
                start: currentToken.start,
                end: currentToken.end};
            lineTokenValue.push(newToken);
        }
        tokens.push(lineTokenValue);
    }
    return tokens;
}
