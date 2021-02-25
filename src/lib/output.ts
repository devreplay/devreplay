import * as chalk from 'chalk';
import * as table from 'text-table';
import { Rule, ruleJoin } from './rule-maker/rule';
import { Range } from './position';

/** DevReplay linting result */
export interface LintOut {
    rule: Rule;
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
    const lintoutputs: string[][] = [];
    let errorCount = 0;
    let warningCount = 0;
    let informationCount = 0;
    let hintCount = 0;
    for (const lintout of lintouts) {
        const severity = makeSeverity(lintout.rule.severity);
        lintoutputs.push(formatLintOut(lintout));
        if (severity === 'E') {
            errorCount += 1;
        } else if (severity === 'W') {
            warningCount += 1;
        } else if (severity === 'I') {
            informationCount += 1;
        } else if (severity === 'H') {
            hintCount += 1;
        }
    }
    let output = table(lintoutputs);
    const total = errorCount + warningCount + informationCount + hintCount;

    if (total > 0) {
        let summary = [`\n\n${total} problems\n`,
                         `${errorCount} errors, `,
                         `${warningCount} warnings, `,
                         `${informationCount} infos, `,
                         `${hintCount} hints`,].join('');
        if (errorCount > 0) {
            summary = chalk.red(summary);
        } else if (warningCount > 0) {
            summary = chalk.yellow(summary);
        } else if (informationCount > 0) {
            summary = chalk.blue(summary);
        }
        output += chalk.bold(summary);
    }
    return output;
}

/**
 * Generate connected full lint message from a lint warning
 * @param matched A lint warning
 */
export function formatLintOut(matched: LintOut): string[] {
    const severity = makeFullSeverity(matched.rule.severity);
    const position = `${matched.fileName}:${matched.position.start.line}:${matched.position.start.character}`;
    const message = `${code2String(matched.rule)}`;
    return [position, severity, message];
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
export function makeSeverity(severity?: string): 'W' | 'E' | 'I' | 'H' {
    if (severity === undefined) {
        return 'W';
    } if (severity.toUpperCase().startsWith('E')) {
        return 'E';
    } if (severity.toUpperCase().startsWith('W')) {
        return 'W';
    } if (severity.toUpperCase().startsWith('I')) {
        return 'I';
    } if (severity.toUpperCase().startsWith('H')) {
        return 'H';
    } 
    return 'W';
}

/**
 * Generate colored severity from severity
 * @param severity severity string
 */
export function makeFullSeverity(severity?: string): string {
    const fixed_severity = makeSeverity(severity);
    if (fixed_severity === 'E') {
        return chalk.red('error');
    } if (fixed_severity === 'W') {
        return chalk.yellow('warning');
    } if (fixed_severity === 'I') {
        return chalk.blue('information');
    } if (fixed_severity === 'H') {
        return chalk.gray('hint');
    }
    return chalk.gray('warning');
}

/**
 * Generate lint message from a rule
 * @param rule warned rule
 */
export function code2String(rule: Rule): string {
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
