
/* tslint:disable no-console object-literal-sort-keys */

import commander = require("commander");
import { formatILintOut, ILintOut, lintAndFix, lintFromFile } from "./lint";
import { arrayify } from "./utils";

interface IArgv {
    fix?: boolean;
    init?: boolean;
    out?: string;
}

interface IOption {
    short?: string;
    // Commander will camelCase option names.
    name: keyof IArgv | "fix" | "init";
    type: "string" | "boolean" | "array";
    describe: string; // Short, used for usage message
    description: string; // Long, used for `--help`
}

const options: IOption[] = [
    {
        name: "fix",
        type: "boolean",
        describe: "fix the file",
        description: "fix the file",
    },
];

for (const option of options) {
    const commanderStr = optionUsageTag(option) + optionParam(option);
    if (option.type === "array") {
        commander.option(commanderStr, option.describe, collect, []);
    } else {
        commander.option(commanderStr, option.describe);
    }
}

// Hack to get unknown option errors to work. https://github.com/visionmedia/commander.js/pull/121
const parsed = commander.parseOptions(process.argv.slice(2));
commander.args = parsed.args;
if (parsed.unknown.length !== 0) {
    (commander.parseArgs as (args: string[], unknown: string[]) => void)([], parsed.unknown);
}
const argv = (commander.opts() as any) as IArgv;

if (
    !(
        argv.init ||
        commander.args.length > 0
    )
) {
    console.error("No files specified. Use --project to lint a project folder.");
    process.exit(1);
}

const files = arrayify(commander.args);
const fileName = files[0];
let ruleFileName: string | undefined;

if (files.length >= 2) {
    ruleFileName = files[1];
}

if (argv.fix) {
    lintAndFix(fileName, ruleFileName).then((results: string) => {
        console.log(results);
    });
} else {
    lintFromFile(fileName, ruleFileName).then((results: ILintOut[]) => {
        for (const result of results) {
            console.log(formatILintOut(result));
        }
    });
}

function optionUsageTag({ short, name }: IOption) {
    return short !== undefined ? `-${short}, --${name}` : `--${name}`;
}

function optionParam(option: IOption) {
    switch (option.type) {
        case "string":
            return ` [${option.name}]`;
        case "array":
            return ` <${option.name}>`;
        case "boolean":
            return "";
    }
}

function collect(val: string, memo: string[]) {
    memo.push(val);
    return memo;
}
