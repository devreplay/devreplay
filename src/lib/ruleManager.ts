import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';

import { extend as Extend } from './extend';
import { tryReadFile } from './file';
import { BaseRule, DevReplayRule, RuleSeverity, severity } from './rule';

type ReadableRule = BaseRule | string

export function writeRuleFile(rules: DevReplayRule[], dirPath: string): void {
    const outRules = readCurrentRules(dirPath).concat(rules);
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

    const ruleJson = JSON.parse(fileContents) as ReadableRule[];
    return readableRule2DevReplayRule(ruleJson);
}

function readableRule2DevReplayRule(rules:ReadableRule[]) {
    const outRules: DevReplayRule[] = [];
    for (let index = 0; index < rules.length; index++) {
        const rule = rules[index];
        if (typeof rule === 'string') {
            const extendRules = readExtends(rule);
            for (let i = 0; i < extendRules.length; i++) {
                outRules.push(BaseRule2DevReplayRule(extendRules[i], index));
            }
        } else {
            outRules.push(BaseRule2DevReplayRule(rule, index));
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
        case 'Information':
        case 'information':
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
