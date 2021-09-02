import { BaseRule } from '../core/rule';

export const rules: BaseRule[] = [
    {
      before: [
        'fail '
      ],
      after: [
        'raise '
      ],
      message: 'Prefer raise over fail for exceptions. https://github.com/rubocop-hq/ruby-style-guide#prefer-raise-over-fail',
      severity: 'W'
    },
    {
      before: [
        'raise RuntimeError,${1:message}'
      ],
      after: [
        'raise ${1:message}'
      ]
    },
    {
      before: [
        'def ${1:some_method}',
        '    ${2:do_something}',
        'end'
      ],
      after: [
        'def ${1:some_method}',
        '  ${2:do_something}',
        'end'
      ]
    },
    {
      before: [
        ';'
      ],
      after: [
        ''
      ],
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
        '${1:some}( ${2:arg} )'
      ],
      after: [
        '${1:some}(${2:arg})'
      ]
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
        'def ${1:some_method}()'
      ],
      after: [
        'def ${1:some_method}'
      ]
    },
    {
      before: [
        'for ${1:elem} in ${2:arr} do'
      ],
      after: [
        '${2:arr}.each { |${1:elem}|'
      ]
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
        'if !$1'
      ],
      after: [
        'unless $1'
      ]
    },
    {
      before: [
        'raise RuntimeError, \'$1\''
      ],
      after: [
        'raise \'$1\''
      ]
    },
    {
      before: [
        'raise ${1:SomeException}.new(\'$2\')'
      ],
      after: [
        'raise ${1:SomeException}, \'$2\''
      ]
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
        'super $1'
      ],
      after: [
        'super($1)'
      ]
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
