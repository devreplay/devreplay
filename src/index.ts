export { extend } from './core/extend';
export { fix, fixWithRules, lint, lintWithRules } from './core/lint';
export { LintOut, code2String, makeSeverity, makeFullSeverity } from './core/output';
export { BaseRule as Rule, DevReplayRule, RuleSeverity } from './core/rule';
export { readCurrentRules, readRuleFile, writeRuleFile, BaseRule2DevReplayRule, readExtends } from './core/ruleManager';
