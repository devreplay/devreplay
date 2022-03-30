/**
 * C++ rules
 */

import { rules as c } from './c';
import { BaseRule } from '../core/rule';

const cppRules: BaseRule[] = [
    {
        before: ['std::rand() % $1'],
        after: ['std::uniform_int_distribution<int> distribution(0, $1)'],
        message: 'Do not use std::rand() for generating pseudorandom numbers'
    },
    {
        before: ['std::time'],
        after: ['std::random_device']
    }
];

export const rules = cppRules.concat(c);
