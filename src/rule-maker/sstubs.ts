export interface SStuB {
    bugType: string;
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