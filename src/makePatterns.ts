import { tokenize, Token } from 'source-code-tokenizer';

import { Pattern } from './patterns';
import { Chunk, makeDiffObj } from './diffparser';
import { DetailedDiff } from './gitMiner';

export interface Identifier {
    value: string;
    scope: string;
}

export async function makePatternsFromDetailedDiffs(logs: DetailedDiff[]): Promise<Pattern[]> {
    let allPatterns: Pattern[] = [];
    for (const log of logs) {
        let patterns = await makePatternsFromDiff(log.diff);
        patterns = patterns
        .map(pattern => {
            pattern.author = log.log.author_name;
            pattern.message = log.log.message;
            pattern.ruleId = log.log.hash;
            delete pattern.identifiers;
            return pattern;
        });

        allPatterns = allPatterns.concat(patterns);
    }
    allPatterns = filterSameRules(allPatterns);

    return allPatterns;
}

export async function makePatternsFromDiffs(diffs: string[]): Promise<Pattern[]> {
    let allPatterns: Pattern[] = [];
    for (const diff of diffs) {
        let patterns = await makePatternsFromDiff(diff);
        patterns = patterns
        .map(pattern => {
            delete pattern.identifiers;
            delete pattern.scopeName;
            return pattern;
        });

        allPatterns = allPatterns.concat(patterns);
    }
    allPatterns = filterSameRules(allPatterns);

    return allPatterns;
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

export function makePatternsFromChunk(chunk: Chunk): Promise<Pattern | undefined> {
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


    // 1 token changep pattern
    const identifiers: Identifier[] = collectCommonIdentifiers(beforeTokens.tokens, afterTokens.tokens);

    if (identifiers.length > 0) {
        const diffs = getSingleDiff(beforeTokens.tokens, afterTokens.tokens);
        if (diffs.length === 1) {
            if (isAbstractable(diffs[0].before)) {
                return {
                    before: [diffs[0].before.value],
                    after: [diffs[0].after.value],
                    scopeName: source
                };
            }
        }
    }

    // 1 line change pattern
    const deletedLines = deletedContents.split('\n')
    const addedLines = addedContents.split('\n')
    if (deletedLines.length !== 1 && addedLines.length !== 1){
        const lineDiffs = getSingleLineDiff(deletedLines, addedLines);
        if (lineDiffs.length === 1) {
            return makePatterns(lineDiffs[0].before, lineDiffs[0].after, source);
        }
    }

    // Multi line change pattern
    const beforePatterns = makeAbstractedCode(beforeTokens.tokens, identifiers);
    const afterPatterns = makeAbstractedCode(afterTokens.tokens, identifiers);

    const { before, after } = formatPatterns(beforePatterns, afterPatterns);

    return {
        before: before,
        after: after,
        scopeName: source
    };
}

function collectCommonIdentifiers(beforeTokens: Token[], afterTokens: Token[]) {
    const identifiers: Identifier[] = [];
    for (const beforeToken of beforeTokens) {
        if (!(checkInIdentifiers(identifiers, beforeToken) === undefined &&
            isAbstractable(beforeToken))) {
            continue;
        }
        const beforeScope = beforeToken.scopes[beforeToken.scopes.length - 1];
        for (const afterToken of afterTokens) {
            const afterScope = afterToken.scopes[afterToken.scopes.length - 1];
            if (beforeToken.value === afterToken.value && beforeScope === afterScope){
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
        if (identIndex !== undefined) {
            const abstractedToken = token.scopes[token.scopes.length - 1].split('.')[0];
            lineContents += ' '.repeat(spaceNum) + `\${${identIndex}:${abstractedToken}}`;
        } else {
            lineContents += ' '.repeat(spaceNum) + token.value;
        }
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
    const isAlphanumeric = /^([a-zA-Z][a-zA-Z0-9]*)|[0-9]+$/i.exec(token.value);
    return isAlphanumeric && ['keyword', 'builtin', 'strage'].every(x => !scope.includes(x));
}

function isEmptyPattern(pattern: string[]) {
    return pattern.length === 1 && pattern[0] === '';
}

function getSingleDiff(beforeTokens: Token[], afterTokens: Token[]) {
    const differentTokens: {before: Token, after: Token}[] = [];

    for (let index = 0; index < Math.min(beforeTokens.length, afterTokens.length); index++) {
        const beforeToken = beforeTokens[index];
        const afterToken = afterTokens[index];
        if (beforeToken.value !== afterToken.value) {
            differentTokens.push({before: beforeToken, after: afterToken});
        }
    }

    return differentTokens;
}

function getSingleLineDiff(beforeTokens: string[], afterTokens: string[]) {
    const differentTokens: {before: string, after: string}[] = [];

    for (let index = 0; index < Math.min(beforeTokens.length, afterTokens.length); index++) {
        const beforeToken = beforeTokens[index];
        const afterToken = afterTokens[index];
        if (beforeToken !== afterToken) {
            differentTokens.push({before: beforeToken, after: afterToken});
        }
    }

    return differentTokens;
}

function filterSameRules(patterns: Pattern[]) {
    const uniquePattern: Pattern[] = [];
    for (const pattern of patterns) {
        if (!uniquePattern.some(x => {
            return (
                x.after.join('\n') === pattern.after.join('\n') &&
                x.before.join('\n') === pattern.before.join('\n'));       
        })){
            uniquePattern.push(pattern);
        }
    }
    return uniquePattern;
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