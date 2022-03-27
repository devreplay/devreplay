/**
 * Command Line Interface for DevReplay.
 * 
 * @module
 */
import { Command } from 'commander';
import { lstatSync, readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

import { lint, fix } from './core/lint';
import { outputLintOuts } from './core/output';

/**
 * CLI description for DevReplay.
 */
const cli = {
    execute() {
        const program = new Command();
        program
            .version('1.9.24')
            .description('A linter that replay your coding style')
            .option('--fix', 'Fix the file')
            // .option('--init', 'Make rules from recent git changes')
            .helpOption(true)
            .parse(process.argv);
        
        const args = program.args;
        const argv = program.opts() ;

        let ruleFileName: string | undefined;
        const files = args;
        let targetPath = './';
        if (files.length > 0) {
            targetPath = files[0];
        }
        if (files.length >= 2) {
            ruleFileName = files[1];
        }

        const lstat = lstatSync(targetPath);

        // Fix
        if (argv.fix === true) {
            if (!lstat.isFile()) {
                throw new Error(`${targetPath} should be file path`);
            }
            const fileName = targetPath;
            const results = fix(fileName, ruleFileName);
            writeFileSync(fileName, results);
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

/**
 * Get all file pathes in the target directory.
 * @param dirName Target directory path
 * @returns File pathes
 */
function getAllFiles(dirName: string) {
    const dirents = readdirSync(dirName, { withFileTypes: true });
    const filesNames: string[] = [];
    for (const files of dirents) {
        if (files.isDirectory()){
            filesNames.push(...getAllFiles(join(dirName, files.name)));
        } else {
            filesNames.push(join(dirName, files.name));
        }
    }
    return filesNames;
}

module.exports = cli;
