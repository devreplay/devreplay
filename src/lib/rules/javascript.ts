import { Rule } from '../rule-maker/rule';

export const rules: Rule[] = [  
  {
    before: 'OutgoingMessage.prototype.flush',
    after: 'OutgoingMessage.prototype.flushHeaders',
    message: 'Prefer self[:attribute] = value over write_attribute(:attribute, value)',
    severity: 'I',
    matchCase: true
  },
  {
    before:' writableState.buffer',
    after: '_writableState.getBuffer()',
    matchCase: true
  },
  {
    before:'require(\'constants\')',
    after: 'require(\'fs\').constants',
    matchCase: true
  },
  {
    before:'crypto.createCredentials',
    after: 'tls.createSecureContext',
    matchCase: true
  },
  {
    before:'Server.connections',
    after: 'Server.getConnections()',
    matchCase: true
  },
  {
    before:'Server.listenFD()',
    after: 'Server.listen({fd: <number>})',
    matchCase: true
  },
  {
    before:'tmpDir()',
    after: 'tmpdir()',
    matchCase: true
  },
  {
    before:'getNetworkInterfaces()',
    after: 'networkInterfaces()',
    matchCase: true
  },
  {
    before:'SlowBuffer',
    after: 'Buffer.allocUnsafeSlow(size)',
    matchCase: true
  },
  {
    before:'EventEmitter.listenerCount(emitter, ${1:eventName})',
    after: 'emitter.listenerCount(${1:eventName})',
    matchCase: true
  },
  {
    before:'export default',
    after: 'export',
    matchCase: true
  },
  {
    before: 'for \\(let (?<i>.+) = 0;\\k<i> < (?<arr>.+).length;\\k<i>\\+\\+\\) (.*)\\(\\k<arr>\\[\\k<i>\\]\\)',
    after: [
      'for (let $1 = 0;$1 < $2.length;i++) {',
      '    $3($2[$1])',
      '}'
    ],
    isRegex: true,
    message: 'One line for should use paren'
  },
  {
    before:'const $1 = new Array()',
    after: 'const $1 = []',
    matchCase: true
  },
  {
    before:'$1.hasOwnProperty(\'$2\')',
    after: '$1.$2 != null',
    matchCase: true
  },
  {
    before:'new Boolean($1)',
    after: '$1',
    severity: 'Information',
    matchCase: true
  },
  {
    before:'new Number($1)',
    after: '$1',
    severity: 'Information',
    matchCase: true
  },
  {
    before:'new String($1)',
    after: '$1',
    severity: 'Information',
    matchCase: true
  },
  {
    before:'new Symbol($1)',
    after: '$1',
    severity: 'Information',
    matchCase: true
  },
  {
    before: 'new \\(.*\\);',
    after: 'new $1();',
    isRegex: true,
    message: 'Never invoke a constructor in a new statement without using parentheses'
  },
  {
    before:'@code',
    after:   '',
    matchCase: true
  },
  {
    before:'@expose',
    after: '@export',
    matchCase: true
  },
  {
    before:'@inheritDoc',
    after: '@override',
    matchCase: true
  }
];
