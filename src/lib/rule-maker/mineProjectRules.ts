import { Project } from './gitMiner';
import { makeRulesFromDetailedDiffs, makeRulesFromDiffs } from './makeRules';
import { Rule } from './rule';

/**
 * Generate DevReplay rules from project git log
 * @param dirName Target project path
 * @param logLength Mining git log length
 */
export async function mineProjectRules(dirName: string, logLength: number): Promise<Rule[]> {
    const project = new Project(dirName);
    const diffs = await project.getDiffs(logLength);
    return makeRulesFromDiffs(diffs);
}

/**
 * Generate DevReplay detailed rules from project git log
 * @param dirName Target project path
 * @param logLength Mining git log length
 */
export async function mineProjectRulesDetail(dirName: string, logLength: number): Promise<Rule[]> {
    const project = new Project(dirName);
    const diffs = await project.getDiffsDetail(logLength);
    return makeRulesFromDetailedDiffs(diffs);
}