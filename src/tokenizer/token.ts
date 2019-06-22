import { IToken, TextRange, TokenType } from "./types";

export class Token extends TextRange implements IToken {
    public readonly type: TokenType;

    constructor(type: TokenType, start: number, length: number) {
        super(start, length);
        this.type = type;
    }
}
