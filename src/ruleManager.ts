import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { extend as Extend, getInitPattern } from './extend';
import { tryReadFile } from './file';
import { Pattern } from './patterns';

export function writePatternFile(patterns: Pattern[], dirPath: string) {
    const outPatterns = readCurrentPattern(dirPath).concat(patterns);
    const patternStr = JSON.stringify(outPatterns, undefined, 2);
    const filePath = join(dirPath, './devreplay.json');
    writeFileSync(filePath, patternStr);
}

export function readPatternFile(fileName: string, ruleFileName?: string) {
    let location;
    if (ruleFileName !== undefined && existsSync(ruleFileName)) {
        location = ruleFileName;
    } else if ((existsSync('./devreplay.json'))) {
        location = 'devreplay.json';
    } else {
        return getInitPattern(fileName);
    }
    const patternContent = readFileSync(location).toString();
    try {
        const patternJson = JSON.parse(patternContent) as Pattern[];
        let patterns: Pattern[] = [];
        for (const pattern of patternJson) {
            if (pattern.extends === undefined) {
                patterns.push(pattern);
            } else {
                for (const extend of pattern.extends) {
                    patterns = patterns.concat(readExtends(extend));
                }
            }
        }

        return patterns;
    } catch (error) {
        console.log(error);
        console.log('usage: devreplay [target_file] [adopt_rule.json]');

        return [];
    }
}

function readCurrentPattern(dirPath: string): Pattern[] {
    const patternPath = join(dirPath, 'devreplay.json');
    let fileContents = undefined;
    try{
        fileContents =  tryReadFile(patternPath);
    } catch {
        return [];
    }
    if (fileContents === undefined) {
        return [];
    }
    return JSON.parse(fileContents) as Pattern[];
}

function readExtends(extend: string): Pattern[] {
    let location;
    if (Extend[extend] !== undefined) {
        return Extend[extend];
    }
    if (existsSync(extend)) {
        location = extend;
    } else {
        return [];
    }
    const patternContent = readFileSync(location).toString();
    try {
        const patternJson = JSON.parse(patternContent) as Pattern[];
        const patterns: Pattern[] = [];
        for (const pattern of patternJson) {
            if (pattern.extends === undefined) {
                patterns.push(pattern);
            }
        }

        return patterns;
    } catch (error) {
        console.log(error);
        console.log('usage: devreplay [target_file] [adopt_rule.json]');

        return [];
    }
}
