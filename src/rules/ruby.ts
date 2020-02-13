module.exports = [
    {
      condition: [
        'fail '
      ],
      consequent: [
        'raise '
      ],
      description: 'Prefer raise over fail for exceptions. https://github.com/rubocop-hq/ruby-style-guide#prefer-raise-over-fail',
      severity: 'W'
    },
    {
      condition: [
        'raise RuntimeError,${1:message}'
      ],
      consequent: [
        'raise ${1:message}'
      ]
    },
    {
      condition: [
        'def ${1:some_method}',
        '    ${2:do_something}',
        'end'
      ],
      consequent: [
        'def ${1:some_method}',
        '  ${2:do_something}',
        'end'
      ]
    },
    {
      condition: [
        ';'
      ],
      consequent: [
        ''
      ],
      description: "Don’t use ; to terminate statements and expressions."
    },
    {
      condition: [
        ' ** '
      ],
      consequent: [
        '**'
      ]
    },
    {
      condition: [
        ' / '
      ],
      consequent: [
        '/'
      ],
      description: "Slash in rational literals"
    },
    {
      condition: [
        ' &. '
      ],
      consequent: [
        '&.'
      ],
      description: "Safe navigation operator"
    },
    {
      condition: [
        '${1:some}( ${2:arg} )'
      ],
      consequent: [
        '${1:some}(${2:arg})'
      ]
    },
    {
      condition: [
        '! '
      ],
      consequent: [
        '!'
      ],
      description: "No space after !"
    },
    {
      condition: [
        ' .. '
      ],
      consequent: [
        '..'
      ],
      description: "No space inside range literals."
    },
    {
      condition: [
        'def ${1:some_method}()'
      ],
      consequent: [
        'def ${1:some_method}'
      ]
    },
    {
      condition: [
        'for ${1:elem} in ${2:arr} do'
      ],
      consequent: [
        '${2:arr}.each { |${1:elem}|'
      ]
    },
    {
      condition: [
        ' then',
        ''
      ],
      consequent: [
        '',
        ''
      ]
    },
    {
      condition: [
        'not '
      ],
      consequent: [
        '!'
      ]
    },
    {
      condition: [
        '!!'
      ],
      consequent: [
        ''
      ]
    },
    {
      condition: [
        'and'
      ],
      consequent: [
        '&&'
      ]
    },
    {
      condition: [
        'or'
      ],
      consequent: [
        '||'
      ]
    },
    {
      condition: [
        'if !$1'
      ],
      consequent: [
        'unless $1'
      ]
    },
    {
      condition: [
        'raise RuntimeError, \'$1\''
      ],
      consequent: [
        'raise \'$1\''
      ]
    },
    {
      condition: [
        'raise ${1:SomeException}.new(\'$2\')'
      ],
      consequent: [
        'raise ${1:SomeException}, \'$2\''
      ]
    },
    {
      condition: [
        '= ->() {'
      ],
      consequent: [
        '= -> {'
      ],
      description: "Omit the parameter parentheses when defining a stabby lambda with no parameters"
    },
    {
      condition: [
        'Proc.new'
      ],
      consequent: [
        'proc'
      ]
    },
    {
      condition: [
        'super $1'
      ],
      consequent: [
        'super($1)'
      ]
    },
    {
      condition: [
        'count'
      ],
      consequent: [
        'size'
      ]
    },
    {
      condition: [
        'Array'
      ],
      consequent: [
        'Set'
      ]
    },
    {
      condition: [
        'while !'
      ],
      consequent: [
        'until'
      ]
    }
  ]