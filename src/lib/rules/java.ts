import { Rule } from '../rule-maker/rule';

export const rules: Rule[] = [
  {
    before: ['if (${1:val1} = ${2:val2})'],
    after: ['if (${1:val1} == ${2:val2})'],
    author: 'future-architect'
  },
  {
    before: ['XMLHTTPRequest'],
    after: ['XmlHttpRequest'],
    author: 'Google Java Style Guide'
  },
  {
    before: ['newCustomerID'],
    after: ['newCustomerId'],
    author: 'Google Java Style Guide'
  },
  {
    before: ['innerStopWatch'],
    after: ['innerStopwatch'],
    author: 'Google Java Style Guide'
  },
  {
    before: ['supportsIPv6OnIOS'],
    after: ['supportsIpv6OnIos'],
    author: 'Google Java Style Guide'
  },
  {
    before: ['$1 = $2 = $3'],
    after: [
      '$1 = $3',
      '$2 = $3'
    ],
    author: 'Oracle'
  },
  {
    before: ['if (${1:val1}++ = ${2:val2}++)'],
    after: ['if ((${1:val1}++ = ${2:val2}++) != 0)'],
    author: 'Oracle'
  },
  {
    before: ['$4 = ($1 = $2 + $3) + $5;'],
    after: [
      '$1 = $2 + $3',
      '$4 = $1 + $5'
    ],
    author: 'Oracle'
  },
  {
    before: ['$1 == $2 && $3 == $4'],
    after: ['($1 == $2) && ($3 == $4)'],
    author: 'Oracle'
  },
  {
    before: [
      'if (${1:booleanExpression}) {',
      '    return true;',
      '} else {',
      '    return false;',
      '}'],
    after: ['return ${1:booleanExpression}'],
    author: 'Oracle'
  },
  {
    before: [
      'if (${1:before}) {',
      '    return ${2:x};',
      '} else {',
      '    return ${3:y};',
      '}'],
    after: ['return (${1:before} ? ${2:x} : ${3:y})'],
    author: 'Oracle'
  },
  {
    before: [
      'if (${1:before}) {',
      '    return ${2:x};',
      '}',
      'return ${3:y};'],
    after: ['return (${1:before} ? ${2:x} : ${3:y})'],
    author: 'Oracle'
  },
  {
    before: ['$1 ++'],
    after: ['$1++'],
    author: 'future-architect'
  },
  {
    before: ['if (${1:before})'],
    after: ['if (${1:before} == true)'],
    author: 'future-architect'
  },
  {
    before: ['${1:scope} ${2:type} ${3:val1}, ${4:val2};'],
    after: [
      '${1:scope} ${2:type} ${3:val1};',
      '${1:scope} ${2:type} ${3:val2};'],
      author: 'future-architect'
  },
  {
    before: ['${1:type} ${2:val}[] ='],
    after: ['${1:type}[] ${2:val} ='],
    author: 'future-architect'
  },
  {
    before: ['final List<${1:type}> ${2:values} = Arrays.asList'],
    after: ['final List<${1:type}> ${2:values} = List.of'],
    author: 'future-architect'
  },
  {
    before: ['new String();'],
    after: ['"";'],
    author: 'future-architect'
  },
  {
    before: ['new StringBuilder($1).append($2).toString()'],
    after: ['$1 + $2'],
    author: 'future-architect'
  },
  {
    before: [
      'org.xml.sax.AttributeList'
    ],
    after: [
      'org.xml.sax.Attributes'
    ],
    message: 'org.xml.sax.AttributeList is deprecated',
    severity: 'E'
  },
  {
    before: [
      'org.xml.sax.DocumentHandler'
    ],
    after: [
      'org.xml.sax.ContentHandler'
    ]
  },
  {
    before: [
      'org.omg.CORBA.DynAny'
    ],
    after: [
      'org.omg.DynamicAny.DynAny'
    ]
  },
  {
    before: [
      'org.omg.CORBA.DynArray'
    ],
    after: [
      'org.omg.DynamicAny.DynArray'
    ]
  },
  {
    before: [
      'org.omg.CORBA.DynEnum'
    ],
    after: [
      'org.omg.DynamicAny.DynEnum'
    ]
  },
  {
    before: [
      'java.awt.Frame.CROSSHAIR_CURSOR'
    ],
    after: [
      'Cursor.CROSSHAIR_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.DEFAULT_CURSOR'
    ],
    after: [
      'Cursor.DEFAULT_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.E_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.E_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.HAND_CURSOR'
    ],
    after: [
      'Cursor.HAND_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.MOVE_CURSOR'
    ],
    after: [
      'Cursor.MOVE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.N_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.N_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.NE_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.NE_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.NW_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.NW_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.S_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.S_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.SE_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.SE_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.SW_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.SW_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.TEXT_CURSOR'
    ],
    after: [
      'Cursor.TEXT_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.W_RESIZE_CURSOR'
    ],
    after: [
      'Cursor.W_RESIZE_CURSOR'
    ]
  },
  {
    before: [
      'java.awt.Frame.WAIT_CURSOR'
    ],
    after: [
      'Cursor.WAIT_CURSOR'
    ]
  }
];
