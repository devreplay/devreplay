import * as commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

import { fixFromFile, lintFromFile } from './lib/lint';
import { outputLintOuts } from './lib/output';
import { mineProjectRules } from './lib/rule-maker/mineProjectRules';
import { writeRuleFile } from './lib/ruleManager';
import { strDiff2treeDiff } from './lib/rule-maker/code-parser';

interface Argv {
    fix?: boolean;
    init?: boolean;
    regex?: boolean;
}

const cli = {
    async execute() {
        const program = new commander.Command();
        program
            .version('1.9.12')
            .description('A linter that replay your coding style')
            .option('--fix　', 'Fix the file')
            .option('--init', 'Make rules from recent git changes')
            .option('--regex', 'Learn by using regular expression')
            .helpOption(true)
            .parse(process.argv);
        program.parse(process.argv);
        
        const args = program.args;
        const argv = program.opts() as Argv;

        if (argv.regex) {
            const sourceCode = 'if (a == 0)';        
            const newSourceCode = 'if (a == 0 && b == 1)';
            const change = strDiff2treeDiff(sourceCode, newSourceCode, 'Java');
            console.log(change);
            return 0;
        }

        let ruleFileName: string | undefined;
        const files = args;
        let dirName = './';
        if (files.length > 0) {
            dirName = files[0];
        }
        if (files.length >= 2) {
            ruleFileName = files[1];
        }

        if (argv.init) {
            let logLength = 10;
            if (files.length > 1 && !isNaN(Number(files[1]))) {
                logLength = Number(files[1]);
            }
            const rules = (await mineProjectRules(dirName, logLength)).filter(x => x.after.length === 1 && x.before.length === 1);
            writeRuleFile(rules, dirName);

            return 0;
        }

        const fileNames = getAllFiles(dirName);
        if (argv.fix === true) {
            for (const fileName of fileNames) {
                const results = fixFromFile(fileName, ruleFileName);
                console.log(results);
                return 0;
            }
            return 0;
        }
        // Just lint
        let results_length = 0;
        for (const fileName of fileNames) {
            const results = lintFromFile(fileName, ruleFileName);
            console.log(outputLintOuts(results));
            results_length += results.length;
        }
        return results_length === 0 ? 0 : 1;
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
