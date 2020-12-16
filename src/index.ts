import { extend } from './extend';
import { fixFromFile, fixWithRule,
         lint, lintFromFile, lintWithRules } from './lint';
import { LintOut, code2String, makeSeverity, makeFullSeverity } from './output';
import { Rule } from './rule-maker/rule';
import { makeDiffObj } from './rule-maker/diffparser';

import { makeRules, makeRulesFromChunk, makeRulesFromDiff, makeRulesFromDetailedDiffs, Identifier } from './rule-maker/makeRules';
import { mineProjectRules, mineProjectRulesDetail } from './rule-maker/mineProjectRules';

export { code2String, extend, fixFromFile, fixWithRule as fixWithPattern,
         LintOut, lint, lintFromFile, lintWithRules as lintWithPattern, makeSeverity, makeFullSeverity,
         Rule as Pattern,  makeDiffObj,
         makeRules as makePatterns, makeRulesFromChunk as makePatternsFromChunk, makeRulesFromDiff as makePatternsFromDiff, makeRulesFromDetailedDiffs as makePatternsFromDetailedDiffs,
         Identifier, mineProjectRules as mineRules, mineProjectRulesDetail as mineRulesDetail 
        };
