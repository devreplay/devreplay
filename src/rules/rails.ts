module.exports = [
    {
      condition: [
        'read_attribute(:${1:attribute})'
      ],
      consequent: [
        'self[:${1:attribute}]'
      ]
    },
    {
      condition: [
        'write_attribute(:${1:attribute}, ${2:value})'
      ],
      consequent: [
        'self[:${1:attribute}] = ${2:value}'
      ],
      description: 'Prefer self[:attribute] = value over write_attribute(:attribute, value)',
      severity: 'W'
    },
    {
      condition: [
        'validates_presence_of :${1:attribute}'
      ],
      consequent: [
        'validates :${1:attribute}, presence: true'
      ]
    },
    {
      condition: [
        '.where(${1:id}: ${1:id}).take'
      ],
      consequent: [
        '.find(${1:id})'
      ]
    },
    {
      condition: [
        '.where(${1:firstname}: ${2:firstvalue}, ${3:lastname}: ${4:lastvalue}).first'
      ],
      consequent: [
        '.find_by(${1:firstname}: ${2:firstvalue}, ${3:lastname}: ${4:lastvalue}))'
      ]
    },
    {
      condition: [
        'Time.parse'
      ],
      consequent: [
        'Time.zone.parse'
      ]
    },
    {
      condition: [
        'Time.now'
      ],
      consequent: [
        'Time.zone.now'
      ]
    },
    {
      condition: [
        '.where("${1:id}: != ?", ${1:id}:)'
      ],
      consequent: [
        '.where.not(${1:id}: ${1:id}:)'
      ]
    },
    {
      condition: [
        'rmagick'
      ],
      consequent: [
        'minimagick'
      ]
    },
    {
      condition: [
        'autotest'
      ],
      consequent: [
        'guard'
      ]
    },
    {
      condition: [
        'rcov'
      ],
      consequent: [
        'SimpleCov'
      ]
    }
  ]