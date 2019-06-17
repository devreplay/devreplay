import { readFile } from "fs";
// import path = require("path");
import * as vsctm from "vscode-textmate";
import { IToken } from "./token";

interface IGrammarPath {
    [key: string]: string;
}

const grammarPaths: IGrammarPath = {
    "source.cpp": "cpp.tmLanguage.json",
    "source.java": "java.tmLanguage.json",
    "source.js": "JavaScript.tmLanguage.json",
    "source.python": "MagicPython.tmLanguage.json",
    "source.ts": "TypeScript.tmLanguage.json",
};

const registry = new vsctm.Registry({
    async loadGrammar(scopeName: string) {
        const location = __dirname + "/../syntaxes/" + grammarPaths[scopeName];
        return new Promise((resolve, reject) => {
            if (!location) { return; }
            readFile(location, "utf8", (err, data) => {
                if (err) { reject(err); }
                resolve(vsctm.parseRawGrammar(data, location));
                return vsctm.parseRawGrammar(data, location);
            });
        });
    },
});

export async function devideByToken(text: string, source: string, beforeRuleStack?: vsctm.StackElement) {
    const tokens: IToken[] = [];
    let ruleStack = vsctm.INITIAL;
    if (beforeRuleStack) {
        ruleStack = beforeRuleStack;
    }
    // Load the JavaScript grammar and any other grammars included by it async.
    await registry.loadGrammar(source).then((grammar: vsctm.IGrammar) => {
        // at this point `grammar` is available...
        const lineTokens = grammar.tokenizeLine(text, ruleStack);
        ruleStack = lineTokens.ruleStack;
        for (const token of lineTokens.tokens) {
            tokens.push({
                scopes: token.scopes,
                value: text.slice(token.startIndex, token.endIndex),
            });
        }
    });
    return {
        ruleStack,
        tokens,
    };
}
