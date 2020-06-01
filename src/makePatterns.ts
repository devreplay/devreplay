import { tokenize, IToken, getFileSource } from 'source-code-tokenizer';
import { tryReadFile } from './file';
import { Pattern } from './patterns';

export interface Identifier {
    value: string;
    scope: string;
}

export function makePatternsFromFiles(fileNameA: string, fileNameB: string) {
    const fileContentsA = tryReadFile(fileNameA);
    const fileContentsB = tryReadFile(fileNameB);
    const filesource = getFileSource(fileNameA);
    return makePatterns(fileContentsA, fileContentsB, filesource);
}

export async function makePatterns(before?: string, after?: string, source?: string): Promise<Pattern|undefined> {
    if (before === undefined || after === undefined || source === undefined) {
        return undefined;
    }

    const beforeTokens = await tokenize(before, source);
    const afterTokens = await tokenize(after, source);

    if (beforeTokens === undefined || afterTokens === undefined) {
        return undefined;
    }

    let conditionValues: string[] = [];
    for (const token of beforeTokens.tokens) {
        conditionValues.push(token.value);
    }
    let consequentValues: string[] = [];
    for (const token of afterTokens.tokens) {
        consequentValues.push(token.value);
    }

    const identifiers: Identifier[] = [];

    for (let beforeIndex = 0; beforeIndex < beforeTokens.tokens.length; beforeIndex++) {
        const beforeToken = beforeTokens.tokens[beforeIndex];
        const beforeScope = beforeToken.scopes[beforeToken.scopes.length - 1];
        for (let afterIndex = 0; afterIndex < afterTokens.tokens.length; afterIndex++) {
            const afterToken = afterTokens.tokens[afterIndex];
            const afterScope = afterToken.scopes[afterToken.scopes.length - 1];
            if (beforeToken.value === afterToken.value &&
                beforeScope === afterScope && 
                checkInIdentifiers(identifiers, beforeToken) === undefined &&
                isAbstractable(beforeToken)){
                    identifiers.push({
                        value: beforeToken.value,
                        scope: beforeScope
                    });
                }
        }
    }
    const conditionPatterns = makeAbstractedCode(beforeTokens.tokens, identifiers);
    const consequentPatterns = makeAbstractedCode(afterTokens.tokens, identifiers);

    return {
        condition: conditionPatterns,
        consequent: consequentPatterns,
        identifiers: identifiers.map(identifier => { return identifier.value; })
    };
}

function makeAbstractedCode(tokens: IToken[], identifiers: Identifier[]) {
    const patterns: string[] = [];
    let previousPosition = 1;
    let previousLine = 0;
    let lineContents = '';
    for (const token of tokens) {
        if (previousLine === 0) {
            previousLine = token.line;
        }

        if (token.line !== previousLine) {
            patterns.push(lineContents);
            previousPosition = 1;
            previousLine = token.line;
            lineContents = '';
        }

        const spaceNum = token.columns.start - previousPosition;
        previousPosition = token.columns.end;
        const identIndex = checkInIdentifiers(identifiers, token);
        const value = identIndex !== undefined
                      ? `\${${identIndex}:${token.scopes[token.scopes.length - 1]}}`
                      : token.value;

        lineContents += ' '.repeat(spaceNum) + value;
    }
    patterns.push(lineContents);
    return patterns;
}


function checkInIdentifiers(identifiers: Identifier[], token: IToken) {
    let identIndex = 1;
    const scope = token.scopes[token.scopes.length - 1];
    for (const identifier of identifiers) {
        if (token.value === identifier.value &&
            scope === identifier.scope) {
                return identIndex;
        }
        identIndex++;
    }
    return undefined;
}

function isAbstractable(token: IToken) {
    const scope = token.scopes[token.scopes.length - 1];
    const isAlphanumeric = token.value.match(/^([a-zA-Z][a-zA-Z0-9]*)|[0-9]+$/i);
    return isAlphanumeric && !scope.includes('keyword') && !scope.includes('builtin') && !scope.includes('storage');
}
