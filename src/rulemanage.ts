import { readFileSync } from "fs";
import { IPattern } from "./patterns";
// import { convertSource, getTriggarableCode } from "./rulecheck";

interface IPatternPath {
    [key: string]: string;
}

const patternPaths: IPatternPath = {
    "source.ts": "./rules/Typescript/default.json",
};

export async function readPatternFile(source: string) {
    const location = patternPaths[source];
    const patternContent = await readFileSync(location).toString();
    const patternJson = JSON.parse(patternContent) as IPattern[];
    return patternJson;
}

export function getTriggarableCode(tokens: string[], patterns: IPattern[]) {
    for (const pattern of patterns) {
        const trigger = makeBefore(pattern.code);
        if (isTriggarable(trigger, tokens)) {
            return pattern;
        }
    }
    return;
}

function makeBefore(changes: string[]) {
    const beforeChanges: string[] = [];
    for (const change of changes) {
        if (change.startsWith("*")) {
            const before = change.slice(2).split("-->")[0].slice(undefined, -1).split(" ");
            beforeChanges.push(...before);
        } else if (!change.startsWith("+")) {
            const before = change.slice(2).split(" ");
            beforeChanges.push(...before);
        }
    }
    return beforeChanges;
}

function isTriggarable(trigger: string[], tokens: string[]) {
    let startPosition = 0;
    for (const trigToken of trigger) {
      let isFound = false;
      for (let index = startPosition; index < tokens.length; index++) {
        const token = tokens[index];
        if (trigToken === token) {
          isFound = true;
          startPosition = index + 1;
        }
      }
      if (!isFound) {
        return false;
      }
    }
    return true;
}
