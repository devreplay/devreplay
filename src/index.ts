import { extend } from './extend';
import { fixFromFile, fixWithPattern,
         lint, lintFromFile, lintWithPattern } from './lint';
import { LintOut, code2String, makeSeverity, makeFullSeverity } from './output';
import { Pattern } from './patterns';
import { makePatterns, makePatternsFromChunk, makePatternsFromDiff, makePatternsFromDetailedDiffs, Identifier } from './make-patterns/makePatterns';
import { makeDiffObj } from './make-patterns/diffparser';
import { mineRules, mineRulesDetail } from './addRules';

export { code2String, extend, fixFromFile, fixWithPattern,
         LintOut, lint, lintFromFile, lintWithPattern, makeSeverity, makeFullSeverity,
         Pattern, makePatterns, makePatternsFromChunk, makePatternsFromDiff, makePatternsFromDetailedDiffs, makeDiffObj,
         Identifier, mineRules, mineRulesDetail };
