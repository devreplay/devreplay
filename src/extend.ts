const android = require("./rules/android");
const angular = require("./rules/angular");
const dart = require("./rules/dart");
const java = require("./rules/java");
const javascript = require("./rules/javascript");
const python = require("./rules/python");
const rails = require("./rules/rails");
const react = require("./rules/react");
const ruby = require("./rules/ruby");
const vscode = require("./rules/vscode");
const vue = require("./rules/vue");

import { IPattern } from "./patterns";

interface IExtend {
    [key: string]: IPattern[];
}

export const extend: IExtend = {
    android: android,
    angular: angular,
    dart: dart,
    java: java,
    javascript: javascript,
    python: python,
    rails: rails,
    react: react,
    ruby: ruby,
    vscode: vscode,
    vue: vue
};
