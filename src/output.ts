
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
    const severity = makeSeverity(matched.pattern.severity);
    const position = `${matched.fileName}:${matched.position.start.line},${matched.position.start.character}`;
    const description = `${code2String(matched.pattern)}`;
    return `${severity}:${position}: ${description}`;
}

export function makeSeverity(severity?: string): 'H' | 'I' | 'W' | 'E' {
    if (severity === undefined) {
        return 'W';
    }
    if (severity.toUpperCase().startsWith('E')) {
        return 'E';
    } else if (severity.toUpperCase().startsWith('W')) {
        return 'W';
    } else if (severity.toUpperCase().startsWith('I')) {
        return 'I';
    } else if (severity.toUpperCase().startsWith('H')) {
        return 'H';
    } else {
        return 'W';
    }
}

export function makeFullSeverity(severity?: string) {
    if (severity === undefined) {
        return 'Warning';
    }
    let outSeverity;
    if (severity.toUpperCase().startsWith('E')) {
        outSeverity = 'Error';
    } else if (severity.toUpperCase().startsWith('W')) {
        outSeverity = 'Warning';
    } else if (severity.toUpperCase().startsWith('I')) {
        outSeverity = 'Info';
    } else if (severity.toUpperCase().startsWith('H')) {
        outSeverity = 'Hint';
    } else {
        outSeverity = 'Error';
    }

    return outSeverity;
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
