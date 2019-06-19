import { INITIAL } from "vscode-textmate";
import { tryReadFile } from "./file";
import { ILintOut } from "./lintout";
import { devideByToken } from "./parser";
import { getTriggarableCode, readPatternFile } from "./rulemanage";
import { sources } from "./source";

export async function lintFromFile(fileName: string) {
    const lintResults: ILintOut [] = [];
    const fileContents = await tryReadFile(fileName);
    // const fileSource = getSource(fileName);
    if (fileContents) {
        return await lint(fileName, fileContents);
    }
    return lintResults;
}

export async function lint(fileName: string, fileContents: string) {
    const fileSource = getSource(fileName);
    const lintResults: ILintOut [] = [];
    if (fileSource) {
        const lineTokens = await makeTokens(fileContents, fileSource);
        let lineIndex = 0;
        for (const tokens of lineTokens) {
            const patterns = await readPatternFile(fileSource);
            const pattern = getTriggarableCode(tokens, patterns);
            if (pattern) {
                lintResults.push({fileName, line: lineIndex, pattern});
            }
            lineIndex++;
        }
    }
    return lintResults;
}

async function makeTokens(fileContents: string, source: string) {
    const tokens: string[][] = [[]];
    let ruleStack = INITIAL;
    for (const line of fileContents.split("\n")) {
        const lineTokenValue: string[] = [];
        const tokeninfo = await devideByToken(line, source, ruleStack);
        for (const token of tokeninfo.tokens) {
            lineTokenValue.push(token.value);
        }
        tokens.push(lineTokenValue);
        ruleStack = tokeninfo.ruleStack;
    }
    return tokens;
}

/**
 * Identify kind of source file
 */
function getSource(fileName: string) {
    for (const source of sources) {
        if (source.extensions.some((x) => fileName.endsWith(x))) {
            return source.source;
        }
    }
    return;
}
