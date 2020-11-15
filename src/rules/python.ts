import { Pattern } from '../patterns';

export const patterns: Pattern[] = [
    {
      before: [
        '$3 = $1',
        '$1 = $2',
        '$2 = $3',
      ],
      after: [
        '$2, $1 = $1, $2',
      ],
      message: 'Value exchanging can be one line',
    },
    {
      before: [
        'if len(${1:list}) == 0:',
      ],
      after: [
        'if not ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if len(${1:list}) != 0:',
      ],
      after: [
        'if ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if len(${1:list}) > 0:',
      ],
      after: [
        'if ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if not len(${1:list}):',
      ],
      after: [
        'if not ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if len(${1:list}):',
      ],
      after: [
        'if ${1:list}:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if ${1:val} is not None and not ${1:val}:',
      ],
      after: [
        'if ${1:val} == 0:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if ${1:value} % ${2:value}:',
      ],
      after: [
        'if ${1:value} % ${2:value} != 0:',
      ],
      message: 'When handling integers, implicit false may involve more risk than benefit',
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if not ${1:value} % ${2:value}:',
      ],
      after: [
        'if ${1:value} % ${2:value} == 0:',
      ],
      author: 'Google Python Style Guide',
      message: 'When handling integers, implicit false may involve more risk than benefit'
    },
    {
      before: [
        'string.split(${1:value}, ${2:string})',
      ],
      after: [
        '${1:value}.split(${2:string})',
      ],
      author: 'Google Python Style Guide',
      message: 'Deprecated language feature',
    },
    {
      before: [
        'apply(${1:fn}, ${2:args}, ${3:kwargs})',
      ],
      after: [
        '${1:fn}(*${2:args}, **${3:kwargs})',
      ],
      author: 'Google Python Style Guide',
      message: 'Deprecated language feature',
    },
    {
      before: [
        'if ${1:value} == None:',
      ],
      after: [
        'if ${1:value} is None:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if ${1:value} != None:',
      ],
      after: [
        'if ${1:value} is not None:',
      ],
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if not ${1:value} == None:',
      ],
      after: [
        'if ${1:value} is not None:',
      ],
    },
    {
      before: [
        'if not ${1:value} is None:',
      ],
      after: [
        'if ${1:value} is not None:',
      ],
    },
    {
      before: [
        '',
        'import ${1:lib1}, ${2:lib2}',
      ],
      after: [
        '',
        'import ${1:lib1}',
        'import ${2:lib2}',
      ],
    },
    {
      before: [
        '${1:value} * ${2:value2} -',
      ],
      after: [
        '${1:value}*${2:value2} -',
      ],
    },
    {
      before: [
        '${1:value} * ${2:value2} +',
      ],
      after: [
        '${1:value}*${2:value2} +',
      ],
    },
    {
      before: [
        '${1:func} = lambda ${2:value}: ${3:code}',
      ],
      after: [
        'def ${1:func}(${2:value}): return ${3:code}',
      ],
    },
    {
      before: [
        'if ${1:exp} == True:',
      ],
      after: [
        'if ${1:exp}:',
      ],
    },
    {
      before: [
        'if ${1:exp} is True:',
      ],
      after: [
        'if ${1:exp}:',
      ],
    },
    {
      before: [
        'if ${1:exp} == False:',
      ],
      after: [
        'if not ${1:exp}:',
      ],
    },
    {
      before: [
        'if ${1:exp} is False:',
      ],
      after: [
        'if not ${1:exp}:',
      ],
    },
    {
      before: [
        '$1 ()',
      ],
      after: [
        '$1()',
      ],
    },
    {
      before: [
        '$1[:$3] == \'$2\':',
      ],
      after: [
        '$1.startswith(\'$2\'):',
      ],
    },
    {
      before: [
        '$1[:$3] == "$2":',
      ],
      after: [
        '$1.startswith("$2"):',
      ],
    },
    {
      before: [
        '$1[$3:] == \'$2\':',
      ],
      after: [
        '$1.endswith(\'$2\'):',
      ],
    },
    {
      before: [
        '$1[$3:] == "$2":',
      ],
      after: [
        '$1.endswith("$2"):',
      ],
    },
    {
      before: [
        'type(${1:obj})) is type(${2:type}):',
      ],
      after: [
        'isinstance(${1:obj}, ${2:type}):',
      ],
    },
    {
      before: [
        ';',
      ],
      after: [
        '',
        '',
      ],
    },
    {
      before: [
        '[print($1) for $1 in $2]',
      ],
      after: [
        'for $1 in $2:',
        '    print($1)',
      ],
      message: 'Never use a list comprehension just for its side effects',
    },
    {
      before: [
        '$1 = open(\'$2\')',
      ],
      after: [
        'with open(\'$2\') as $1:',
      ],
    },
    {
      before: [
        'assert $1 >= $2',
        ''
      ],
      after: [
        'if minimum < $2:',
        '   raise ValueError()',
      ],
      author: 'Google Python Style Guide',
      message: 'Make use of built-in exception classes when it makes sense'
    },
    {
      before: [
        'assert $1 >= $2, $3',
      ],
      after: [
        'if minimum < $2:',
        '   raise ValueError($3)',
      ],
      author: 'Google Python Style Guide',
      message: 'Make use of built-in exception classes when it makes sense'
    },
    {
      before: [
        'except $1, $2:',
      ],
      after: [
        'except $1 as $2:',
      ],
      author: 'Google Python Style Guide',
      message: 'When capturing an exception, use as rather than a comma'
    },
    {
      before: [
        'for $1 in $2.keys():',
      ],
      after: [
        'for $1 in $2:',
      ],
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'if not $1.has_key($2):',
      ],
      after: [
        'if $2 not in $1',
      ],
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'for $1 in $2.readlines():',
      ],
      after: [
        'for $1 in $2',
      ],
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'for $1, $2 in $3.iteritems():',
      ],
      after: [
        'for $1, $2 in $3.items():',
      ],
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'lambda $1, $2: $1 * $2',
      ],
      after: [
        'operator.mul($1, $2)',
      ],
      author: 'Google Python Style Guide',
      message: 'Use the functions from the operator module instead of lambda functions'
    },
    {
      before: [
        '\'%s%s\' % ($1, $2)',
      ],
      after: [
        '$1 + $2',
      ],
      author: 'Google Python Style Guide',
      message: 'use + in this case'
    },
    {
      before: [
        '\'{}{}\'.format($1, $2)',
      ],
      after: [
        '$1 + $2',
      ],
      author: 'Google Python Style Guide',
      message: 'use + in this case'
    },
    {
      before: [
        ': Text',
      ],
      after: [
        ': str',
      ],
      author: 'Google Python Style Guide',
      message: 'For Python 3 only code, prefer to use str'
    },
    {
      before: [
        'Text(',
      ],
      after: [
        'str(',
      ],
      author: 'Google Python Style Guide',
      message: 'For Python 3 only code, prefer to use str'
    }
  ];
