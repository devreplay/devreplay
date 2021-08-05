import { Rule } from '../rule';

export const rules: Rule[] = [
    {
      before: [
        'expires'
      ],
      after: [
        'message'
      ]
    },
    {
      before: [
        'isInstanceOf<${1:MyType}>'
      ],
      after: [
        'isA<${1:MyType}>'
      ]
    },
    {
      before: [
        'throws'
      ],
      after: [
        'throwsA'
      ]
    }
];