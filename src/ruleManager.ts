import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { extend as Extend } from './extend';
import { tryReadFile } from './file';
import { Rule } from './rule-maker/rule';

export function writeRuleFile(rules: Rule[], dirPath: string): void {
    const outRules = readCurrentRules(dirPath).concat(rules);
    const ruleStr = JSON.stringify(outRules, undefined, 2);
    const filePath = join(dirPath, './devreplay.json');
    writeFileSync(filePath, ruleStr);
}

export function readRuleFile(ruleFileName?: string): Rule[] {
    let location;
    if (ruleFileName !== undefined && existsSync(ruleFileName)) {
        location = ruleFileName;
    } else if ((existsSync('./devreplay.json'))) {
        location = 'devreplay.json';
    } else {
        return [];
    }
    const ruleContent = readFileSync(location).toString();
    try {
        const ruleJson = JSON.parse(ruleContent) as Rule[];
        let rules: Rule[] = [];
        for (const rule of ruleJson) {
            if (rule.extends === undefined) {
                rules.push(rule);
            } else {
                for (const extend of rule.extends) {
                    rules = rules.concat(readExtends(extend));
                }
            }
        }

        return rules;
    } catch (error) {
        console.log(error);
        console.log('usage: devreplay [target_file] [adopt_rule.json]');

        return [];
    }
}

function readCurrentRules(dirPath: string): Rule[] {
    const rulePath = join(dirPath, 'devreplay.json');
    let fileContents = undefined;
    try{
        fileContents =  tryReadFile(rulePath);
    } catch {
        return [];
    }
    if (fileContents === undefined) {
        return [];
    }
    return JSON.parse(fileContents) as Rule[];
}

function readExtends(extend: string): Rule[] {
    let location;
    if (Extend[extend] !== undefined) {
        return Extend[extend];
    }
    if (existsSync(extend)) {
        location = extend;
    } else {
        return [];
    }
    const ruleContent = readFileSync(location).toString();
    try {
        const ruleJson = JSON.parse(ruleContent) as Rule[];
        const rules: Rule[] = [];
        for (const rule of ruleJson) {
            if (rule.extends === undefined) {
                rules.push(rule);
            }
        }

        return rules;
    } catch (error) {
        console.log(error);
        console.log('usage: devreplay [target_file] [adopt_rule.json]');

        return [];
    }
}
