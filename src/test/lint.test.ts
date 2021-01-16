import { Rule } from '../rule-maker/rule';
import { fixWithRule } from '../lint';

const rule: Rule = {
    before: ['foo'],
    after: ['bar']
};

test('Fix foo to bar', () => {
    expect(fixWithRule('console.log("foo")', rule)).toBe('console.log("bar")');
});
