/* eslint-disable @typescript-eslint/no-var-requires */
import { Rule } from './rule';

import { rules as android } from './rules/android';
import { rules as angular } from './rules/angular';
import { rules as c } from './rules/c';
import { rules as chainer2pytouch } from './rules/chainer2pytouch';
import { rules as cpp } from './rules/cpp';
import { rules as cobol } from './rules/cobol';
import { rules as dart } from './rules/dart';
import { rules as java } from './rules/java';
import { rules as javascript } from './rules/javascript';
import { rules as php } from './rules/php';
import { rules as python } from './rules/python';
import { rules as rails } from './rules/rails';
import { rules as react } from './rules/react';
import { rules as ruby } from './rules/ruby';
import { rules as typescript } from './rules/typescript';
import { rules as tensorflow } from './rules/tensorflow';
import { rules as vscode } from './rules/vscode';
import { rules as vue } from './rules/vue';

interface Extends {
    [key: string]: Rule[];
}

/**
 * List of rule extends
 */
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

/**
 * Imitate matched rules from file extension
 * @param fileName Validate target file
 */
export function getInitRules(fileName: string): Rule[] {
    for (const key of Object.keys(sources)) {
        if (sources[key].some((x) => fileName.endsWith(x))) {
            return extend[key];
        }
    }

    return [];
}
