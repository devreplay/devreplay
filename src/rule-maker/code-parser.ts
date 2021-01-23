/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Parser from 'web-tree-sitter';
import * as path from 'path';

// https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web


// type editType = 'add' | 'delete' | 'replace'
// type editArg = {
//     editType: editType,
//     before: string[],
//     after: string[]
// }

export async function makeEditScript(): Promise<string[]> {
    // ２つのソースコードから変更の最小木を生成する
    // 2つのソースコードを木にする
    // const jspath = path.join(__dirname, '../tree-sitter-javascript.wasm');
    await Parser.init();
    const parser = new Parser();
    const javascript = await Parser.Language.load(makeParserWasmPath('javascript'));

    parser.setLanguage(javascript);

    const sourceCode = 'let x = 1; console.log(x);';
    const tree = parser.parse(sourceCode);

    const tokens: string[] = [];
    // const cursor = tree.walk();
    // const root = tree.rootNode.firstChild;
    // cursor.gotoFirstChild();
    // console.log(cursor.nodeText);
    // eslint-disable-next-line no-constant-condition
    for (const child of tree.rootNode.namedChildren) {
        console.log(child.text);
        console.log(child.toString());
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
    return tokens;
    // return [{
    //     editType: 'add',
    //     before: before,
    //     after: after
    // }];
}

function makeParserWasmPath(language: string) {
    return path.join(__dirname, `${language.toLowerCase()}.wasm`);
}