export interface ITokenPair {
    value: string;
    start: number;
    end: number;
}

export function IToken2String(tokens: ITokenPair[]) {
    let output = "";
    for (const token of tokens) {
        while (output.length < token.start) {
            output += " ";
        }
        output += token.value;
    }
    return output;
}