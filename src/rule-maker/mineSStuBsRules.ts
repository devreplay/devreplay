import { Rule } from './rule';
import { SStuB } from './sstubs';
import { existsSync, readFileSync } from 'fs';
import { makeRules } from './makeRules';

export async function mineSStuBsRules(sstubs_path: string): Promise<Rule[]> {
    // Jsonファイルを読み込む
    const sstubs = readSStuBs(sstubs_path);
    const rules: Rule[] = [];

    for (const sstub of sstubs) {
        const rule = await makeRules(sstub.sourceBeforeFix, sstub.sourceAfterFix);
        if (rule !== undefined){
            rules.push(rule);
        }
    }

    return rules;
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

