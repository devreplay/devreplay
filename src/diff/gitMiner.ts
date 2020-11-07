import * as git from 'simple-git/promise';

export class Project {
  path: string
  localGit: git.SimpleGit

  constructor(path: string) {
    this.path = path;
    this.localGit = git(this.path);
  }
  
  async getDiff (logLength: number) {
    const diffs: string[] = [];
    const hashes = this.getHashes(logLength);
    for (const hash of await hashes) {
      const diff = this.localGit.diff([hash]);
      diffs.push(await diff);
    }
    return diffs;
  }

  async getHashes(logLength: number) {
    const hashes: string[] = [];
    const log = await this.localGit.log({});
    for (let index = 0; index < Math.min(log.total, logLength); index++) {
      const logLine = log.all[index];
      hashes.push(logLine.hash);
    }
    return hashes;
  }

  // async getChangedFilesWithHEAD (length: number, length2?: number): Promise<string[]> {  
  //   const diffLength = [];
  //   if (length2 !== undefined) {
  //     diffLength.push(`HEAD~${length2}..HEAD~${length}`);
  //   } else {
  //     diffLength.push(`HEAD~${length}`);
  //   }
  //   const diff = await this.localGit.diffSummary(diffLength);
  //   return diff.files
  //     .map(file => { return file.file; });
  // }

  // async getfiles(index: string): Promise<string>{
  //   return await this.localGit.catFile(['-p', index]);
  // }
}

export async function getChangedFilesWithHEAD (dirPath: string, length: number, length2?: number): Promise<string[]> {
  const localGit: git.SimpleGit = git(dirPath);

  const diffLength = [];
  if (length2 !== undefined) {
    diffLength.push(`HEAD~${length2}..HEAD~${length}`);
  } else {
    diffLength.push(`HEAD~${length}`);
  }
  const diff = await localGit.diffSummary(diffLength);
  return diff.files
    .map(file => { return file.file; });
}
