module.exports = [
  {
    condition: ['if (${1:val1} = ${2:val2})'],
    consequent: ['if (${1:val1} == ${2:val2})'],
    author: "future-architect"
  },
  {
    condition: ['XMLHTTPRequest'],
    consequent: ['XmlHttpRequest'],
    author: "Google Java Style Guide"
  },
  {
    condition: ['newCustomerID'],
    consequent: ['newCustomerId'],
    author: "Google Java Style Guide"
  },
  {
    condition: ['innerStopWatch'],
    consequent: ['innerStopwatch'],
    author: "Google Java Style Guide"
  },
  {
    condition: ['supportsIPv6OnIOS'],
    consequent: ['supportsIpv6OnIos'],
    author: "Google Java Style Guide"
  },
  {
    condition: ['$1 = $2 = $3'],
    consequent: [
      '$1 = $3',
      '$2 = $3'
    ],
    author: "Oracle"
  },
  {
    condition: ['if (${1:val1}++ = ${2:val2}++)'],
    consequent: ['if ((${1:val1}++ = ${2:val2}++) != 0)'],
    author: "Oracle"
  },
  {
    condition: ['$4 = ($1 = $2 + $3) + $5;'],
    consequent: [
      '$1 = $2 + $3',
      '$4 = $1 + $5'
    ],
    author: "Oracle"
  },
  {
    condition: ['$1 == $2 && $3 == $4'],
    consequent: ['($1 == $2) && ($3 == $4)'],
    author: "Oracle"
  },
  {
    condition: [
      'if (${1:booleanExpression}) {',
      '    return true;',
      '} else {',
      '    return false;',
      '}'],
    consequent: ['return ${1:booleanExpression}'],
    author: "Oracle"
  },
  {
    condition: [
      'if (${1:condition}) {',
      '    return ${2:x};',
      '} else {',
      '    return ${3:y};',
      '}'],
    consequent: ['return (${1:condition} ? ${2:x} : ${3:y})'],
    author: "Oracle"
  },
  {
    condition: [
      'if (${1:condition}) {',
      '    return ${2:x};',
      '}',
      'return ${3:y};'],
    consequent: ['return (${1:condition} ? ${2:x} : ${3:y})'],
    author: "Oracle"
  },
  {
    condition: ['$1 ++'],
    consequent: ['$1++'],
    author: "future-architect"
  },
  {
    condition: ['if (${1:condition})'],
    consequent: ['if (${1:condition} == true)'],
    author: "future-architect"
  },
  {
    condition: ['${1:scope} ${2:type} ${3:val1}, ${4:val2};'],
    consequent: [
      '${1:scope} ${2:type} ${3:val1};',
      '${1:scope} ${2:type} ${3:val2};'],
      author: "future-architect"
  },
  {
    condition: ['${1:type} ${2:val}[] ='],
    consequent: ['${1:type}[] ${2:val} ='],
    author: "future-architect"
  },
  {
    condition: ['final List<${1:type}> ${2:values} = Arrays.asList'],
    consequent: ['final List<${1:type}> ${2:values} = List.of'],
    author: "future-architect"
  },
  {
    condition: ['new String();'],
    consequent: ['"";'],
    author: "future-architect"
  },
  {
    condition: ['new StringBuilder($1).append($2).toString()'],
    consequent: ['$1 + $2'],
    author: "future-architect"
  },
  {
    condition: [
      'org.xml.sax.AttributeList'
    ],
    consequent: [
      'org.xml.sax.Attributes'
    ],
    description: 'org.xml.sax.AttributeList is deprecated',
    severity: 'E'
  },
  {
    condition: [
      'org.xml.sax.DocumentHandler'
    ],
    consequent: [
      'org.xml.sax.ContentHandler'
    ]
  },
  {
    condition: [
      'org.omg.CORBA.DynAny'
    ],
    consequent: [
      'org.omg.DynamicAny.DynAny'
    ]
  },
  {
    condition: [
      'org.omg.CORBA.DynArray'
    ],
    consequent: [
      'org.omg.DynamicAny.DynArray'
    ]
  },
  {
    condition: [
      'org.omg.CORBA.DynEnum'
    ],
    consequent: [
      'org.omg.DynamicAny.DynEnum'
    ]
  },
  {
    condition: [
      'java.awt.Frame.CROSSHAIR_CURSOR'
    ],
    consequent: [
      'Cursor.CROSSHAIR_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.DEFAULT_CURSOR'
    ],
    consequent: [
      'Cursor.DEFAULT_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.E_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.E_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.HAND_CURSOR'
    ],
    consequent: [
      'Cursor.HAND_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.MOVE_CURSOR'
    ],
    consequent: [
      'Cursor.MOVE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.N_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.N_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.NE_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.NE_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.NW_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.NW_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.S_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.S_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.SE_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.SE_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.SW_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.SW_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.TEXT_CURSOR'
    ],
    consequent: [
      'Cursor.TEXT_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.W_RESIZE_CURSOR'
    ],
    consequent: [
      'Cursor.W_RESIZE_CURSOR'
    ]
  },
  {
    condition: [
      'java.awt.Frame.WAIT_CURSOR'
    ],
    consequent: [
      'Cursor.WAIT_CURSOR'
    ]
  }
]