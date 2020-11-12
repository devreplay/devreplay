import { Project } from './diff/gitMiner';
import { makePatternsFromDetailedDiffs, makePatternsFromDiffs } from './diff/makePatterns';

export async function mineRules(dirName: string, logLength: number) {
    const project = new Project(dirName);
    const diffs = await project.getDiffs(logLength);
    return (await makePatternsFromDiffs(diffs)).filter(x => x.after.length === 1 && x.before.length === 1);
}

export async function mineRulesDetail(dirName: string, logLength: number) {
    const project = new Project(dirName);
    const diffs = await project.getDiffsDetail(logLength);
    return (await makePatternsFromDetailedDiffs(diffs)).filter(x => x.after.length < 3 && x.before.length < 3);
}