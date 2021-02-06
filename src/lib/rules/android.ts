import { Rule } from '../rule-maker/rule';

export const rules: Rule[] = [
    {
      before: [
        'if ((.+))',
        '  (.+)()'
      ],
      after: [
        'if ($1) $2()'
      ],
      isRegex: true,
      message: 'Use standard brace style (https://source.android.com/setup/contribute/code-style#use-standard-brace-style)'
    },
    {
      before: [
        'XMLHTTPRequest'
      ],
      after: [
        'XmlHttpRequest'
      ]
    },
    {
      before: [
        'getCustomerID'
      ],
      after: [
        'getCustomerId'
      ]
    },
    {
      before: [
        'class HTML'
      ],
      after: [
        'class Html'
      ]
    },
    {
      before: [
        'String URL'
      ],
      after: [
        'String url'
      ]
    },
    {
      before: [
        'long ID'
      ],
      after: [
        'long id'
      ]
    },
    {
      before: [
        'System.out.println()'
      ],
      after: [
        ''
      ],
      message: 'System.out and System.err get redirected to /dev/null'
    },
    {
      before: [
        'catch (Exception e)'
      ],
      after: [
        'catch (XXXXException e)'
      ],
      message: 'Don\'t catch generic exception'
    },
    {
      before: [
        'Exception e) { }'
      ],
      after: [
        'Exception e) {',
        '',
        '}'
      ],
      message: 'Don\'t ignore exceptions'
    }
  ];