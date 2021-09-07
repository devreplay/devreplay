import { BaseRule } from '../core/rule';

export const rules: BaseRule[] = [
    {
      before: [
        'show\\((.+),\\s*(.+)\\)'
      ],
      after: [
        'show($2)'
      ],
      isRegex: true,
    },
    {
      before: [
        'editor.hide()'
      ],
      after: [
        'workbench.action.closeActiveEditor()'
      ]
    },
    {
      before: [
        'editor.show\\((.+)\\)'
      ],
      after: [
        'window.showTextDocument()'
      ],
      isRegex: true,
    },
    {
      before: [
        'MarkedString'
      ],
      after: [
        'MarkdownString'
      ]
    },
    {
      before: [
        'withScmProgress'
      ],
      after: [
        'withProgress'
      ]
    },
    {
      before: [
        'workspace.rootPath'
      ],
      after: [
        'workspace.workspaceFolders![0].uri.path'
      ]
    },
    {
      before: [
        'scm.inputBox'
      ],
      after: [
        'SourceControl.inputBox'
      ]
    }
  ];
