import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { extend as Extend } from './extend';
import { tryReadFile } from './file';
import { Rule } from './rule-maker/rule';

type ReadableRule = Rule | string

export function writeRuleFile(rules: Rule[], dirPath: string): void {
    const outRules = readCurrentRules(dirPath).concat(rules);
    const ruleStr = JSON.stringify(outRules, undefined, 2);
    const filePath = join(dirPath, './.devreplay.json');
    writeFileSync(filePath, ruleStr);
}

/**
 * Read the rules from the defined rule file
 * @param ruleFileName 
 * @return Rule list that are included `.devreplay.json`
 */
export function readRuleFile(ruleFileName?: string): Rule[] {
    let location;
    if (ruleFileName !== undefined && existsSync(ruleFileName)) {
        location = ruleFileName;
    } else if ((existsSync('./.devreplay.json'))) {
        location = '.devreplay.json';
    } else {
        return [];
    }
    const ruleContent = readFileSync(location).toString();
    try {
        const ruleJson = JSON.parse(ruleContent) as ReadableRule[];
        let rules: Rule[] = [];
        for (const rule of ruleJson) {
            if (typeof rule === 'string') {
                rules = rules.concat(readExtends(rule));
            } else {
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

/**
 * Read the rules from the directory `.devreplay.json` file
 * @param dirPath The target directory that has .devreplay.json
 * @return Rule list that are defined in the rule file
 */
function readCurrentRules(dirPath: string): Rule[] {
    const rulePath = join(dirPath, '.devreplay.json');
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

/**
 * Find the rules that are predefined in DevReplay implementation
 * @param extend rule definition
 * @return Rule list that are defined by `extend`
 */
export function readExtends(extend: string): Rule[] {
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
            if (typeof rule !== 'string') {
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
