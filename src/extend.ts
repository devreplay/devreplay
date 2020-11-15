/* eslint-disable @typescript-eslint/no-var-requires */
import { Pattern } from './patterns';

const android = require('./rules/android');
const angular = require('./rules/angular');
const c = require('./rules/c');
const chainer2pytouch = require('./rules/chainer2pytouch');
const cpp = require('./rules/cpp');
const cobol = require('./rules/cobol');
const dart = require('./rules/dart');
const java = require('./rules/java');
const javascript = require('./rules/javascript');
const php = require('./rules/php');
const python = require('./rules/python');
const rails = require('./rules/rails');
const react = require('./rules/react');
const ruby = require('./rules/ruby');
const typescript = require('./rules/typescript');
const tensorflow = require('./rules/tensorflow');
const vscode = require('./rules/vscode');
const vue = require('./rules/vue');

interface Extends {
    [key: string]: Pattern[];
}

export const extend: Extends = {
    android,
    angular,
    c,
    chainer2pytouch,
    cobol,
    cpp,
    dart,
    java,
    javascript,
    php,
    python,
    rails,
    react,
    ruby,
    tensorflow,
    typescript,
    vscode,
    vue,
};

interface Source {
    [key: string]: string[];
}

export const sources: Source = {
    c: ['.c'],
    cobol: ['.cbl', '.cblsrce', '.ocb', '.ocb'],
    cpp: ['.cpp'],
    dart: ['.dart'],
    vue: ['.vue'],
    java: ['.java', '.jav'],
    javascript : ['.js', '.es6', '.mjs', '.pac'],
    php : ['.php'],
    python: ['.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi', '.snakefile', '.smk'],
    ruby: [ '.rb', '.rbx', '.rjs', '.gemspec', '.rake', '.ru', '.erb' ],
    typescript: ['.ts'],
};

export function getInitPattern(fileName: string): Pattern[] {
    for (const key of Object.keys(sources)) {
        if (sources[key].some((x) => fileName.endsWith(x))) {
            return extend[key];
        }
    }

    return [];
}
