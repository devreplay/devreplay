import { BaseRule } from '../../core/rule';
import { fixWithRules } from '../../core/lint';
import { readExtends, BaseRule2DevReplayRule } from '../../core/ruleManager';


const rules: BaseRule[] = readExtends('python');

// Test python built-in rules
test('Fix one three lines replacing', () => {
    expect(fixWithRules([
        'h = b',
        'b = c',
        'c = h'].join('\n'), rules.map(rule => BaseRule2DevReplayRule(rule, 0)))).toBe('b, c = c, b');
});


const rules2: BaseRule[] = [{
    before: [
        'tmp=a',
        'a=b',
        'b=tmp'
      ],
    after: 'a,b=b,a'
}];

test('Fix one three lines replacing', () => {
    expect(fixWithRules([
        'tmp=a',
        'a=b',
        'b=tmp'].join('\n'), rules2.map(rule => BaseRule2DevReplayRule(rule, 0)))).toBe('a,b=b,a');
});

test('Fix one three lines replacing', () => {
    expect(fixWithRules([
        '   tmp=a',
        '   a=b',
        '   b=tmp'].join('\n'), rules2.map(rule => BaseRule2DevReplayRule(rule, 0)))).toBe('   a,b=b,a');
});