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
        'if len(${1:list}s) == 0:'
      ],
      consequent: [
        'if not ${1:list}s:'
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
    }
  ]