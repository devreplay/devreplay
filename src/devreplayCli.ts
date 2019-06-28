
import commander = require("commander");
import {lintFromFile } from "./lint";
import {formatIlintOut} from "./lintout";

const parsed = commander.parseOptions(process.argv.slice(2));

if (parsed.args.length === 0) {
    // tslint:disable-next-line: no-console
    console.log("Usage: devreplay checkfile (ruleFile)");
}

const fileName = parsed.args[0];
let ruleFileName: string | undefined;

if (parsed.args.length >= 2) {
    ruleFileName = parsed.args[2];
}

lintFromFile(fileName, ruleFileName).then((results) => {
    for (const result of results) {
        // tslint:disable-next-line: no-console
        console.log(formatIlintOut(result));
    }
});
