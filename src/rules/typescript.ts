module.exports = [
    {
      condition: [
        'const $1: number = $2;'
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
    }
]