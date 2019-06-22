
import commander = require("commander");
import {lintFromFile } from "./lint";

const parsed = commander.parseOptions(process.argv.slice(2));

let fileNames: string[];
fileNames = parsed.args;

if (parsed.args.length === 0) {
    // tslint:disable-next-line: no-console
    console.log("Usage: devreplay anyfile");
}

for (const fileName of fileNames) {
    lintFromFile(fileName).then((results) => {
        for (const result of results) {
            // tslint:disable-next-line: no-console
            console.log(`Path: ${result.fileName} Line: ${result.line} Pattern: ${result.pattern.code}`);
        }
    });
}
