/**
 * Command Line Interface for DevReplay.
 * 
 * @module
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

import { extend as Extend } from './extend';
import { tryReadFile } from './file';
import { BaseRule, DevReplayRule, RuleSeverity, severity } from './rule';

type ReadableRule = BaseRule | string

/**
 * Write the rules on dir.
 * @param rules rules to write
 * @param dirPath The path to the file to write.
 * @param overwrite Whether to overwrite the file if it already exists.
 * @returns The rules read from the file.
 */
export function writeRuleFile(rules: DevReplayRule[], dirPath: string, keepOld?: boolean, removeOff?: boolean): void {
    let targetRules: DevReplayRule[] = [];
    if (keepOld) {
        targetRules = readCurrentRules(dirPath).concat(rules);
    } else {
        targetRules = rules;
    }
    let outRules: BaseRule[] = [];
    if (removeOff) {
        outRules = targetRules.filter(rule => rule.severity !== RuleSeverity.off)
                              .map(x => { return DevReplayRule2BaseRule(x); });
    } else {
        outRules = targetRules.map(x => { return DevReplayRule2BaseRule(x); });
    }
    const ruleStr = JSON.stringify(outRules, undefined, 2);
    const filePath = getDevReplayPath(dirPath);
    writeFileSync(filePath, ruleStr);
}

/**
 * Read the rules from the defined rule file
 * @param ruleFileName 
 * @return Rule list that are included `.devreplay.json`
 */
export function readRuleFile(ruleFileName?: string): DevReplayRule[] {
    let location: string;
    if (ruleFileName !== undefined && existsSync(ruleFileName)) {
        location = ruleFileName;
    } else if ((existsSync('./.devreplay.json'))) {
        location = '.devreplay.json';
    } else {
        return [];
    }
    try {
        return readCurrentRules(dirname(location));
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
export function readCurrentRules(dirPath: string): DevReplayRule[] {
    const rulePath = getDevReplayPath(dirPath);
    let fileContents: undefined| string = undefined;
    try{
        fileContents = tryReadFile(rulePath);
    } catch {
        return [];
    }
    if (fileContents === undefined) {
        return [];
    }

    const ruleJson = JSON.parse(fileContents) as ReadableRule[] | ReadableRule;
    if (Array.isArray(ruleJson)) {
        return readableRule2DevReplayRule(ruleJson);
    }
    return readableRule2DevReplayRule([ruleJson]);
}

function readableRule2DevReplayRule(rules:ReadableRule[]) {
    const outRules: DevReplayRule[] = [];
    let ruleIndex = 1;
    for (const rule of rules) {
        if (typeof rule === 'string') {
            const extendRules = readExtends(rule);
            for (const extendRule of extendRules) {
                outRules.push(BaseRule2DevReplayRule(extendRule, ruleIndex));
                ruleIndex++;
            }
        } else {
            outRules.push(BaseRule2DevReplayRule(rule, ruleIndex));
            ruleIndex++;
        }
    }
    return outRules;
}

export function BaseRule2DevReplayRule(rule:BaseRule, index: number): DevReplayRule {
    return {
        before: rule.before,
        after: rule.after,
        severity: fixSeveriy2RuleSeverity(rule.severity),
        ruleId: index,
        author: rule.author,
        message: rule.message,
        isRegex: rule.isRegex,
        wholeWord: rule.wholeWord,
        matchCase: rule.matchCase,
        preserveCase: rule.preserveCase
    };
}

export function DevReplayRule2BaseRule(rule:DevReplayRule): BaseRule {
    return {
        before: rule.before,
        after: rule.after,
        severity: fixSeveriy2RuleSeverity(rule.severity),
        author: rule.author,
        message: rule.message,
        isRegex: rule.isRegex,
        wholeWord: rule.wholeWord,
        matchCase: rule.matchCase,
        preserveCase: rule.preserveCase
    };
}

function fixSeveriy2RuleSeverity(severity?: severity): RuleSeverity {
    switch (severity) {
        case 'Error':
        case 'error':
        case 'E':
            return RuleSeverity.error;
        case 'Warning':
        case 'warning':
        case 'W':
            return RuleSeverity.warning;
        case 'Info':
        case 'info':
        case 'I':
            return RuleSeverity.information;
        case 'Hint':
        case 'hint':
        case 'H':
            return RuleSeverity.hint;
        case 'Off':
        case 'off':
        case 'O':
            return RuleSeverity.off;
        default:
            return RuleSeverity.warning;
    }
}

function getDevReplayPath(rootPath: string) {
	return join(rootPath, '.devreplay.json');
}

/**
 * Find the rules that are predefined in DevReplay implementation
 * @param extend rule definition
 * @return Rule list that are defined by `extend`
 */
export function readExtends(extend: string): BaseRule[] {
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
        const ruleJson = JSON.parse(ruleContent) as BaseRule[];
        const rules: BaseRule[] = [];
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
