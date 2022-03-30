import { DevReplayRule } from '../../core/rule';
import { fixWithRules } from '../../core/lint';
import { BaseRule2DevReplayRule } from '../../core/ruleManager';

const rules: DevReplayRule[] = [{
    before: [
      '([a-z]+)-([a-z]+)'
    ],
    after: [
        '$1 $2'
    ],
    isRegex: true
},
{
  before: [
    'for \\(let (?<i>.+) = 0;\\k<i> < (?<arr>.+).length;\\k<i>\\+\\+\\) (.*)\\(\\k<arr>\\[\\k<i>\\]\\)'
  ],
  after: [
    'for (let $1 = 0;$1 < $2.length;i++) {',
    '    $3($2[$1])',
    '}'
  ],
  isRegex: true,
  message: 'One line for should use paren'
}].map(rule => BaseRule2DevReplayRule(rule, 0));

// Test hyphen code will be fixed to white space code
test('Fix by regex', () => {
    expect(fixWithRules('print("hello-world")', rules)).toBe('print("hello world")');
});

// Test original rules to sample loop code
test('Fix by regex', () => {
    expect(fixWithRules('for (let i = 0;i < arr.length;i++) foo(arr[i])', rules)).toBe(
        [
            'for (let i = 0;i < arr.length;i++) {',
            '    foo(arr[i])',
            '}'].join('\n')
        );
});