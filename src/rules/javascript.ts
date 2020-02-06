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
    }
  ]