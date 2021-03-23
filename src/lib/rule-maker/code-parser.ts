import * as Parser from 'web-tree-sitter';
import { diffChars } from 'diff';

export type Change = {
    before: string;
    after: string; 
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
    const lang = await Parser.Language.load(`${__dirname}/../../wasms/tree-sitter-${language}.wasm`);
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

    if (beforeRanges.length === afterRanges.length && beforeRanges.length === 1) {
        const change: Change = {
            before: beforeRanges[0],
            after: afterRanges[0]
        };
        return change;
    }
    return;
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