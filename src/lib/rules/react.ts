import { BaseRule } from '../rule';

export const rules: BaseRule[] = [
  {
    before: [
      'React.render(<MyComponent />, root)'
    ],
    after: [
      'ReactDOM.render(<MyComponent />, root)'
    ]
  },
  {
    before: [
      'React.findDOMNode(this.refs.foo)'
    ],
    after: [
      'ReactDOM.findDOMNode(this.refs.foo)'
    ]
  },
  {
    before: [
      'import React, { PropTypes } from \'react\';'
    ],
    after: [
      'import { React } from \'react\';',
      'import { PropTypes } from \'prop-types\';'
    ]
  },
  {
    before: [
      'componentWillMount()'
    ],
    after: [
      'UNSAFE_componentWillMount()'
    ]
  },
  {
    before: [
      'componentWillReceiveProps()'
    ],
    after: [
      'UNSAFE_componentWillReceiveProps()'
    ]
  },
  {
    before: [
      'componentWillUpdate()'
    ],
    after: [
      'UNSAFE_componentWillUpdate()'
    ]
  },
  {
    before: [
      'var $1 = React.createClass({});'
    ],
    after: [
      'var $1 = React.createClass({',
      '  displayName: "$1"',
      '});'
    ],
    message: '@babel/plugin-transform-react-display-name',
  },
  {
    before: [
      'var $1 = createReactClass({});'
    ],
    after: [
      'var $1 = createReactClass({',
      '  displayName: "$1"',
      '});'
    ],
    message: '@babel/plugin-transform-react-display-name'
  },
  {
    before: [
      'const Hr = () => {',
      '  return <hr className="hr" />;',
      '};'
    ],
    after: [
      'const _ref = <hr className="hr" />;',
      'const Hr = () => {',
      '  return <hr className="hr" />;',
      '};'
    ]
  }
];
