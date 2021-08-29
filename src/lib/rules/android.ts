import { BaseRule } from '../rule';

export const rules: BaseRule[] = [
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
      ],
      matchCase: true
    },
    {
      before: [
        'getCustomerID'
      ],
      after: [
        'getCustomerId'
      ],
      matchCase: true
    },
    {
      before: [
        'class HTML'
      ],
      after: [
        'class Html'
      ],
      matchCase: true
    },
    {
      before: [
        'String URL'
      ],
      after: [
        'String url'
      ],
      matchCase: true
    },
    {
      before: [
        'long ID'
      ],
      after: [
        'long id'
      ],
      matchCase: true
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