import commander = require('commander');

import { fixFromFile, lintFromFile } from './lint';
import { makePatternsFromFiles } from './makePatterns';
import { outputLintOuts } from './output';
import { arrayify } from './utils';
import path = require('path');
import fs = require('fs');

interface Argv {
    fix?: boolean;
    init?: boolean;
    dir?: boolean;
    out?: string;
}

interface Option {
    short?: string;
    // Commander will camelCase option names.
    name: keyof Argv | 'fix' | 'init' | 'dir';
    type: 'string' | 'boolean' | 'array';
    describe: string; // Short, used for usage message
    description: string; // Long, used for `--help`
}

const options: Option[] = [
    {
        name: 'fix',
        type: 'boolean',
        describe: 'fix the file',
        description: 'fix the file',
    },
    {
        name: 'dir',
        type: 'boolean',
        describe: 'target the directory files',
        description: 'target the directory files'
    },
    {
        name: 'init',
        type: 'boolean',
        describe: 'make pattern from two files',
        description: 'make pattern from two files'
    }
];

const cli = {
    execute() {
        for (const option of options) {
            const commanderStr = optionUsageTag(option) + optionParam(option);
            if (option.type === 'array') {
                commander.option(commanderStr, option.describe, collect, []);
            } else {
                commander.option(commanderStr, option.describe);
            }
        }

        // Hack to get unknown option errors to work. https://github.com/visionmedia/commander.js/pull/121
        const parsed = commander.parseOptions(process.argv.slice(2));
        commander.args = parsed.operands;
        if (parsed.unknown.length !== 0) {
            (commander.parseArgs as (args: string[], unknown: string[]) => void)([], parsed.unknown);
        }
        const argv = commander.opts() as Argv;

        if (
            !(
                argv.init === undefined ||
                commander.args.length > 0
            )
        ) {
            console.error('No files specified. Use --project to lint a project folder.');
            return 2;
        }

        let ruleFileName: string | undefined;
        if (argv.init) {
            const files = arrayify(commander.args);
            if (files.length < 2) {
                console.log('Make pattern command require two files');
                return 1;
            }
            const patterns = makePatternsFromFiles(files[0], files[1]);
            if (patterns!== undefined) {
                patterns?.then(content => {
                    console.log(JSON.stringify(content, undefined, 2));
                });
            }
            return 0;
        }

        if (argv.dir) {
            const files = arrayify(commander.args);
            const dirName = files[0];
            if (files.length >= 2) {
                ruleFileName = files[1];
            }
            const fileNames = getAllFiles(dirName);
            let results_length = 0;

            for (const fileName of fileNames) {
                if (argv.fix === true) {
                    const results = fixFromFile(fileName, ruleFileName);
                    console.log(results);
                    return 0;
                } else {
                    const results = lintFromFile(fileName, ruleFileName);
                    console.log(outputLintOuts(results));
                    results_length += results.length;
                }
            }
            return results_length === 0 ? 0 : 1;
        } else{
            const files = arrayify(commander.args);
            const fileName = files[0];
            if (files.length >= 2) {
                ruleFileName = files[1];
            }
            let results_length = 0;

            if (argv.fix === true) {
                const results = fixFromFile(fileName, ruleFileName);
                console.log(results);
                return 0;
            } else {
                const results = lintFromFile(fileName, ruleFileName);
                console.log(outputLintOuts(results));
                results_length += results.length;
            }
            return results_length === 0 ? 0 : 1;
        }
    }
};

function optionUsageTag({ short, name }: Option) {
    return short !== undefined ? `-${short}, --${name}` : `--${name}`;
}

function optionParam(option: Option) {
    switch (option.type) {
        case 'string':
            return ` [${option.name}]`;
        case 'array':
            return ` <${option.name}>`;
        case 'boolean':
            return '';
        default:
            return '';
    }
}

function collect(val: string, memo: string[]) {
    memo.push(val);

    return memo;
}

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
