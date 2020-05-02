import { existsSync, readFileSync } from 'fs';

import { extend as Extend, getInitPattern } from './extend';
import { Pattern } from './patterns';

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
        const patterns: Pattern[] = [];
        for (const pattern of patternJson) {
            if (pattern.extends === undefined) {
                patterns.push(pattern);
            } else {
                for (const extend of pattern.extends) {
                    patterns.push(...readExtends(extend));
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
