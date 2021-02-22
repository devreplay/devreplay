export { extend } from './lib/extend';
export { fix, fixWithRule,
         lint, lintWithRules } from './lib/lint';
export { LintOut, code2String, makeSeverity, makeFullSeverity } from './lib/output';
export { Rule } from './lib/rule-maker/rule';
export { makeDiffObj } from './lib/rule-maker/diffparser';

export { makeRules, makeRulesFromChunk, makeRulesFromDiff, makeRulesFromDetailedDiffs, Identifier } from './lib/rule-maker/makeRules';
export { mineProjectRules, mineProjectRulesDetail } from './lib/rule-maker/mineProjectRules';
