import { Project } from './diff/gitMiner';
import { makePatternsFromDetailedDiffs, makePatternsFromDiffs } from './diff/makePatterns';

export async function mineRules(dirName: string, logLength: number) {
    const project = new Project(dirName);
    const diffs = await project.getDiffs(logLength);
    return makePatternsFromDiffs(diffs);
}

export async function mineRulesDetail(dirName: string, logLength: number) {
    const project = new Project(dirName);
    const diffs = await project.getDiffsDetail(logLength);
    return makePatternsFromDetailedDiffs(diffs);
}