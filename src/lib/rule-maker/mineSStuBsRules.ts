import { Rule } from './rule';
import { existsSync, readFileSync } from 'fs';
import { makeRules, filterSameRules } from './makeRules';
import { getFileSource } from '../extensionmap';

export interface SStuB {
    bugType?: string;
    fixCommitSHA1: string;
    fixCommitParentSHA1: string,
    bugFilePath: string,
    fixPatch: string,
    projectName: string,
    bugLineNum: number,
    bugNodeStartChar: number,
    bugNodeLength: number,
    fixLineNum: number,
    fixNodeStartChar: number,
    fixNodeLength: number,
    sourceBeforeFix: string,
    sourceAfterFix: string 
}

/**
 * Make rules from single statement bugs (SStuBs) dataset https://github.com/mast-group/mineSStuBs
 * @param sstubs_path Path of SStuBs json file
 */
export async function mineSStuBsRules(sstubs_path: string): Promise<Rule[]> {
    const sstubs = readSStuBs(sstubs_path);
    const rules: Rule[] = [];
    const unavailableBugs = ['CHANGE_MODIFIER', 'DELETE_THROWS_EXCEPTION', 'ADD_THROWS_EXCEPTION'];

    for (const sstub of sstubs) {
        if (sstub.bugType !== undefined && unavailableBugs.includes(sstub.bugType)) {
            continue;
        }
        
        const source = getFileSource(sstub.bugFilePath);
        if (source === undefined) {
            return [];
        }
        const rule = await makeRules(sstub.sourceBeforeFix, sstub.sourceAfterFix, source);
        if (rule !== undefined){
            rule.author = sstub.projectName;
            if (sstub.bugType !== undefined) {
                rule.message = sstub.bugType;
                rule.ruleId = sstub.fixCommitSHA1;
            }
            rules.push(rule);
        }
    }

    return filterSameRules(rules);
}

/**
 * Read SStuBs file
 * @param sstubs_path Path of SStuBs json file
 */
function readSStuBs(sstubs_path: string): SStuB[] {
    if (!existsSync(sstubs_path)) {
        return [];
    }

    const ruleContent = readFileSync(sstubs_path).toString();
    try {
        return JSON.parse(ruleContent) as SStuB[];
    } catch (error) {
        console.log(error);
        console.log(`Failed to read SStuBs file ${sstubs_path}`);

        return [];
    }
}

