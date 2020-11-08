import { tokenize, Token } from 'source-code-tokenizer';

import { Pattern } from '../patterns';
import { Chunk, makeDiffObj } from './diffparser';

export interface Identifier {
    value: string;
    scope: string;
}

export async function makePatternsFromDiff(diff: string): Promise<Pattern[]> {
    const chunks = makeDiffObj(diff);
    const patterns: Pattern[] = [];
    for (const chunk of chunks) {
        const pattern = await makePatternsFromChunk(chunk);
        if (pattern !== undefined && !isEmptyPattern(pattern.before) && !isEmptyPattern(pattern.after)) {
            patterns.push(pattern);
        }
    }
    return patterns;
}

export function makePatternsFromChunk(chunk: Chunk) {
    return makePatterns(chunk.deleted.join('\n'), chunk.added.join('\n'), chunk.source); 
}

export async function makePatterns(deletedContents?: string, addedContents?: string, source?: string): Promise<Pattern|undefined> {
    if (deletedContents === undefined || addedContents === undefined || source === undefined) {
        return undefined;
    }

    const beforeTokens = await tokenize(deletedContents, source);
    const afterTokens = await tokenize(addedContents, source);

    if (beforeTokens === undefined || afterTokens === undefined) {
        return undefined;
    }

    const identifiers: Identifier[] = collectCommonIdentifiers(beforeTokens.tokens, afterTokens.tokens);
    const beforePatterns = makeAbstractedCode(beforeTokens.tokens, identifiers);
    const afterPatterns = makeAbstractedCode(afterTokens.tokens, identifiers);

    const { before, after } = formatPatterns(beforePatterns, afterPatterns);

    return {
        before: before,
        after: after,
        identifiers: identifiers.map(identifier => { return identifier.value; })
    };
}

function collectCommonIdentifiers(beforeTokens: Token[], afterTokens: Token[]) {
    const identifiers: Identifier[] = [];
    for (const beforeToken of beforeTokens) {
        const beforeScope = beforeToken.scopes[beforeToken.scopes.length - 1];
        for (const afterToken of afterTokens) {
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
    return identifiers;
}


function makeAbstractedCode(tokens: Token[], identifiers: Identifier[]) {
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


function checkInIdentifiers(identifiers: Identifier[], token: Token) {
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

function isAbstractable(token: Token) {
    const scope = token.scopes[token.scopes.length - 1];
    const isAlphanumeric = token.value.match(/^([a-zA-Z][a-zA-Z0-9]*)|[0-9]+$/i);
    return isAlphanumeric && !scope.includes('keyword') && !scope.includes('builtin') && !scope.includes('storage');
}

function isEmptyPattern(pattern: string[]) {
    return pattern.length === 1 && pattern[0] === '';
}

function formatPatterns(before: string[], after: string[]) {
    const minSpace = Math.min(countSpace(before), countSpace(after));
    const formatBefore = [];
    for (const line of before) {
        formatBefore.push(line.slice(minSpace));
    }
    const formatAfter = [];
    for (const line of after) {
        formatAfter.push(line.slice(minSpace));
    }
    return {before: formatBefore, after: formatAfter};
}

function countSpace(patternLines: string[]) {
    const spaces: number[] = [];
    for (const patternLine of patternLines) {
        if (patternLine === '') { continue; } 
        let spaceNum = 0;
        for (const character of patternLine) {
            if (character === ' ') {
                spaceNum++;
            } else {
                break;
            }
        }
        spaces.push(spaceNum);
    }
    return Math.min(...spaces);
}