module.exports = [
    {
        condition: ['NOT < '],
        consequent: ['>= ']
    },
    {
        condition: ['NOT > '],
        consequent: ['<= ']
    },
    {
        condition: ['NOT <='],
        consequent: ['>']
    },
    {
        condition: ['NOT >='],
        consequent: ['<']
    }
]