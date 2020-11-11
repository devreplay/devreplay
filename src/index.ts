import { extend } from './extend';
import { fixFromFile, fixWithPattern,
         lint, lintFromFile, lintWithPattern } from './lint';
import { LintOut, code2String, makeSeverity, makeFullSeverity } from './output';
import { Pattern } from './patterns';
import { makePatterns, makePatternsFromChunk, makePatternsFromDiff, Identifier } from './diff/makePatterns';
import { makeDiffObj } from './diff/diffparser';

export { code2String, extend, fixFromFile, fixWithPattern,
         LintOut, lint, lintFromFile, lintWithPattern, makeSeverity, makeFullSeverity, Pattern, makePatterns, makePatternsFromChunk, makePatternsFromDiff, makeDiffObj, Identifier };
