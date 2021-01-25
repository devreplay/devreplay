import { Rule } from '../rule-maker/rule';

export const rules: Rule[] = [
    {
      before: [
        'read_attribute(:${1:attribute})'
      ],
      after: [
        'self[:${1:attribute}]'
      ]
    },
    {
      before: [
        'write_attribute(:${1:attribute}, ${2:value})'
      ],
      after: [
        'self[:${1:attribute}] = ${2:value}'
      ],
      message: 'Prefer self[:attribute] = value over write_attribute(:attribute, value)',
      severity: 'W'
    },
    {
      before: [
        'validates_presence_of :${1:attribute}'
      ],
      after: [
        'validates :${1:attribute}, presence: true'
      ]
    },
    {
      before: [
        '.where(${1:id}: ${1:id}).take'
      ],
      after: [
        '.find(${1:id})'
      ]
    },
    {
      before: [
        '.where(${1:firstname}: ${2:firstvalue}, ${3:lastname}: ${4:lastvalue}).first'
      ],
      after: [
        '.find_by(${1:firstname}: ${2:firstvalue}, ${3:lastname}: ${4:lastvalue}))'
      ]
    },
    {
      before: [
        'Time.parse'
      ],
      after: [
        'Time.zone.parse'
      ]
    },
    {
      before: [
        'Time.now'
      ],
      after: [
        'Time.zone.now'
      ]
    },
    {
      before: [
        '.where("${1:id}: != ?", ${1:id}:)'
      ],
      after: [
        '.where.not(${1:id}: ${1:id}:)'
      ]
    },
    {
      before: [
        'rmagick'
      ],
      after: [
        'minimagick'
      ]
    },
    {
      before: [
        'autotest'
      ],
      after: [
        'guard'
      ]
    },
    {
      before: [
        'rcov'
      ],
      after: [
        'SimpleCov'
      ]
    }
  ];
