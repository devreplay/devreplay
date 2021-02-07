export interface Rule {
    before: string[] | string;
    after: string[] | string;
    ruleId?: string;
    extends?: string[];
    author?: string;
    severity?: string;
    message?: string;
    helpUri?: string;
    identifiers?: string[];
    isRegex?: boolean;
    wholeWord?: boolean;
    matchCase?: boolean;
    preserveCase?: boolean;
}

export function isEmptyRule(rule: string[] | string): boolean {
    if (typeof rule === 'string') {
        return rule === '';
    }
    return rule.length === 0 || (rule.length === 1 && rule[0] === '');
}

export function ruleJoin(rule: string[] | string): string {
    if (typeof rule === 'string') {
        return rule;
    }
    return rule.join('\n');
}