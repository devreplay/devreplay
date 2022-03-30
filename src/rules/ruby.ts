/**
 * Ruby specific rules
 */

import { BaseRule } from '../core/rule';

export const rules: BaseRule[] = [
    {
      before: 'fail ',
      after: 'raise ',
      message: 'Prefer raise over fail for exceptions. https://github.com/rubocop-hq/ruby-style-guide#prefer-raise-over-fail',
    },
    {
      before: 'raise RuntimeError,(\\S+)',
      after: 'raise $1',
      isRegex: true
    },
    {
      before: ';',
      after: '',
      message: 'Don’t use ; to terminate statements and expressions.'
    },
    {
      before: [
        ' ** '
      ],
      after: [
        '**'
      ]
    },
    {
      before: [
        ' / '
      ],
      after: [
        '/'
      ],
      message: 'Slash in rational literals'
    },
    {
      before: [
        ' &. '
      ],
      after: [
        '&.'
      ],
      message: 'Safe navigation operator'
    },
    {
      before: [
        '(\\S+)\\( (\\S+) \\)'
      ],
      after: [
        '$1($2)'
      ],
      isRegex: true,
    },
    {
      before: [
        '! '
      ],
      after: [
        '!'
      ],
      message: 'No space after !'
    },
    {
      before: [
        ' .. '
      ],
      after: [
        '..'
      ],
      message: 'No space inside range literals.'
    },
    {
      before: [
        'def (\\S+)\\(\\)'
      ],
      after: [
        'def $1'
      ],
      isRegex: true,

    },
    {
      before: [
        'for (\\S+) in (\\S+) do'
      ],
      after: [
        '$2.each { |$1|'
      ],
      isRegex: true,
      message: 'Use block form for iterating'
    },
    {
      before: [
        ' then',
        ''
      ],
      after: [
        '',
        ''
      ]
    },
    {
      before: [
        'not '
      ],
      after: [
        '!'
      ]
    },
    {
      before: [
        '!!'
      ],
      after: [
        ''
      ]
    },
    {
      before: [
        'and'
      ],
      after: [
        '&&'
      ]
    },
    {
      before: [
        'or'
      ],
      after: [
        '||'
      ]
    },
    {
      before: [
        'if !(\\S+)'
      ],
      after: [
        'unless $1'
      ],
      isRegex: true,
      message: 'Use unless instead of if !'
    },
    {
      before: [
        'raise RuntimeError, \'(\\S+)\''
      ],
      after: [
        'raise \'$1\''
      ],
      isRegex: true,
    },
    {
      before: [
        'raise (\\S+).new(\'(\\S+)\')'
      ],
      after: [
        'raise $1, \'$2\''
      ],
      isRegex: true,
    },
    {
      before: [
        '= ->() {'
      ],
      after: [
        '= -> {'
      ],
      message: 'Omit the parameter parentheses when defining a stabby lambda with no parameters'
    },
    {
      before: [
        'Proc.new'
      ],
      after: [
        'proc'
      ]
    },
    {
      before: [
        'super (\\S+)'
      ],
      after: [
        'super($1)'
      ],
      isRegex: true,
    },
    {
      before: [
        'count'
      ],
      after: [
        'size'
      ]
    },
    {
      before: [
        'Array'
      ],
      after: [
        'Set'
      ]
    },
    {
      before: [
        'while !'
      ],
      after: [
        'until'
      ]
    }
  ];
