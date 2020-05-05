import * as chalk from 'chalk';
import * as table from 'text-table';
import { Pattern } from './patterns';
import { Position } from './position';

export interface LintOut {
    pattern: Pattern;
    snippet: string;
    fileName: string;
    position: { start: Position; end: Position};
}

export interface LintOut {
    pattern: Pattern;
    snippet: string;
    fileName: string;
    position: { start: Position; end: Position};
}

export function outputLintOuts(lintouts: LintOut[]) {
    let lintoutputs: string[][] = [],
        errorCount = 0,
        warningCount = 0,
        informationCount = 0,
        hintCount = 0;
    for (const lintout of lintouts) {
        const severity = makeSeverity(lintout.pattern.severity);
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

export function formatLintOut(matched: LintOut) {
    const severity = makeFullSeverity(matched.pattern.severity);
    const position = `${matched.fileName}:${matched.position.start.line}:${matched.position.start.character}`;
    const description = `${code2String(matched.pattern)}`;
    return [position, severity, description];
}

export function makeSeverity(severity?: string) {
    if (severity === undefined) {
        return 'E';
    } if (severity.toUpperCase().startsWith('E')) {
        return 'E';
    } if (severity.toUpperCase().startsWith('W')) {
        return 'W';
    } if (severity.toUpperCase().startsWith('I')) {
        return 'I';
    } if (severity.toUpperCase().startsWith('H')) {
        return 'H';
    } 
    return 'E';
}

export function makeFullSeverity(severity?: string) {
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
    return chalk.gray('error');
}

export function code2String(pattern: Pattern) {
    if (pattern.description !== undefined) {
        if (pattern.author !== undefined) {
            return `${pattern.description} by ${pattern.author}`;
        }

        return pattern.description;
    }
    const description = `${pattern.condition.join('')} should be ${pattern.consequent.join('')}`;

    if (pattern.author !== undefined) {
        return `${description} by ${pattern.author}`;
    }

    return description;
}
