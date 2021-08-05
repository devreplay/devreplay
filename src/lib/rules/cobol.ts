import { Rule } from '../rule';

export const rules: Rule[] = [
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
