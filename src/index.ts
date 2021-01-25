import { extend } from './lib/extend';
import { fixFromFile, fixWithRule,
         lint, lintFromFile, lintWithRules } from './lib/lint';
import { LintOut, code2String, makeSeverity, makeFullSeverity } from './lib/output';
import { Rule } from './lib/rule-maker/rule';
import { makeDiffObj } from './lib/rule-maker/diffparser';

import { makeRules, makeRulesFromChunk, makeRulesFromDiff, makeRulesFromDetailedDiffs, Identifier } from './lib/rule-maker/makeRules';
import { mineProjectRules, mineProjectRulesDetail } from './lib/rule-maker/mineProjectRules';

export { code2String, extend, fixFromFile, fixWithRule as fixWithPattern,
         LintOut, lint, lintFromFile, lintWithRules as lintWithPattern, makeSeverity, makeFullSeverity,
         Rule as Pattern,  makeDiffObj,
         makeRules as makePatterns, makeRulesFromChunk as makePatternsFromChunk, makeRulesFromDiff as makePatternsFromDiff, makeRulesFromDetailedDiffs as makePatternsFromDetailedDiffs,
         Identifier, mineProjectRules as mineRules, mineProjectRulesDetail as mineRulesDetail 
        };
