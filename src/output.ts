
import * as chalk from 'chalk';
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

export function outputLintOut(matched: LintOut) {
    const severity = makeSeverity(matched.pattern.severity);
    const output = formatLintOut(matched);
    if (severity === 'E') {
        console.error(output);
    } else if (severity === 'W') {
        console.warn(output);
    } else if (severity === 'I') {
        console.info(output);
    } else if (severity === 'H') {
        console.log(output);
    }
}

export function formatLintOut(matched: LintOut) {
    const severity = makeFullSeverity(matched.pattern.severity);
    const position = `${matched.fileName}:${matched.position.start.line}:${matched.position.start.character}`;
    const description = `${code2String(matched.pattern)}`;
    return `${position} ${severity} ${description}`;
}

export function makeSeverity(severity?: string) {
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

export function makeFullSeverity(severity?: string) {
    const fixed_severity = makeSeverity(severity);
    if (fixed_severity === 'E') {
        return chalk.default.red('error');
    } if (fixed_severity === 'W') {
        return chalk.default.yellow('warning');
    } if (fixed_severity === 'I') {
        return chalk.default.blue('information');
    } if (fixed_severity === 'H') {
        return chalk.default.gray('hint');
    }
    return chalk.default.gray('hint');
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
