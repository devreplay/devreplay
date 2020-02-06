module.exports = [
    {
      condition: [
        '',
        'fail '
      ],
      consequent: [
        '',
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
      ]
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
        'def ${1:some_method}()'
      ],
      consequent: [
        'def ${1:some_method}'
      ]
    },
    {
      condition: [
        ' then'
      ],
      consequent: [
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
    }
  ]