export interface Rule {
    before: string[];
    after: string[];
    scopeName?: string;
    ruleId?: string;
    extends?: string[];
    number?: number;
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
