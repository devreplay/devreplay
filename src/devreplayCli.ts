import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

import { fixFromFile, lintFromFile } from './lib/lint';
import { LintOut, outputLintOuts } from './lib/output';
import { mineProjectRules } from './lib/rule-maker/mineProjectRules';
import { writeRuleFile } from './lib/ruleManager';

interface Argv {
    fix?: boolean;
    init?: boolean;
}

const cli = {
    async execute() {
        const program = new commander.Command();
        program
            .version('1.9.23')
            .description('A linter that replay your coding style')
            .option('--fix', 'Fix the file')
            .option('--init', 'Make rules from recent git changes')
            .helpOption(true)
            .parse(process.argv);
        program.parse(process.argv);
        
        const args = program.args;
        const argv = program.opts() as Argv;

        let ruleFileName: string | undefined;
        const files = args;
        let targetPath = './';
        if (files.length > 0) {
            targetPath = files[0];
        }
        if (files.length >= 2) {
            ruleFileName = files[1];
        }

        // Init
        if (argv.init) {
            let logLength = 10;
            if (files.length > 1 && !isNaN(Number(files[1]))) {
                logLength = Number(files[1]);
            }
            const rules = (await mineProjectRules(targetPath, logLength)).filter(x => x.after.length === 1 && x.before.length === 1);
            writeRuleFile(rules, targetPath);

            return 0;
        }

        let fileNames = []
        const lstat = fs.lstatSync(targetPath)
        if (lstat.isDirectory()) {
            fileNames = getAllFiles(targetPath);
        } else if (lstat.isFile()) {
            fileNames = [targetPath]
        } else {
            throw new Error(`${targetPath} should be directory path or file path`);
        }

        // Fix
        if (argv.fix === true) {
            for (const fileName of fileNames) {
                const results = fixFromFile(fileName, ruleFileName);
                console.log(results);
                return 0;
            }
            return 0;
        }

        // Lint
        let results_length = 0;
        const allResults: LintOut[] = [];
        for (const fileName of fileNames) {
            const results = lintFromFile(fileName, ruleFileName);
            allResults.push(...results);
        }
        results_length += allResults.length;
        if (results_length === 0) {
            return 0;
        } else{
            console.log(outputLintOuts(allResults));
            return 1;
        }

    }
};

function getAllFiles(dirName: string) {
    const dirents = fs.readdirSync(dirName, { withFileTypes: true });
    const filesNames: string[] = [];
    for (const files of dirents) {
        if (files.isDirectory()){
            filesNames.push(...getAllFiles(path.join(dirName, files.name)));
        } else {
            filesNames.push(path.join(dirName, files.name));
        }
    }
    return filesNames;
}

module.exports = cli;
