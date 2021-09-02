import { BaseRule } from '../core/rule';

export const rules: BaseRule[] = [
    {
      before: [
        'show(${1:column}, ${2:preservalFocus})'
      ],
      after: [
        'show(${2:preservalFocus})'
      ]
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
        'editor.show(${1:column})'
      ],
      after: [
        'window.showTextDocument()'
      ]
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
