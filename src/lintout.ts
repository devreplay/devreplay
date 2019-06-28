import { code2String, IPattern } from "./patterns";

export interface ILintOut {
    fileName: string;
    line: number;
    pattern: IPattern;
}

export function formatIlintOut(out: ILintOut) {
    return `${out.fileName}:${out.line}: ${code2String(out.pattern.code)}`;
}
