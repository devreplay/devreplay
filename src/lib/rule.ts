export type severity = 
'E' |'Error' | 'error' |
'W' | 'Warning' | 'warning'|
'H' | 'Hint' | 'hint' |
'I' | 'Information' | 'information';

/** DevReplay Rule format */
export interface Rule {
    /** Search target code */
    before: string[] | string;
    /** Replace target code */
    after: string[] | string;
    ruleId?: string;
    author?: string;
    severity?: severity;
    message?: string;
    helpUri?: string;
    identifiers?: string[];
    /** Using regular expression for searching code */
    isRegex?: boolean;
    /** Search for the completely matched word (e.g. "keyword" will not match with "keywords") */
    wholeWord?: boolean;
    /** Caring lower or larger cases for searching code*/
    matchCase?: boolean;
    /** Preserving lower or larger cases for replacing code*/
    preserveCase?: boolean;
}

/**
 * Check is rule string empty string or not
 * @param rule Target rule string
 */
export function isEmptyRule(rule: string[] | string): boolean {
    if (typeof rule === 'string') {
        return rule === '';
    }
    return rule.length === 0 || (rule.length === 1 && rule[0] === '');
}

/**
 * Make the connected code from rule
 * @param rule Target rule string
 */
export function ruleJoin(rule: string[] | string): string {
    if (typeof rule === 'string') {
        return rule;
    }
    return rule.join('\n');
}