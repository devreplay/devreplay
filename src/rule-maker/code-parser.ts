/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Parser from 'tree-sitter';
import { diffChars } from 'diff';

const JavaScript = require('tree-sitter-javascript');

// https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web


// type editType = 'add' | 'delete' | 'replace'
// type editArg = {
//     editType: editType,
//     before: string[],
//     after: string[]
// }

export async function makeEditScript(before: string, after: string): Promise<string[]> {
    // ２つのソースコードから変更の最小木を生成する
    // 2つのソースコードを木にする
    // const jspath = path.join(__dirname, '../tree-sitter-javascript.wasm');
    const parser = new Parser();
    parser.setLanguage(JavaScript);

    const tree = parser.parse(before);
    editTree(before, after, tree);

    const newTree = parser.parse(after, tree);
    const changedRanges = tree.getChangedRanges(newTree);
    console.log(changedRanges);
    // for (const range of changedRanges) {
    //     console.log(sourceCode.slice(range.startIndex, range.endIndex));
    //     console.log(sourceCode.slice(range.startIndex, range.endIndex));
    // }
    const tokens: string[] = [];
    // const cursor = tree.walk();
    // const root = tree.rootNode.firstChild;
    // cursor.gotoFirstChild();
    // console.log(cursor.nodeText);
    // eslint-disable-next-line no-constant-condition
    // console.log(tree);
    for (const child of newTree.rootNode.namedChildren) {
        // console.log(child.text);
        // console.log(child.toString());
        tokens.push(child.text);
    }
    // while (true) {
    //     if (!cursor.gotoFirstChild()) {
    //         if (!cursor.gotoNextSibling()) {
    //             break;
    //         }
    //     }

    // }

    console.log(tokens);
    return new Promise<string[]>((resolve) => {
        resolve(tokens);
    });
    // return [{
    //     editType: 'add',
    //     before: before,
    //     after: after
    // }];
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
}