import { tryReadFile } from "./file";
import { ILintOut } from "./lintout";
import { getTriggarableCode, readPatternFile } from "./rulemanage";
import { sources } from "./source";
import { Tokenizer } from "./tokenizer/tokenizer";

export async function lintFromFile(fileName: string, ruleFileName?: string) {
    const lintResults: ILintOut [] = [];
    const fileContents = await tryReadFile(fileName);
    if (fileContents) {
        return await lint(fileName, fileContents, ruleFileName);
    }
    return lintResults;
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
            if (pattern) {
                lintResults.push({fileName, line: lineIndex, pattern});
            }
            lineIndex++;
        }
    }
    return lintResults;
}

export async function fixFromLint(lintResults: ILintOut) {
    return lintResults;
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
