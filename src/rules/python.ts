module.exports = [
    {
      condition: [
        "$3 = $1",
        "$1 = $2",
        "$2 = $3"
      ],
      consequent: [
        "$2, $1 = $1, $2"
      ],
      description: "Value exchanging can be one line"
    },
    {
      condition: [
        'if ${1:value} % ${2:value} != 0:'
      ],
      consequent: [
        'if ${1:value} % ${2:value}:'
      ],
      description: 'It can not cover when value is null',
      severity: 'I',
      author: 'Google Guideline'
    },
    {
      condition: [
        'if ${1:value} % ${2:value} == 0:'
      ],
      consequent: [
        'if not ${1:value} % ${2:value}:'
      ]
    },
    {
      condition: [
        'string.split(${1:value}, ${2:string})'
      ],
      consequent: [
        '${1:value}.split(${2:string})'
      ],
      message: "Deprecated language feature"
    },
    {
      condition: [
        'apply(${1:fn}, ${2:args}, ${3:kwargs})'
      ],
      consequent: [
        '${1:fn}(*${2:args}, **${3:kwargs})'
      ],
      message: "Deprecated language feature"
    },
    {
      condition: [
        'if len(${1:list}) != 0:'
      ],
      consequent: [
        'if ${1:list}:'
      ]
    },
    {
      condition: [
        'if len(${1:list}) > 0:'
      ],
      consequent: [
        'if ${1:list}:'
      ]
    },
    {
      condition: [
        'if len(${1:list}) == 0:'
      ],
      consequent: [
        'if not ${1:list}:'
      ]
    },
    {
      condition: [
        'if not len(${1:list}):'
      ],
      consequent: [
        'if not ${1:list}:'
      ]
    },
    {
      condition: [
        'if len(${1:list}):'
      ],
      consequent: [
        'if ${1:list}:'
      ]
    },
    {
      condition: [
        'if not ${1:value} is None:'
      ],
      consequent: [
        'if ${1:value} is not None:'
      ]
    },
    {
      condition: [
        'import ${1:lib1}, ${2:lib2}'
      ],
      consequent: [
        'import ${1:lib1}',
        'import ${1:lib2}'
      ]
    },
    {
      condition: [
        '${1:value} * ${2:value2} -'
      ],
      consequent: [
        '${1:value}*${2:value2} -'
      ]
    },
    {
      condition: [
        '${1:value} * ${2:value2} +'
      ],
      consequent: [
        '${1:value}*${2:value2} +'
      ]
    },
    {
      condition: [
        '${1:func} = lambda ${2:value}: ${3:code}'
      ],
      consequent: [
        'def ${1:func}(${2:value}): return ${3:code}'
      ]
    },
    {
      condition: [
        'if ${1:exp} == True:'
      ],
      consequent: [
        'if ${1:exp}:'
      ]
    },
    {
      condition: [
        'if ${1:exp} is True:'
      ],
      consequent: [
        'if ${1:exp}:'
      ]
    },
    {
      condition: [
        'if ${1:exp} == False:'
      ],
      consequent: [
        'if not ${1:exp}:'
      ]
    },
    {
      condition: [
        'if ${1:exp} is False:'
      ],
      consequent: [
        'if not ${1:exp}:'
      ]
    },
    {
      condition: [
        '$1 ()'
      ],
      consequent: [
        '$1()'
      ]
    },
    {
      condition: [
        '$1 ['
      ],
      consequent: [
        '$1['
      ]
    },
    {
      condition: [
        '$1[:$3] == \'$2\':'
      ],
      consequent: [
        '$1.startswith(\'$2\'):'
      ]
    },
    {
      condition: [
        '$1[:$3] == \"$2\":'
      ],
      consequent: [
        '$1.startswith(\"$2\"):'
      ]
    },
    {
      condition: [
        '$1[$3:] == \'$2\':'
      ],
      consequent: [
        '$1.endswith(\'$2\'):'
      ]
    },
    {
      condition: [
        '$1[$3:] == \"$2\":'
      ],
      consequent: [
        '$1.endswith(\"$2\"):'
      ]
    },
    {
      condition: [
        'type(${1:obj})) is type(${2:type}):'
      ],
      consequent: [
        'isinstance(${1:obj}, ${2:type}):'
      ]
    },
    {
      condition: [
        ';'
      ],
      consequent: [
        '',
        ''
      ]
    },
    {
      condition: [
        '[$3($1) for $1 in $2]'
      ],
      consequent: [
        'for $1 in $2:',
        '    $3($1)'
      ],
      description: 'Never use a list comprehension just for its side effects'
    },
    {
      condition: [
        '$1 = open(\'$2\')'
      ],
      consequent: [
        'with open(\'$2\') as $1:'
      ]
    },
  ]