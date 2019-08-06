import { existsSync, readFileSync } from "fs";
import { IPattern } from "./patterns";
import { sources } from "./source";

export async function readPatternFile(langId: string, ruleFileName?: string) {
    const location = ruleFileName &&  existsSync(ruleFileName) ?
    ruleFileName :
    (existsSync("./devreplay.json")) ?
    "devreplay.json" : __dirname + "/../rules/" + sources[langId].path;
    const patternContent = await readFileSync(location).toString();
    const patternJson = JSON.parse(patternContent) as IPattern[];
    return patternJson;
}
