import { Rule } from '../rule-maker/rule';

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
