import { BaseRule } from '../rule';

export const rules: BaseRule[] = [
    {
        before: ['NOT < '],
        after: ['>= ']
    },
    {
        before: ['NOT > '],
        after: ['<= ']
    },
    {
        before: ['NOT <='],
        after: ['>']
    },
    {
        before: ['NOT >='],
        after: ['<']
    }
];
