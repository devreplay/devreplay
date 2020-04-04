const c = require('./c');
module.exports = [
    {
        conditon: ['std::rand() % $1'],
        consequent: ['std::uniform_int_distribution<int> distribution(0, $1)'],
        description: 'Do not use std::rand() for generating pseudorandom numbers'
    },
    {
        conditon: ['std::time'],
        consequent: ['std::random_device']
    }
].concat(c);
