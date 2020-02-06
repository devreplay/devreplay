import { existsSync, readFileSync } from "fs";

import { IPattern } from "./patterns";
import { extend as Extend } from "./extend";

export function readPatternFile(ruleFileName?: string) {
    let location;
    if (ruleFileName !== undefined &&  existsSync(ruleFileName)) {
        location = ruleFileName;
    } else if ((existsSync("./devreplay.json"))) {
        location = "devreplay.json";
    } else {
        return [];
    }
    const patternContent = readFileSync(location).toString();
    try {
        const patternJson = JSON.parse(patternContent) as IPattern[];
        const patterns: IPattern[] = [];
        for (const pattern of patternJson) {
            if (pattern.extends == undefined){
                patterns.push(pattern);
            } else {
                for (const extend of pattern.extends) {
                    patterns.push(...readExtends(extend))
                }
            }
        }

        return patterns;
    } catch (error) {
        console.log(error)
        console.log("usage: devreplay [target_file] [adopt_rule.json]");

        return [];
    }
}

function readExtends(extend: string): IPattern[] {
    let location;
    if (existsSync(extend)) {
        location = extend;
    } else if (Extend[extend] !== undefined){
        location = `${__dirname}/../rules/${Extend[extend].path}`;
    } else {
        return [];
    }
    const patternContent = readFileSync(location).toString();
    try {
        const patternJson = JSON.parse(patternContent) as IPattern[];
        const patterns: IPattern[] = [];
        for (const pattern of patternJson) {
            if (pattern.extends == undefined){
                patterns.push(pattern);
            } else {
                for (const extend of pattern.extends) {
                    patterns.push(...readExtends(extend))
                }
            }
        }

        return patterns;
    } catch (error) {
        console.log(error)
        console.log("usage: devreplay [target_file] [adopt_rule.json]");

        return [];
    }
}