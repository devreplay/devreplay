const javascript = require('./javascript');

module.exports = [
  {
    condition: [
      'interface I$1'
    ],
    consequent: [
      'interface $1'
    ],
    description: 'Don\'t prefix with I',
    author: 'basarat/typescript-book'
  },
  {
    condition: [
      'return null'
    ],
    consequent: [
      'return undefined'
    ],
    description: 'Use null where its a part of the API or conventional',
    author: 'basarat/typescript-book'
  },
  {
    condition: [
      'cb(undefined)'
    ],
    consequent: [
      'cb(null)'
    ],
    description: 'Use truthy check for objects being null or undefined',
    author: 'basarat/typescript-book'
  },
  {
    condition: [
      '$1 === null'
    ],
    consequent: [
      '$1'
    ],
    author: 'basarat/typescript-book'
  },
  {
    condition: [
      'error !== null'
    ],
    consequent: [
      'error != null'
    ],
    author: 'basarat/typescript-book'
  }
].concat(javascript);
