import { tryReadFile } from "./file";
import { ILintOut } from "./lintout";
import { getTriggarableCode, readPatternFile } from "./rulemanage";
import { sources } from "./source";
import { Tokenizer } from "./tokenizer/tokenizer";

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
    console.log(devideContents);
    devideContents[lintResult.line] = await fixFromLint(lintResult, fileContents);

    return devideContents.join("\n");
}

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

export async function fixFromLint(lintResult: ILintOut, fileContents: string) {
    const contents = await makeTokens(fileContents);
    if (contents.length < lintResult.line) {
        return "";
    }
    const line = contents[lintResult.line];
    const newTokens: string[] = [];
    let startPosition = 0;

    for (let tokenIndex = 0; tokenIndex < line.length; tokenIndex++) {
        const token = line[tokenIndex];
        let isFound = false;
        for (const change of lintResult.pattern.code.slice(startPosition)) {
            const symbol = change[0];
            const changeTokens = change.slice(2).split(" ");
            const codeLen = changeTokens.length;
            switch (symbol) {
                case "+":
                    newTokens.push(...changeTokens);
                    startPosition++;
                    break;
                case "-":
                    if (isSameArray(line.slice(tokenIndex, tokenIndex + codeLen), changeTokens)) {
                        tokenIndex += codeLen - 1;
                        isFound = true;
                    }
                    break;
                case "=":
                    if (isSameArray(line.slice(tokenIndex, tokenIndex + codeLen), changeTokens)) {
                        newTokens.push(...changeTokens);
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
                    const beforeCodeLen = beforeTokens.length;
                    if (isSameArray(line.slice(tokenIndex, tokenIndex + beforeCodeLen), beforeTokens)) {
                        newTokens.push(...afterTokens);
                        tokenIndex += beforeCodeLen - 1;
                        isFound = true;
                    }
                    break;
                default:
                    break;
            }
            if (isFound) {
                startPosition++;
                break;
            }
        }
        if (!isFound) {
            newTokens.push(token);
        }
    }

    return newTokens.join(" ");
}

function isSameArray(array1: any[], array2: any[]) {
    return array1.length === array2.length &&
    array1.every((value, index) => value === array2[index]);
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

/**
 * Identify kind of source file
 */
function getSource(fileName: string) {
    for (const source in sources) {
        if (sources[source].extensions.some((x) => fileName.endsWith(x))) {
            return source;
        }
    }
    return;
}
