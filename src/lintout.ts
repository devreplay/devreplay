import { IPattern } from "./patterns";

export interface ILintOut {
    fileName: string;
    line: number;
    pattern: IPattern;
}
