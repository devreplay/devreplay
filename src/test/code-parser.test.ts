// Frequently failed due to the illegal invocation
// Link: https://github.com/tree-sitter/node-tree-sitter/issues/53
import { strDiff2treeDiff, Change, tokenize, makeParser } from '../lib/rule-maker/code-parser';

test('Test parser', async () => {
    const parser = await makeParser('JavaScript');
    if (parser === undefined) {
        return;
    }
    const sourceCode = '\'hello\''; 
    // const types: string[] = [];

    const tree = parser.parse(sourceCode);
    // const cursor = tree.walk();
    // while (cursor.gotoFirstChild() || cursor.gotoNextSibling()) {
    //     types.push(cursor.nodeType);
    // }
    // expect(tree.rootNode.toString()).toStrictEqual('(program (expression_statement (string)))');

    // expect(types).toStrictEqual(['']);

    expect(tree.rootNode.text).toStrictEqual(sourceCode);
});

test('Test parser2', async () => {
    const parser = await makeParser('JavaScript');
    if (parser === undefined) {
        return;
    }
    const sourceCode = '0'; 

    const tree = parser.parse(sourceCode);
    expect(tree.rootNode.toString()).toStrictEqual('(program (expression_statement (number)))');

    expect(tree.rootNode.text).toStrictEqual(sourceCode);
});

test('Test rule maker', () => {
    const before = 'for (let i = 0;i < arr.length;i++) foo(arr[i])';
    const after = 'for (let i = 0;i < arr.length;i++) { foo(arr[i]) }';
    const beforeRegex = 'for \\(let (?<i>.+) = 0;\\k<i> < (?<arr>.+).length;\\k<i>\\+\\+\\) (.*)\\(\\k<arr>\\[\\k<i>\\]\\)';
    const afterRegex = 'for (let $1 = 0;$1 < $2.length;i++) { $3($2[$1]) }';
    
    expect(before).not.toStrictEqual(after);
    expect(afterRegex).not.toStrictEqual(beforeRegex);
});


test('Test tokenizer', async () => {
    const sourceCode = 'a * b + c / d';        
    const expectedTokens: string[] = sourceCode.split(' ');
    const tokens = await tokenize(sourceCode, 'JavaScript');
    expect(tokens.map(x => x.text)).toStrictEqual(expectedTokens);
});

test('Test tokenizer2', async () => {
    const sourceCode = 'abc+cde';        
    const expectedTokens: string[] = ['abc', '+', 'cde'];
    const tokens = await tokenize(sourceCode, 'JavaScript');
    expect(tokens.map(x => x.text)).toStrictEqual(expectedTokens);
});


test('Test javascript if statement', async () => {
    const sourceCode = 'if (a == 0)';        
    const newSourceCode = 'if (a == 0 && b == 1)';
    const expectedChange: Change = {
        before: ['a == 0'],
        after: ['a == 0 && b == 1']
    };
    expect(await strDiff2treeDiff(sourceCode, newSourceCode, 'JavaScript')).toStrictEqual(expectedChange);
});


test('Test java plus statement', async () => { 
    const sourceCode = 'abcdefg + hij';        
    const newSourceCode = 'abc + defg + hij';
    const expectedChange = {
        before: ['abcdefg'],
        after: ['abc + defg']
    };

    expect(await strDiff2treeDiff(sourceCode, newSourceCode, 'Java')).toStrictEqual(expectedChange);
});

test('Test javascript tokens', async () => {
    const sourceCode = 'print(\'hello\')'; 
    const expectedTokens: string[] = ['print', '(', '\'hello\'', ')'];
    const expectedTypes: string[] = ['identifier', '(', 'string', ')'];

    const tokens = await tokenize(sourceCode, 'JavaScript');

    expect(tokens.map(x => x.text)).toStrictEqual(expectedTokens);
    expect(tokens.map(x => x.type)).toStrictEqual(expectedTypes);

});

test('Test javascript tokens', async () => {
    const sourceCode = 'var a = abc+0+\'hello\'+0'; 
    const expectedTokens: string[] = ['var', 'a', '=', 'abc', '+', '0', '+', '\'hello\'', '+', '0'];
    const expectedTypes: string[] = ['var', 'identifier', '=', 'identifier', '+', 'number', '+', 'string', '+', 'number'];

    const tokens = await tokenize(sourceCode, 'JavaScript');

    expect(tokens.map(x => x.text)).toStrictEqual(expectedTokens);
    expect(tokens.map(x => x.type)).toStrictEqual(expectedTypes); 
});
