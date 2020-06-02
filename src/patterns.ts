export interface Pattern {
    condition: string[];
    consequent: string[];
    extends?: string[];
    number?: number;
    author?: string;
    severity?: string;
    description?: string;
    link?: string;
    identifiers?: string[];
    regex?: boolean;
}
