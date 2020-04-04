module.exports = [
    {
        condition: ['asctime'],
        consequent: ['asctime_s']
    },
    {
        condition: ['atof'],
        consequent: ['strtod']
    },
    {
        condition: ['atoi'],
        consequent: ['strtol']
    },
    {
        condition: ['atol'],
        consequent: ['strtol']
    },
    {
        condition: ['atoll'],
        consequent: ['strtoll']
    },
    {
        condition: ['ctime'],
        consequent: ['ctime_s']
    },
    {
        condition: ['fopen'],
        consequent: ['fopen_s']
    },
    {
        condition: ['freopen'],
        consequent: ['freopen_s']
    },
    {
        condition: ['rewind'],
        consequent: ['fseek']
    },
    {
        condition: ['setbuf'],
        consequent: ['setvbuf']
    },
    {
        condition: ['for ($1 = $2; $1 != $3; $1 += $4)'],
        consequent: ['for ($1 = $2; $1 <= $3; $1 += $4)']
    },
    {
        condition: ['for ($1 = $2; $1 != $3; $1++)'],
        consequent: ['for ($1 = $2; $1 <= $3; $1++)']
    },
    {
        condition: ['for ($1 = $2; $1 != $3; ++$1)'],
        consequent: ['for ($1 = $2; $1 < $3; ++$1)']
    },
    {
        condition: ['<= SIZE_MAX; $2 += $1)'],
        consequent: ['<= INT_MAX - $1; $2 += $1)']
    },
    {
        condition: ['<= SIZE_MAX; $1++)'],
        consequent: ['<= INT_MAX - 1; $1++)']
    },
    {
        condition: ['int $1 = open($2, O_RDWR);'],
        consequent: ['int $1 = open($2, O_RDWR | O_NOFOLLOW);']
    },
    {
        condition: ['assert(NULL != dup);'],
        consequent: [
            'if (NULL == dup) {',
            '    return NULLl',
            '}'
        ]
    }
];
