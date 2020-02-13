const javascript = require("./javascript");

module.exports = [
    {
      condition: [
        'const $1: $3 = $2;'
      ],
      consequent: [
        'const $1 = $2;'
      ]
    },
    {
      condition: [
        'isInstanceOf<${1:MyType}>'
      ],
      consequent: [
        'isA<${1:MyType}>'
      ]
    },
    {
      condition: [
        'throws'
      ],
      consequent: [
        'throwsA'
      ]
    },
    {
      condition: [
        'null'
      ],
      consequent: [
        'undefined'
      ]
    },
    {
      condition: [
        '$1.forEach($2 => {'
      ],
      consequent: [
        'for (const $2 in $1) {'
      ]
    }
].concat(javascript)