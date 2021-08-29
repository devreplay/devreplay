export { extend } from './lib/extend';
export { fix, fixWithRules, lint, lintWithRules } from './lib/lint';
export { LintOut, code2String, makeSeverity, makeFullSeverity } from './lib/output';
export { BaseRule as Rule, DevReplayRule } from './lib/rule';
export { readCurrentRules, readRuleFile, writeRuleFile } from './lib/ruleManager';
