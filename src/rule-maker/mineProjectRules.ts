import { Project } from './gitMiner';
import { makeRulesFromDetailedDiffs, makeRulesFromDiffs } from './makeRules';
import { Rule } from './rule';

export async function mineRules(dirName: string, logLength: number): Promise<Rule[]> {
    const project = new Project(dirName);
    const diffs = await project.getDiffs(logLength);
    return makeRulesFromDiffs(diffs);
}

export async function mineRulesDetail(dirName: string, logLength: number): Promise<Rule[]> {
    const project = new Project(dirName);
    const diffs = await project.getDiffsDetail(logLength);
    return makeRulesFromDetailedDiffs(diffs);
}