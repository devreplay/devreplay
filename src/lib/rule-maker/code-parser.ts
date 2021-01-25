/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Parser from 'tree-sitter';
import { diffChars } from 'diff';

export type Change = {
    before: string;
    after: string; 
}

export function strDiff2treeDiff(before: string, after: string, langName: string): Change | undefined {
    const parser = new Parser();
    const language = langName2Parser(langName);
    if (language === undefined) {
        return;
    }
    parser.setLanguage(language);

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

function langName2Parser(langName: string) {
    const lowerLang = langName.toLowerCase();
    switch (lowerLang) {
        case 'c':
            return require('tree-sitter-c');
        case 'cpp':
            return require('tree-sitter-cpp');
        case 'java':
            return require('tree-sitter-java');
        case 'javascript':
        return require('tree-sitter-javascript');
        case 'python':
            return require('tree-sitter-python');
        case 'typescript':
        return require('tree-sitter-typescript');
        default:
            throw new Error(`Language "${langName}" is unavailable`);
    }
}