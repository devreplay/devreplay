import * as table from 'text-table';
import { red, yellow, blue, gray } from 'chalk';

import { DevReplayRule, ruleJoin, RuleSeverity } from './rule';
import { Range } from './position';

/** DevReplay linting result */
export interface LintOut {
    rule: DevReplayRule;
    snippet: string;
    fileName: string;
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
    const message = `${code2String(matched.rule)}  ${id}`;
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
        return RuleSeverity.warning;;
    } if (severity.toUpperCase().startsWith("E")) {
        return RuleSeverity.error;
    } if (severity.toUpperCase().startsWith('W')) {
        return RuleSeverity.warning;
    } if (severity.toUpperCase().startsWith('I')) {
        return RuleSeverity.information;
    } if (severity.toUpperCase().startsWith('H')) {
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
    const message = `${ruleJoin(rule.before)} should be ${ruleJoin(rule.after)}`;

    if (rule.author !== undefined) {
        return `${message} by ${rule.author}`;
    }

    return message;
}
