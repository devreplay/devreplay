import { extend } from './lib/extend';
import { fix, fixWithRule,
         lint, lintWithRules } from './lib/lint';
import { LintOut, code2String, makeSeverity, makeFullSeverity } from './lib/output';
import { Rule } from './lib/rule-maker/rule';
import { makeDiffObj } from './lib/rule-maker/diffparser';

import { makeRules, makeRulesFromChunk, makeRulesFromDiff, makeRulesFromDetailedDiffs, Identifier } from './lib/rule-maker/makeRules';
import { mineProjectRules, mineProjectRulesDetail } from './lib/rule-maker/mineProjectRules';

export { code2String, extend, fix, fixWithRule ,
         LintOut, lint, lintWithRules, makeSeverity, makeFullSeverity,
         Rule as Pattern,  makeDiffObj,
         makeRules, makeRulesFromChunk, makeRulesFromDiff, makeRulesFromDetailedDiffs,
         Identifier, mineProjectRules, mineProjectRulesDetail 
        };
