import { Pattern } from '../patterns';

export const patterns: Pattern[] = [
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