import { existsSync, readFileSync } from "fs";

import { IPattern } from "./patterns";
import { sources } from "./source";

export function readPatternFile(ruleFileName?: string, langId?: string) {
    let location;
    if (ruleFileName !== undefined &&  existsSync(ruleFileName)) {
        location = ruleFileName;
    } else if ((existsSync("./devreplay.json"))) {
        location = "devreplay.json";
    } else if (langId !== undefined && existsSync(`${__dirname}/../rules/${sources[langId].path}`)) {
        location = `${__dirname}/../rules/${sources[langId].path}`;
    } else {
        return [];
    }
    const patternContent = readFileSync(location).toString();
    try {
        const patternJson = JSON.parse(patternContent) as IPattern[];

        return patternJson;
    } catch (error) {
        console.log("usage: devreplay [target_file] [adopt_rule.json]");

        return [];
    }

}
