module.exports = [
    {
        condition: ['elseif'],
        consequent: ['else if'],
        description: 'All control keywords look like single words',
        author: 'WordPress Coding Standards Docs'
    },
    {
        condition: ['preg_replace($1/e'],
        consequent: ['preg_replace_callback($1'],
        description: 'Perl compatible regular expressions (PCRE, preg_ functions) should be used in preference to their POSIX counterparts',
    },
    {
        condition: ['<?= \$$1 ?>'],
        consequent: ['<?php echo "\$$1"; ?>'],
        description: 'Never use shorthand PHP start tags. Always use full PHP tags',
    }
];
