import { Rule } from '../lib/rule-maker/rule';
import { getReplaceString } from '../lib/lint';

const rule: Rule = {
    before: ['foo'],
    after: ['bar'],
    isRegex: true
};

test('Fix foo to bar', () => {
    expect(getReplaceString('console.log("foo")', rule)).toBe('console.log("bar")');
});


const rule2: Rule = {
    before: ['let\\s+(\\w+)\\s*=\\s*require\\s*\\(\\s*[\'"]([\\w.\\-/]+)\\s*[\'"]\\s*\\)\\s*'],
    after: ['import * as $2 from \'$1\';'],
    isRegex: true
};
test('Fix foo to bar', () => {
    expect(getReplaceString('let something = require(\'fs\')', rule2)).toBe('import * as fs from \'something\';');
});

const rule3: Rule = {
    before: [
        '(?<tmp>.+)\\s*=\\s*(?<a>.+)',
        '\\k<a>\\s*=\\s*(?<b>.+)',
        '\\k<b>\\s*=\\s*\\k<tmp>',
    ],
    after: [
      '$2, $3 = $3, $2',
    ],
    isRegex: true,
    message: 'Value exchanging can be one line',
};

test('Fix foo to bar', () => {
    expect(getReplaceString('h = b\nb = c\nc = h', rule3)).toBe('b, c = c, b');
});

const rule4: Rule = {
    before: [
      '([a-z]+)-([a-z]+)'
    ],
    after: [
        '$1 $2'
    ],
    isRegex: true
};

test('Fix by regex', () => {
    expect(getReplaceString('print("hello-world")', rule4)).toBe('print("hello world")');
});