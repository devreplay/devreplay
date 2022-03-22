/**
 * DevReplay rule interfaces and namespace.
 * 
 * @module rule
 */

/* eslint-disable @typescript-eslint/no-namespace */
export type severity = 
'E' |'Error' | 'error' |
'W' | 'Warning' | 'warning'|
'I' | 'Info' | 'info' |
'H' | 'Hint' | 'hint' |
'O' | 'Off' | 'off';

/** DevReplay Rule format */
export interface BaseRule {
    /** Search target code */
    before: string[] | string;
    /** Replace target code */
    after?: string[] | string;
    author?: string;
    /** Rule severity */
    severity?: severity;
    /** Warning message that is shown on CLI and editor */
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
	export const error = 'error';
    export const warning = 'warning';
	export const information = 'info';
    export const hint = 'hint';
	export const off = 'off';
}

export type RuleSeverity = 'error' | 'warning' | 'info' | 'hint' | 'off';

export interface DevReplayRule extends BaseRule {
    /** Search target code */
    before: string[] | string;
    /** Replace target code */
    after?: string[] | string;
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
 * Make the connected code from rule
 * @param ruleParam Target rule string
 */
export function joinRuleParam(ruleParam: string[] | string): string {
    if (typeof ruleParam === 'string') {
        return ruleParam;
    }
    return ruleParam.join('\n');
}