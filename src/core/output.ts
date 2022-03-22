/**
 * Generate lint result strings.
 * 
 * @module
 */

import * as table from 'text-table';
import { red, yellow, blue, gray } from 'chalk';

import { DevReplayRule, joinRuleParam, RuleSeverity } from './rule';
import { Range } from './position';

/** DevReplay linting result */
export interface LintOut {
    /** Linting result rule */
    rule: DevReplayRule;
    /** Matched code snippet */
    snippet: string;
    /** Fixed code snippet */
    fixed?: string;
    /** Linting result file */
    fileName: string;
    /** Linting result position range */
    position: Range;
}

/**
 * Generate the formated strings from lint results that has
 * * error message
 * * number of total problems
 * @param lintouts results of linting by devreplay
 */
export function outputLintOuts(lintouts: LintOut[]): string {
    let lintoutputs: string[][] = [];
    let fileName = '';
    let errorCount = 0;
    let warningCount = 0;
    let informationCount = 0;
    let hintCount = 0;
    let output = '\n';
    for (const lintout of lintouts) {
        const severity = makeSeverity(lintout.rule.severity);
        if (fileName === '') {
            fileName = lintout.fileName;
            output += `${fileName}\n`;
        } else if (lintout.fileName !== fileName) {
            fileName = lintout.fileName;
            output += table(lintoutputs, {hsep: '  '});
            output += `\n${fileName}\n`;
            lintoutputs = [];
        }
        lintoutputs.push(formatLintOut(lintout));
        if (severity === RuleSeverity.error) {
            errorCount += 1;
        } else if (severity === RuleSeverity.warning) {
            warningCount += 1;
        } else if (severity === RuleSeverity.information) {
            informationCount += 1;
        } else if (severity === RuleSeverity.hint) {
            hintCount += 1;
        }
    }
    output += table(lintoutputs);
    const total = errorCount + warningCount + informationCount + hintCount;

    if (total > 0) {
        let summary = [`\n\n${total} problems\n`,
                         `${errorCount} errors, `,
                         `${warningCount} warnings, `,
                         `${informationCount} infos, `,
                         `${hintCount} hints`,].join('');
        if (errorCount > 0) {
            summary = red(summary);
        } else if (warningCount > 0) {
            summary = yellow(summary);
        } else if (informationCount > 0) {
            summary = blue(summary);
        }
        output += summary;
    }
    return output;
}

/**
 * Generate connected full lint message from a lint warning
 * @param matched A lint warning
 */
export function formatLintOut(matched: LintOut): string[] {
    const severity = makeFullSeverity(matched.rule.severity);
    const range = gray(`  ${matched.position.start.line}:${matched.position.start.character}`);
    const id = gray(`${matched.rule.ruleId}`);
    const message = `${code2String2(matched)}  ${id}`;
    return [range, severity, message];
}

/**
 * Make the code severity from the severity string initial
 * Severities are
 * * `E`rror
 * * `W`arning
 * * `I`nformation`
 * * `H`int
 * @param severity code severity message
 */
export function makeSeverity(severity?: string): RuleSeverity {
    if (severity === undefined) {
        return RuleSeverity.warning;
    } if (severity.toLowerCase().startsWith('e')) {
        return RuleSeverity.error;
    } if (severity.toLowerCase().startsWith('w')) {
        return RuleSeverity.warning;
    } if (severity.toLowerCase().startsWith('i')) {
        return RuleSeverity.information;
    } if (severity.toLowerCase().startsWith('h')) {
        return RuleSeverity.hint;
    }
    return RuleSeverity.warning;
}

/**
 * Generate colored severity from severity
 * @param severity severity string
 */
export function makeFullSeverity(severity?: string): string {
    const fixed_severity = makeSeverity(severity);
    if (fixed_severity === RuleSeverity.error) {
        return red('error');
    } if (fixed_severity === RuleSeverity.warning) {
        return yellow('warning');
    } if (fixed_severity === RuleSeverity.information) {
        return blue('info');
    } if (fixed_severity === RuleSeverity.hint) {
        return gray('hint');
    }
    return gray('warning');
}

/**
 * Generate lint message from a rule
 * @param rule warned rule
 */
export function code2String(rule: DevReplayRule): string {
    if (rule.message !== undefined) {
        if (rule.author !== undefined) {
            return `${rule.message} by ${rule.author}`;
        }

        return rule.message;
    }
    let message = `${joinRuleParam(rule.before)} should be fixed`;
    if (rule.after !== undefined) {
        message = `${joinRuleParam(rule.before)} should be ${joinRuleParam(rule.after)}`;
    }
    if (rule.deprecated === true) {
        message = `${joinRuleParam(rule.before)} is deprecated`;
    } else if (rule.unnecessary === true) {
        message = `${joinRuleParam(rule.before)} is unnecessary`;
    }

    if (rule.author !== undefined) {
        return `${message} by ${rule.author}`;
    }

    return message;
}

/**
 * Generate lint message from a rule
 * @param out warned lint result
 */
 export function code2String2(out: LintOut): string {
    if (out.rule.message !== undefined) {
        if (out.rule.author !== undefined) {
            return `${out.rule.message} by ${out.rule.author}`;
        }
        return out.rule.message;
    }

    const matchedContents = out.snippet.split('\n');
    let before = matchedContents[0];
    if (matchedContents.length > 1) {
        before += '...';
    }
    let message = `${before} should be fixed`;
    if (out.fixed !== undefined) {
        const fixedContents = out.fixed.split('\n');
        let after = fixedContents[0];
        if (fixedContents.length > 1) {
            after += '...';
        }

        message = `${before} should be ${after}`;
    }
    if (out.rule.deprecated === true) {
        message = `${before} is deprecated`;
    } else if (out.rule.unnecessary === true) {
        message = `${before} is unnecessary`;
    }

    if (out.rule.author !== undefined) {
        return `${message} by ${out.rule.author}`;
    }

    return message;
}
