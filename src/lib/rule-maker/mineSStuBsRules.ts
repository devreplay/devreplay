import { Rule } from './rule';
import { SStuB } from './sstubs';
import { existsSync, readFileSync } from 'fs';
import { makeRules, filterSameRules } from './makeRules';
import { getFileSource } from 'source-code-tokenizer';

export async function mineSStuBsRules(sstubs_path: string): Promise<Rule[]> {
    const sstubs = readSStuBs(sstubs_path);
    const rules: Rule[] = [];
    const unavailableBugs = ['CHANGE_MODIFIER', 'DELETE_THROWS_EXCEPTION', 'ADD_THROWS_EXCEPTION'];

    for (const sstub of sstubs) {
        if (sstub.bugType !== undefined && unavailableBugs.includes(sstub.bugType)) {
            continue;
        }
        
        const source = getFileSource(sstub.bugFilePath);
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

