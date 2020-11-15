import { Pattern } from '../patterns';

export const patterns: Pattern[] = [
    {
      before: [
        'OutgoingMessage.prototype.flush'
      ],
      after: [
        'OutgoingMessage.prototype.flushHeaders'
      ],
      message: 'Prefer self[:attribute] = value over write_attribute(:attribute, value)',
      severity: 'I'
    },
    {
      before: [
        '_writableState.buffer'
      ],
      after: [
        '_writableState.getBuffer()'
      ]
    },
    {
      before: [
        'require(\'constants\')'
      ],
      after: [
        'require(\'fs\').constants'
      ]
    },
    {
      before: [
        'crypto.createCredentials'
      ],
      after: [
        'tls.createSecureContext'
      ]
    },
    {
      before: [
        'Server.connections'
      ],
      after: [
        'Server.getConnections()'
      ]
    },
    {
      before: [
        'Server.listenFD()'
      ],
      after: [
        'Server.listen({fd: <number>})'
      ]
    },
    {
      before: [
        'tmpDir()'
      ],
      after: [
        'tmpdir()'
      ]
    },
    {
      before: [
        'getNetworkInterfaces()'
      ],
      after: [
        'networkInterfaces()'
      ]
    },
    {
      before: [
        'SlowBuffer'
      ],
      after: [
        'Buffer.allocUnsafeSlow(size)'
      ]
    },
    {
      before: [
        'EventEmitter.listenerCount(emitter, ${1:eventName})'
      ],
      after: [
        'emitter.listenerCount(${1:eventName})'
      ]
    },
    {
      before: [
        'export default'
      ],
      after: [
        'export'
      ]
    },
    {
      before: [
        'for (let $3 = 0;i < $1.length;i++) $2($1[$3])'
      ],
      after: [
        'for (let $3 = 0;i < $1.length;i++) {',
        '    $2($1[$3])',
        '}'
      ]
    },
    {
      before: [
        'const $1 = new Array()'
      ],
      after: [
        'const $1 = []'
      ]
    },
    {
      before: [
        '$1.hasOwnProperty(\'$2\')'
      ],
      after: [
        '$1.$2 != null'
      ]
    },
    {
      before: [
        'new Boolean($1)'
      ],
      after: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      before: [
        'new Number($1)'
      ],
      after: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      before: [
        'new String($1)'
      ],
      after: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      before: [
        'new Symbol($1)'
      ],
      after: [
        '$1'
      ],
      severity: 'Information'
    },
    {
      before: [
        'new $1;'
      ],
      after: [
        'new $1();'
      ],
      message: 'Never invoke a constructor in a new statement without using parentheses'
    },
    {
      before: [
        '@code'
      ],
      after: [
        ''
      ]
    },
    {
      before: [
        '@expose'
      ],
      after: [
        '@export'
      ]
    },
    {
      before: [
        '@inheritDoc'
      ],
      after: [
        '@override'
      ]
    }
  ];
