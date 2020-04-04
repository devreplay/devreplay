module.exports = [
    {
      condition: [
        '$3 = $1',
        '$1 = $2',
        '$2 = $3',
      ],
      consequent: [
        '$2, $1 = $1, $2',
      ],
      description: 'Value exchanging can be one line',
    },
    {
      condition: [
        'if len(${1:list}) == 0:',
      ],
      consequent: [
        'if not ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if len(${1:list}) != 0:',
      ],
      consequent: [
        'if ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if len(${1:list}) > 0:',
      ],
      consequent: [
        'if ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if not len(${1:list}):',
      ],
      consequent: [
        'if not ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if len(${1:list}):',
      ],
      consequent: [
        'if ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if ${1:val} is not None and not ${1:val}:',
      ],
      consequent: [
        'if ${1:val} == 0:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if ${1:value} % ${2:value}:',
      ],
      consequent: [
        'if ${1:value} % ${2:value} != 0:',
      ],
      description: 'When handling integers, implicit false may involve more risk than benefit',
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if not ${1:value} % ${2:value}:',
      ],
      consequent: [
        'if ${1:value} % ${2:value} == 0:',
      ],
      author: 'Google Python Style Guide',
      description: 'When handling integers, implicit false may involve more risk than benefit'
    },
    {
      condition: [
        'string.split(${1:value}, ${2:string})',
      ],
      consequent: [
        '${1:value}.split(${2:string})',
      ],
      author: 'Google Python Style Guide',
      description: 'Deprecated language feature',
    },
    {
      condition: [
        'apply(${1:fn}, ${2:args}, ${3:kwargs})',
      ],
      consequent: [
        '${1:fn}(*${2:args}, **${3:kwargs})',
      ],
      author: 'Google Python Style Guide',
      description: 'Deprecated language feature',
    },
    {
      condition: [
        'if ${1:value} == None:',
      ],
      consequent: [
        'if ${1:value} is None:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if ${1:value} != None:',
      ],
      consequent: [
        'if ${1:value} is not None:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      condition: [
        'if not ${1:value} == None:',
      ],
      consequent: [
        'if ${1:value} is not None:',
      ],
    },
    {
      condition: [
        'if not ${1:value} is None:',
      ],
      consequent: [
        'if ${1:value} is not None:',
      ],
    },
    {
      condition: [
        '',
        'import ${1:lib1}, ${2:lib2}',
      ],
      consequent: [
        '',
        'import ${1:lib1}',
        'import ${2:lib2}',
      ],
    },
    {
      condition: [
        '${1:value} * ${2:value2} -',
      ],
      consequent: [
        '${1:value}*${2:value2} -',
      ],
    },
    {
      condition: [
        '${1:value} * ${2:value2} +',
      ],
      consequent: [
        '${1:value}*${2:value2} +',
      ],
    },
    {
      condition: [
        '${1:func} = lambda ${2:value}: ${3:code}',
      ],
      consequent: [
        'def ${1:func}(${2:value}): return ${3:code}',
      ],
    },
    {
      condition: [
        'if ${1:exp} == True:',
      ],
      consequent: [
        'if ${1:exp}:',
      ],
    },
    {
      condition: [
        'if ${1:exp} is True:',
      ],
      consequent: [
        'if ${1:exp}:',
      ],
    },
    {
      condition: [
        'if ${1:exp} == False:',
      ],
      consequent: [
        'if not ${1:exp}:',
      ],
    },
    {
      condition: [
        'if ${1:exp} is False:',
      ],
      consequent: [
        'if not ${1:exp}:',
      ],
    },
    {
      condition: [
        '$1 ()',
      ],
      consequent: [
        '$1()',
      ],
    },
    {
      condition: [
        '$1[:$3] == \'$2\':',
      ],
      consequent: [
        '$1.startswith(\'$2\'):',
      ],
    },
    {
      condition: [
        '$1[:$3] == \"$2\":',
      ],
      consequent: [
        '$1.startswith(\"$2\"):',
      ],
    },
    {
      condition: [
        '$1[$3:] == \'$2\':',
      ],
      consequent: [
        '$1.endswith(\'$2\'):',
      ],
    },
    {
      condition: [
        '$1[$3:] == \"$2\":',
      ],
      consequent: [
        '$1.endswith(\"$2\"):',
      ],
    },
    {
      condition: [
        'type(${1:obj})) is type(${2:type}):',
      ],
      consequent: [
        'isinstance(${1:obj}, ${2:type}):',
      ],
    },
    {
      condition: [
        ';',
      ],
      consequent: [
        '',
        '',
      ],
    },
    {
      condition: [
        '[print($1) for $1 in $2]',
      ],
      consequent: [
        'for $1 in $2:',
        '    print($1)',
      ],
      description: 'Never use a list comprehension just for its side effects',
    },
    {
      condition: [
        '$1 = open(\'$2\')',
      ],
      consequent: [
        'with open(\'$2\') as $1:',
      ],
    },
    {
      condition: [
        'assert $1 >= $2',
        ''
      ],
      consequent: [
        'if minimum < $2:',
        '   raise ValueError()',
      ],
      author: 'Google Python Style Guide',
      description: 'Make use of built-in exception classes when it makes sense'
    },
    {
      condition: [
        'assert $1 >= $2, $3',
      ],
      consequent: [
        'if minimum < $2:',
        '   raise ValueError($3)',
      ],
      author: 'Google Python Style Guide',
      description: 'Make use of built-in exception classes when it makes sense'
    },
    {
      condition: [
        'except $1, $2:',
      ],
      consequent: [
        'except $1 as $2:',
      ],
      author: 'Google Python Style Guide',
      description: 'When capturing an exception, use as rather than a comma'
    },
    {
      condition: [
        'for $1 in $2.keys():',
      ],
      consequent: [
        'for $1 in $2:',
      ],
      author: 'Google Python Style Guide',
      description: 'Never use Python 2 specific iteration method'
    },
    {
      condition: [
        'if not $1.has_key($2):',
      ],
      consequent: [
        'if $2 not in $1',
      ],
      author: 'Google Python Style Guide',
      description: 'Never use Python 2 specific iteration method'
    },
    {
      condition: [
        'for $1 in $2.readlines():',
      ],
      consequent: [
        'for $1 in $2',
      ],
      author: 'Google Python Style Guide',
      description: 'Never use Python 2 specific iteration method'
    },
    {
      condition: [
        'for $1, $2 in $3.iteritems():',
      ],
      consequent: [
        'for $1, $2 in $3.items():',
      ],
      author: 'Google Python Style Guide',
      description: 'Never use Python 2 specific iteration method'
    },
    {
      condition: [
        'lambda $1, $2: $1 * $2',
      ],
      consequent: [
        'operator.mul($1, $2)',
      ],
      author: 'Google Python Style Guide',
      description: 'Use the functions from the operator module instead of lambda functions'
    },
    {
      condition: [
        '\'%s%s\' % ($1, $2)',
      ],
      consequent: [
        '$1 + $2',
      ],
      author: 'Google Python Style Guide',
      description: 'use + in this case'
    },
    {
      condition: [
        '\'{}{}\'.format($1, $2)',
      ],
      consequent: [
        '$1 + $2',
      ],
      author: 'Google Python Style Guide',
      description: 'use + in this case'
    },
    {
      condition: [
        ': Text',
      ],
      consequent: [
        ': str',
      ],
      author: 'Google Python Style Guide',
      description: 'For Python 3 only code, prefer to use str'
    },
    {
      condition: [
        'Text(',
      ],
      consequent: [
        'str(',
      ],
      author: 'Google Python Style Guide',
      description: 'For Python 3 only code, prefer to use str'
    }
  ];
