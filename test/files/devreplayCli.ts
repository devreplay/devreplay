
import commander = require("commander");

const parsed = commander.parseOptions(process.argv.slice(2));

if (parsed.args.length == 0) {
    // tslint:disable-next-line: no-console
    console.log("Usage: devreplay checkfile (ruleFile)");
}

const fileName = parsed.args[0];
let ruleFileName: string | undefined;

if (parsed.args.length >= 2) {
    ruleFileName = parsed.args[2];
}
