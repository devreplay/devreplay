import { Project } from './gitMiner';
import { makePatternsFromDetailedDiffs, makePatternsFromDiffs } from './makePatterns';
import { Pattern } from './patterns';

export async function mineRules(dirName: string, logLength: number): Promise<Pattern[]> {
    const project = new Project(dirName);
    const diffs = await project.getDiffs(logLength);
    return makePatternsFromDiffs(diffs);
}

export async function mineRulesDetail(dirName: string, logLength: number): Promise<Pattern[]> {
    const project = new Project(dirName);
    const diffs = await project.getDiffsDetail(logLength);
    return makePatternsFromDetailedDiffs(diffs);
}