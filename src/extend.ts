const android = require("./rules/android");
const angular = require("./rules/angular");
const c = require("./rules/c");
const cpp = require("./rules/cpp");
const dart = require("./rules/dart");
const java = require("./rules/java");
const javascript = require("./rules/javascript");
const python = require("./rules/python");
const rails = require("./rules/rails");
const react = require("./rules/react");
const ruby = require("./rules/ruby");
const typescript = require("./rules/typescript");
const vscode = require("./rules/vscode");
const vue = require("./rules/vue");

import { IPattern } from "./patterns";

interface IExtend {
    [key: string]: IPattern[];
}

export const extend: IExtend = {
    android: android,
    angular: angular,
    c: c,
    cpp: cpp,
    dart: dart,
    java: java,
    javascript: javascript,
    python: python,
    rails: rails,
    react: react,
    ruby: ruby,
    typescript: typescript,
    vscode: vscode,
    vue: vue
};

interface ISource {
    [key: string]: string[];
}

export const sources: ISource = {
    c: [".c"],
    cpp: [".cpp"],
    dart: [".dart"],
    vue: [".vue"],
    java: [".java", ".jav"],
    javascript : [".js", ".es6", ".mjs", ".pac"],
    python: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi", ".snakefile", ".smk"],
    ruby: [ ".rb", ".rbx", ".rjs", ".gemspec", ".rake", ".ru", ".erb" ],
    typescript: [".ts"]
};

export function getInitPattern(fileName: string) {
    for (const key of Object.keys(sources)) {
        if (sources[key].some((x) => fileName.endsWith(x))) {
            return extend[key];
        }
    }

    return [];
}