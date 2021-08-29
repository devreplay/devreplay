import { BaseRule } from '../../lib/rule';
import { fixWithRules } from '../../lib/lint';
import { readExtends, BaseRule2DevReplayRule } from '../../lib/ruleManager';

const rules: BaseRule[] = readExtends('python');

test('Fix one three lines replacing', () => {
    expect(fixWithRules([
        'h = b',
        'b = c',
        'c = h'].join('\n'), rules.map(rule => BaseRule2DevReplayRule(rule, 0)))).toBe('b, c = c, b');
});
