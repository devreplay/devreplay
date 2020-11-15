import { extend } from './extend';
import { fixFromFile, fixWithPattern,
         lint, lintFromFile, lintWithPattern } from './lint';
import { LintOut, code2String, makeSeverity, makeFullSeverity } from './output';
import { Pattern } from './patterns';
import { makeDiffObj } from './diffparser';

import { makePatterns, makePatternsFromChunk, makePatternsFromDiff, makePatternsFromDetailedDiffs, Identifier } from './makePatterns';
import { mineRules, mineRulesDetail } from './addRules';

export { code2String, extend, fixFromFile, fixWithPattern,
         LintOut, lint, lintFromFile, lintWithPattern, makeSeverity, makeFullSeverity,
         Pattern,  makeDiffObj,
         makePatterns, makePatternsFromChunk, makePatternsFromDiff, makePatternsFromDetailedDiffs,
         Identifier, mineRules, mineRulesDetail 
        };
