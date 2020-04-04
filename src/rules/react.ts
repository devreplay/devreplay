module.exports = [
  {
    condition: [
      'React.render(<MyComponent />, root)'
    ],
    consequent: [
      'ReactDOM.render(<MyComponent />, root)'
    ]
  },
  {
    condition: [
      'React.findDOMNode(this.refs.foo)'
    ],
    consequent: [
      'ReactDOM.findDOMNode(this.refs.foo)'
    ]
  },
  {
    condition: [
      'import React, { PropTypes } from \'react\';'
    ],
    consequent: [
      'import { React } from \'react\';',
      'import { PropTypes } from \'prop-types\';'
    ]
  },
  {
    condition: [
      'componentWillMount()'
    ],
    consequent: [
      'UNSAFE_componentWillMount()'
    ]
  },
  {
    condition: [
      'componentWillReceiveProps()'
    ],
    consequent: [
      'UNSAFE_componentWillReceiveProps()'
    ]
  },
  {
    condition: [
      'componentWillUpdate()'
    ],
    consequent: [
      'UNSAFE_componentWillUpdate()'
    ]
  },
  {
    condition: [
      'var $1 = React.createClass({});'
    ],
    consequent: [
      'var $1 = React.createClass({',
      '  displayName: "$1"',
      '});'
    ],
    description: '@babel/plugin-transform-react-display-name',
  },
  {
    condition: [
      'var $1 = createReactClass({});'
    ],
    consequent: [
      'var $1 = createReactClass({',
      '  displayName: "$1"',
      '});'
    ],
    description: '@babel/plugin-transform-react-display-name'
  },
  {
    condition: [
      'const Hr = () => {',
      '  return <hr className="hr" />;',
      '};'
    ],
    consequent: [
      'const _ref = <hr className="hr" />;',
      'const Hr = () => {',
      '  return <hr className="hr" />;',
      '};'
    ]
  }
];
