import { BaseRule } from '../core/rule';

export const rules: BaseRule[] = [
    {
      before: [
        '(?<tmp>.+)\\s*=\\s*(?<a>.+)',
        '\\k<a>\\s*=\\s*(?<b>.+)',
        '\\k<b>\\s*=\\s*\\k<tmp>',
      ],
      after: [
        '$2, $3 = $3, $2',
      ],
      isRegex: true,
      message: 'Value exchanging can be one line',
    },
    {
      before: [
        'if len\\((.+)\\) == 0:',
      ],
      after: [
        'if not $1:',
      ],
      message: 'if len() == 0: can be if not',
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if len\\((.+)\\) != 0:',
      ],
      after: [
        'if $1:',
      ],
      message: 'if len() != 0: can be if',
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if len\\((.+)\\) > 0:',
      ],
      after: [
        'if $1:',
      ],
      message: 'if len() > 0: can be if',
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if not len\\((.+)\\):',
      ],
      after: [
        'if not $1:',
      ],
      message: 'if not len(): can be if not',
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if len\\((\\S+)\\):',
      ],
      after: [
        'if ${1:list}:',
      ],
      message: 'if len(): can be if list',
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if (?<val>.+) is not None and not \\k<val>:',
      ],
      after: [
        'if $1 == 0:',
      ],
      isRegex: true,
      message: 'if not None and not: can be if == 0',
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if (\\S+) % (\\S+):',
      ],
      after: [
        'if $1 % $2 != 0:',
      ],
      isRegex: true,
      message: 'When handling integers, implicit false may involve more risk than benefit',
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if not (\\S+) % (\\S+):',
      ],
      after: [
        'if $1 % $2 == 0:',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'When handling integers, implicit false may involve more risk than benefit'
    },
    {
      before: [
        'string.split\\((.+), (.+)\\)',
      ],
      after: [
        '$1.split($2)',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'Deprecated language feature',
      deprecated: true,
    },
    {
      before: [
        'apply(${1:fn}, ${2:args}, ${3:kwargs})',
      ],
      after: [
        '${1:fn}(*${2:args}, **${3:kwargs})',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'Deprecated language feature',
      deprecated: true,
    },
    {
      before: [
        'if (\\S+) == None:',
      ],
      after: [
        'if $1 is None:',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if (\\S+) != None:',
      ],
      after: [
        'if $1 is not None:',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
    },
    {
      before: [
        'if not (\\S+) == None:',
      ],
      after: [
        'if $1 is not None:',
      ],
      isRegex: true
    },
    {
      before: [
        'if not (.+) is None:',
      ],
      after: [
        'if $1 is not None:',
      ],
      isRegex: true,
    },
    {
      before: [
        '',
        'import (.+), (.+)',
      ],
      after: [
        '',
        'import $1',
        'import $2',
      ],
      isRegex: true
    },
    {
      before: [
        '(.+) * (.+) [-\\+]',
      ],
      after: [
        '$1*$2 -',
      ],
      isRegex: true,
    },
    {
      before: [
        '(.+) = lambda (.+): (.+)',
      ],
      after: [
        'def $1($2): return $3',
      ],
    },
    {
      before: [
        'if (.+) (==|is) True:',
      ],
      after: [
        'if $1:',
      ],
      isRegex: true,
    },
    {
      before: [
        'if (.+) (==|is) False:',
      ],
      after: [
        'if not $1:',
      ],
      isRegex: true,
    },
    {
      before: [
        '(.+) \\(\\)',
      ],
      after: [
        '$1()',
      ],
      isRegex: true,
    },
    {
      before: [
        '(.+)[:(.+)] == (.+):',
      ],
      after: [
        '$1.startswith($3):',
      ],
      isRegex: true,
      message: 'startswith() can be used instead of ==',
    },
    {
      before: [
        '(.+)[(.+):] == (.+):',
      ],
      after: [
        '$1.endswith($3):',
      ],
      isRegex: true,
      message: 'endswith() can be used instead of ==',
    },
    {
      before: [
        'type((.+)) is type((.+)):',
      ],
      after: [
        'isinstance($1, $2):',
      ],
      isRegex: true,
      message: 'isinstance() can be used instead of type()',
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
        '\\[print((.+)) for (.+) in (.+)\\]',
      ],
      after: [
        'for $2 in $3:',
        '    print($1)',
      ],
      isRegex: true,
      message: 'Never use a list comprehension just for its side effects',
    },
    {
      before: [
        '(.+) = open((.+))',
      ],
      after: [
        'with open($2) as $1:',
      ],
      isRegex: true
    },
    {
      before: [
        'assert (.+) >= (.+)',
        ''
      ],
      after: [
        'if minimum < $2:',
        '   raise ValueError()',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'Make use of built-in exception classes when it makes sense'
    },
    {
      before: [
        'assert (.+) >= (.+), (.+)',
      ],
      after: [
        'if minimum < $2:',
        '   raise ValueError($3)',
      ],
      isRegex: true,
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
        'for (.+) in (.+).keys():',
      ],
      after: [
        'for $1 in $2:',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'if not (.+).has_key((.+)):',
      ],
      after: [
        'if $2 not in $1',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'for (.+) in (.+).readlines():',
      ],
      after: [
        'for $1 in $2',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'Never use Python 2 specific iteration method'
    },
    {
      before: [
        'for (.+), (.+) in (.+).iteritems():',
      ],
      after: [
        'for $1, $2 in $3.items():',
      ],
      isRegex: true,
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
        '\'%s%s\' % ((.+), (.+))',
      ],
      after: [
        '$1 + $2',
      ],
      isRegex: true,
      author: 'Google Python Style Guide',
      message: 'use + in this case'
    },
    {
      before: [
        '\'{}{}\'.format((.+), (.+))',
      ],
      after: [
        '$1 + $2',
      ],
      isRegex: true,
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
