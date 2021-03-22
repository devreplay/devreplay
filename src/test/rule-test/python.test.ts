import { Rule } from '../../lib/rule-maker/rule';
import { fixWithRules } from '../../lib/lint';
import { readExtends } from '../../lib/ruleManager';

const rules: Rule[] = readExtends('python');

test('Fix one three lines replacing', () => {
    expect(fixWithRules([
        'h = b',
        'b = c',
        'c = h'].join('\n'), rules)).toBe('b, c = c, b');
});
