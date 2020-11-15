import { Pattern } from '../patterns';

export const patterns: Pattern[] = [
    {
        before: ['asctime'],
        after: ['asctime_s']
    },
    {
        before: ['atof'],
        after: ['strtod']
    },
    {
        before: ['atoi'],
        after: ['strtol']
    },
    {
        before: ['atol'],
        after: ['strtol']
    },
    {
        before: ['atoll'],
        after: ['strtoll']
    },
    {
        before: ['ctime'],
        after: ['ctime_s']
    },
    {
        before: ['fopen'],
        after: ['fopen_s']
    },
    {
        before: ['freopen'],
        after: ['freopen_s']
    },
    {
        before: ['rewind'],
        after: ['fseek']
    },
    {
        before: ['setbuf'],
        after: ['setvbuf']
    },
    {
        before: ['for ($1 = $2; $1 != $3; $1 += $4)'],
        after: ['for ($1 = $2; $1 <= $3; $1 += $4)']
    },
    {
        before: ['for ($1 = $2; $1 != $3; $1++)'],
        after: ['for ($1 = $2; $1 <= $3; $1++)']
    },
    {
        before: ['for ($1 = $2; $1 != $3; ++$1)'],
        after: ['for ($1 = $2; $1 < $3; ++$1)']
    },
    {
        before: ['<= SIZE_MAX; $2 += $1)'],
        after: ['<= INT_MAX - $1; $2 += $1)']
    },
    {
        before: ['<= SIZE_MAX; $1++)'],
        after: ['<= INT_MAX - 1; $1++)']
    },
    {
        before: ['int $1 = open($2, O_RDWR);'],
        after: ['int $1 = open($2, O_RDWR | O_NOFOLLOW);']
    },
    {
        before: ['assert(NULL != dup);'],
        after: [
            'if (NULL == dup) {',
            '    return NULLl',
            '}'
        ]
    }
];
