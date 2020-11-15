/* eslint-disable @typescript-eslint/no-var-requires */
import { Pattern } from './patterns';

import { patterns as android } from './rules/android'
import { patterns as angular } from './rules/angular'
import { patterns as c } from './rules/c'
import { patterns as chainer2pytouch } from './rules/chainer2pytouch'
import { patterns as cpp } from './rules/cpp'
import { patterns as cobol } from './rules/cobol'
import { patterns as dart } from './rules/dart'
import { patterns as java } from './rules/java'
import { patterns as javascript } from './rules/javascript'
import { patterns as php } from './rules/php'
import { patterns as python } from './rules/python'
import { patterns as rails } from './rules/rails'
import { patterns as react } from './rules/react'
import { patterns as ruby } from './rules/ruby'
import { patterns as typescript } from './rules/typescript'
import { patterns as tensorflow } from './rules/tensorflow'
import { patterns as vscode } from './rules/vscode'
import { patterns as vue } from './rules/vue'

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
