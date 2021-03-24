// Frequently failed due to the illegal invocation
// Link: https://github.com/tree-sitter/node-tree-sitter/issues/53
import { strDiff2treeDiff, Change, tokenize } from '../lib/rule-maker/code-parser';

test('Test rule maker', () => {
    const before = 'for (let i = 0;i < arr.length;i++) foo(arr[i])';
    const after = 'for (let i = 0;i < arr.length;i++) { foo(arr[i]) }';
    const beforeRegex = 'for \\(let (?<i>.+) = 0;\\k<i> < (?<arr>.+).length;\\k<i>\\+\\+\\) (.*)\\(\\k<arr>\\[\\k<i>\\]\\)';
    const afterRegex = 'for (let $1 = 0;$1 < $2.length;i++) { $3($2[$1]) }';
    
    expect(before).not.toStrictEqual(after);
    expect(afterRegex).not.toStrictEqual(beforeRegex);
});

// test('Test tokenizer', async () => {
//     const sourceCode = 'foo(arr[i])';        
//     const expectedTokens: string[] = sourceCode.split(' ');
//     const tokens = await tokenize(sourceCode, 'JavaScript');
//     expect(tokens.map(x => x.type)).toStrictEqual(['identifier']);
// });


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
