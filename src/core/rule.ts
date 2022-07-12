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
    /** Rule author that will be shown on result */
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

/**
 * DevReplay Rule severity format
 */
export namespace RuleSeverity {
	export const error = 'error';
    export const warning = 'warning';
	export const information = 'info';
    export const hint = 'hint';
	export const off = 'off';
}
export type RuleSeverity = 'error' | 'warning' | 'info' | 'hint' | 'off';

/**
 * DevReplay Rule format
 */
export interface DevReplayRule extends BaseRule {
    /** Search target code */
    before: string[] | string;
    /** Replace target code */
    after?: string[] | string;
    /** Rule severity */
    severity: RuleSeverity;
    /** Rule id for identify */
    ruleId: number;
    /** Rule author that will be shown on result */
    author?: string;
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

/**
 * Make the connected code from rule
 * @param ruleParam Target rule string
 */
export function joinRuleParam(ruleParam: string[] | string, forBefore?: boolean): string {
    if (typeof ruleParam === 'string') {
        return ruleParam;
    }
    if (forBefore) {
        return ruleParam.join('\n');
    }
    return ruleParam.join('\n');
}