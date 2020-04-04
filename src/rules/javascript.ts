module.exports = [
    {
      condition: [
        'OutgoingMessage.prototype.flush'
      ],
      consequent: [
        'OutgoingMessage.prototype.flushHeaders'
      ],
      description: 'Prefer self[:attribute] = value over write_attribute(:attribute, value)',
      severity: 'I'
    },
    {
      condition: [
        '_writableState.buffer'
      ],
      consequent: [
        '_writableState.getBuffer()'
      ]
    },
    {
      condition: [
        'require(\'constants\')'
      ],
      consequent: [
        'require(\'fs\').constants'
      ]
    },
    {
      condition: [
        'crypto.createCredentials'
      ],
      consequent: [
        'tls.createSecureContext'
      ]
    },
    {
      condition: [
        'Server.connections'
      ],
      consequent: [
        'Server.getConnections()'
      ]
    },
    {
      condition: [
        'Server.listenFD()'
      ],
      consequent: [
        'Server.listen({fd: <number>})'
      ]
    },
    {
      condition: [
        'tmpDir()'
      ],
      consequent: [
        'tmpdir()'
      ]
    },
    {
      condition: [
        'getNetworkInterfaces()'
      ],
      consequent: [
        'networkInterfaces()'
      ]
    },
    {
      condition: [
        'SlowBuffer'
      ],
      consequent: [
        'Buffer.allocUnsafeSlow(size)'
      ]
    },
    {
      condition: [
        'EventEmitter.listenerCount(emitter, ${1:eventName})'
      ],
      consequent: [
        'emitter.listenerCount(${1:eventName})'
      ]
    },
    {
      condition: [
        'export default'
      ],
      consequent: [
        'export'
      ]
    },
    {
      condition: [
        'for (let $3 = 0;i < $1.length;i++) $2($1[$3])'
      ],
      consequent: [
        'for (let $3 = 0;i < $1.length;i++) {',
        '    $2($1[$3])',
        '}'
      ]
    },
    {
      condition: [
        'const $1 = new Array()'
      ],
      consequent: [
        'const $1 = []'
      ]
    },
    {
      condition: [
        '$1.hasOwnProperty(\'$2\')'
      ],
      consequent: [
        '$1.$2 != null'
      ]
    },
    {
      condition: [
        'new Boolean($1)'
      ],
      consequent: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      condition: [
        'new Number($1)'
      ],
      consequent: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      condition: [
        'new String($1)'
      ],
      consequent: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      condition: [
        'new Symbol($1)'
      ],
      consequent: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      condition: [
        'new $1;'
      ],
      consequent: [
        'new $1();'
      ],
      description: 'Never invoke a constructor in a new statement without using parentheses'
    },
    {
      condition: [
        '@code'
      ],
      consequent: [
        ''
      ]
    },
    {
      condition: [
        '@expose'
      ],
      consequent: [
        '@export'
      ]
    },
    {
      condition: [
        '@inheritDoc'
      ],
      consequent: [
        '@override'
      ]
    }
  ];
