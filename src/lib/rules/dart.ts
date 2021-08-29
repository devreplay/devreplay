import { BaseRule } from '../rule';

export const rules: BaseRule[] = [
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