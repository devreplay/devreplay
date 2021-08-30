/* eslint-disable @typescript-eslint/no-namespace */
export type severity = 
'E' |'Error' | 'error' |
'W' | 'Warning' | 'warning'|
'H' | 'Hint' | 'hint' |
'I' | 'Information' | 'information' |
'O' | 'Off' | 'off';

/** DevReplay Rule format */
export interface BaseRule {
    /** Search target code */
    before: string[] | string;
    /** Replace target code */
    after: string[] | string;
    author?: string;
    /** Rule severity */
    severity?: severity;
    message?: string;
    /** Using regular expression for searching code */
    isRegex?: boolean;
    /** Search for the completely matched word (e.g. "keyword" will not match with "keywords") */
    wholeWord?: boolean;
    /** Caring lower or larger cases for searching code*/
    matchCase?: boolean;
    /** Preserving lower or larger cases for replacing code*/
    preserveCase?: boolean;
    /** Unused or unnecessary code. */
    unnecessary?: boolean;
    /** Deprecated or obsolete code. */
    deprecated?: boolean;
}

export namespace RuleSeverity {
	export const error = 'E';
    export const warning = 'W';
	export const information = 'I';
    export const hint = 'H';
	export const off = 'O';
}

export type RuleSeverity = 'E' | 'W' | 'I' | 'H' | 'O';

export interface DevReplayRule extends BaseRule {
    /** Search target code */
    before: string[] | string;
    /** Replace target code */
    after: string[] | string;
    /** Rule severity */
    severity: RuleSeverity;
    ruleId: number;
    author?: string;
    message?: string;
    /** Using regular expression for searching code */
    isRegex?: boolean;
    /** Search for the completely matched word (e.g. "keyword" will not match with "keywords") */
    wholeWord?: boolean;
    /** Caring lower or larger cases for searching code*/
    matchCase?: boolean;
    /** Preserving lower or larger cases for replacing code*/
    preserveCase?: boolean;
    /** Unused or unnecessary code. */
    unnecessary?: boolean;
    /** Deprecated or obsolete code. */
    deprecated?: boolean;
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