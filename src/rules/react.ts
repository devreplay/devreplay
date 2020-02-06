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
    }
  ]