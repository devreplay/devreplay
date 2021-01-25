// Frequently failed due to the illegal invocation
// Link: https://github.com/tree-sitter/node-tree-sitter/issues/53
import { strDiff2treeDiff, Change } from '../lib/rule-maker/code-parser';

test('Test javascript if statement', () => {
    const sourceCode = 'if (a == 0)';        
    const newSourceCode = 'if (a == 0 && b == 1)';
    const expectedChange: Change = {
        before: 'a == 0',
        after: 'a == 0 && b == 1'
    };
    expect(strDiff2treeDiff(sourceCode, newSourceCode, 'JavaScript')).toStrictEqual(expectedChange);
});


test('Test java plus statement', () => { 
    const sourceCode = 'abcdefg + hij';        
    const newSourceCode = 'abc + defg + hij';
    const expectedChange = {
        before: 'abcdefg',
        after: 'abc + defg'
    };

    expect(strDiff2treeDiff(sourceCode, newSourceCode, 'Java')).toStrictEqual(expectedChange);
});
