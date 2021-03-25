import * as Path from 'path';
import * as Parser from 'web-tree-sitter';
import { diffChars } from 'diff';

export interface Position {
    row: number;
    column: number
}
export interface Token {
    type: string;
    text: string;
    range: {
        start: Position,
        end: Position
    };
}

export type Change = {
    before: string[];
    after: string[]; 
}

export type ChangeTokens = {
    before: Token[],
    after: Token[]
}

/**
 * Tokenize source code to splitted string
 * @param content source code content
 * @param langName language names
 * @returns Token text list
 */
export async function tokenize(content: string, langName: string): Promise<Token[]> {
    await Parser.init();
    const parser = new Parser();
    const language = langName2Parser(langName);
    if (language === undefined) {
        return [];
    }
    const wasmPath = Path.relative(process.cwd(), Path.join(__dirname, `/../../../wasms/tree-sitter-${language}.wasm`));
    const lang = await Parser.Language.load(wasmPath);
    parser.setLanguage(lang);

    const tree = parser.parse(content);
    const cursor = tree.walk();

    const tokens: Token[] = [];
    while (cursor.gotoFirstChild()) { continue; }
    for (;;) {
        if (cursor.currentNode().childCount === 0) {
            const token = {
                type: cursor.nodeType,
                text: cursor.nodeText,
                range: {
                    start: cursor.startPosition,
                    end: cursor.endPosition
                }
            };
            tokens.push(token);
        }
        if (cursor.gotoNextSibling()) {
            while (cursor.gotoFirstChild()) { continue; }
        } else if (cursor.gotoParent()) {
            continue;
        } else {
            break;
        }
    }
    return tokens;
}


/**
 * Make the code diff from two code contents
 * @param before Prechanged source code
 * @param after Changed source code
 * @param langName Target programming language name
 */
export async function strDiff2treeDiff(before: string, after: string, langName: string): Promise<Change | undefined> {
    await Parser.init();
    const parser = new Parser();
    const language = langName2Parser(langName);
    if (language === undefined) {
        return;
    }
    const wasmPath = Path.relative(process.cwd(), Path.join(__dirname, `/../../../wasms/tree-sitter-${language}.wasm`));
    const lang = await Parser.Language.load(wasmPath);
    parser.setLanguage(lang);

    const beforeTree = parser.parse(before);
    const tree = editTree(before, after, beforeTree);
    const afterTree = parser.parse(after, tree);
    const changedRanges = tree.getChangedRanges(afterTree);
    const afterRanges = changedRanges.map(x => {
        return after.slice(x.startIndex, x.endIndex);
    });

    const afterTree2 = parser.parse(after);
    const tree2 = editTree(after, before, afterTree2);
    const beforeTree2 = parser.parse(before, tree2);
    const changedRanges2 = tree2.getChangedRanges(beforeTree2);
    const beforeRanges = changedRanges2.map(x => {
        return before.slice(x.startIndex, x.endIndex);
    });

    if (beforeRanges.length !== 0 && afterRanges.length !== 0) {
        const change: Change = {
            before:  beforeRanges,
            after: afterRanges
        };
        return change;
    }

    return {
        before:  beforeRanges,
        after: afterRanges
    };
}

/**
 * Editing abstracted syntax tree based on code changes
 * @param before Prechanged source code
 * @param after Changed source code
 * @param tree Target tree
 */
function editTree(before: string, after: string, tree: Parser.Tree) {
    const changes = diffChars(before, after);
    let oldIndex = 0;
    for (const change of changes) {
        if (change.count === undefined){
            continue;
        }
        if (change.added) {
            tree.edit({
                startIndex: oldIndex,
                oldEndIndex: oldIndex,
                newEndIndex: oldIndex + change.count,
                startPosition: {row: 0, column: 0 },
                oldEndPosition: {row: 0, column: oldIndex },
                newEndPosition: {row: 0, column: oldIndex + change.count },
            });
            oldIndex += change.count;
        } else if (change.removed) {
            tree.edit({
                startIndex: oldIndex,
                oldEndIndex: oldIndex + change.count,
                newEndIndex: oldIndex,
                startPosition: {row: 0, column: 0 },
                oldEndPosition: {row: 0, column: oldIndex + change.count },
                newEndPosition: {row: 0, column: oldIndex },
            });
        } else{
            oldIndex += change.count;
        }
    }
    return tree;
}

/**
 * Choose the parser from language names
 * @param langName programming language name or scope
 */
function langName2Parser(langName: string) {
    const lowerLang = langName.toLowerCase();
    switch (lowerLang) {
        case 'c':
            return 'c';
        case 'source.c':
            return 'c';
        case 'cpp':
            return 'cpp';
        case 'source.cpp':
            return 'cpp';
        case 'java':
            return 'java';
        case 'source.java':
            return 'java';
        case 'javascript':
            return 'javascript';
        case 'source.js':
            return 'javascript';
        case 'python':
            return 'python';
        case 'source.python':
            return 'python';
        case 'typescript':
            return 'typescript';
        case 'source.ts':
            return 'typescript';
        default:
            throw new Error(`Language "${langName}" is unavailable`);
    }
}