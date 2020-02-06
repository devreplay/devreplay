module.exports = [
    {
      condition: [
        'if (${1:condition})',
        '  ${1:func}()'
      ],
      consequent: [
        'if (${1:condition}) ${1:func}()'
      ],
      description: 'Use standard brace style (https://source.android.com/setup/contribute/code-style#use-standard-brace-style)'
    },
    {
      condition: [
        'XMLHTTPRequest'
      ],
      consequent: [
        'XmlHttpRequest'
      ]
    },
    {
      condition: [
        'getCustomerID'
      ],
      consequent: [
        'getCustomerId'
      ]
    },
    {
      condition: [
        'class HTML'
      ],
      consequent: [
        'class Html'
      ]
    },
    {
      condition: [
        'String URL'
      ],
      consequent: [
        'String url'
      ]
    },
    {
      condition: [
        'long ID'
      ],
      consequent: [
        'long id'
      ]
    },
    {
      condition: [
        'System.out.println()'
      ],
      consequent: [
        ''
      ],
      description: 'System.out and System.err get redirected to /dev/null'
    },
    {
      condition: [
        'catch (Exception e)'
      ],
      consequent: [
        'catch (XXXXException e)'
      ],
      description: 'Don\'t catch generic exception'
    },
    {
      condition: [
        'Exception e) { }'
      ],
      consequent: [
        'Exception e) {',
        '',
        '}'
      ],
      description: 'Don\'t ignore exceptions'
    }
  ]