export interface Pattern {
    before: string[];
    after: string[];
    ruleId?: string;
    extends?: string[];
    number?: number;
    author?: string;
    severity?: string;
    message?: string;
    helpUri?: string;
    identifiers?: string[];
    regex?: boolean;
}
