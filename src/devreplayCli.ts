import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

import { lint, fix } from './lib/lint';
import { outputLintOuts } from './lib/output';
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
            .version('1.9.24')
            .description('A linter that replay your coding style')
            .option('--fix', 'Fix the file')
            .option('--init', 'Make rules from recent git changes')
            .helpOption(true)
            .parse(process.argv);
        
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
            const rules = (await mineProjectRules(targetPath, logLength)).filter(x => x.after.length < 3 && x.before.length < 3);
            writeRuleFile(rules, targetPath);

            return 0;
        }

        const lstat = fs.lstatSync(targetPath);

        // Fix
        if (argv.fix === true) {
            if (!lstat.isFile()) {
                throw new Error(`${targetPath} should be directory path or file path`);
            }
            const fileName = targetPath;
            const results = fix(fileName, ruleFileName);
            console.log(results);
            return 0;
        }

        // Lint
        let fileNames = [];
        if (lstat.isDirectory()) {
            fileNames = getAllFiles(targetPath);
        } else if (lstat.isFile()) {
            fileNames = [targetPath];
        } else {
            throw new Error(`${targetPath} should be directory path or file path`);
        }
        let results_length = 0;
        const allResults = lint(fileNames, ruleFileName);
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
