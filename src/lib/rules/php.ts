import { Rule } from '../rule';

export const rules: Rule[] = [
    {
        before: ['elseif'],
        after: ['else if'],
        message: 'All control keywords look like single words',
        author: 'WordPress Coding Standards Docs'
    },
    {
        before: ['preg_replace($1/e'],
        after: ['preg_replace_callback($1'],
        message: 'Perl compatible regular expressions (PCRE, preg_ functions) should be used in preference to their POSIX counterparts',
    },
    {
        before: ['<?= $1 ?>'],
        after: ['<?php echo "$1"; ?>'],
        message: 'Never use shorthand PHP start tags. Always use full PHP tags',
    }
];
