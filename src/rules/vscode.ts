module.exports = [
    {
      condition: [
        'show(${1:column}, ${2:preservalFocus})'
      ],
      consequent: [
        'show(${2:preservalFocus})'
      ]
    },
    {
      condition: [
        'editor.hide()'
      ],
      consequent: [
        'workbench.action.closeActiveEditor()'
      ]
    },
    {
      condition: [
        'editor.show(${1:column})'
      ],
      consequent: [
        'window.showTextDocument()'
      ]
    },
    {
      condition: [
        'MarkedString'
      ],
      consequent: [
        'MarkdownString'
      ]
    },
    {
      condition: [
        'withScmProgress'
      ],
      consequent: [
        'withProgress'
      ]
    },
    {
      condition: [
        'workspace.rootPath'
      ],
      consequent: [
        'workspace.workspaceFolders![0].uri.path'
      ]
    },
    {
      condition: [
        'scm.inputBox'
      ],
      consequent: [
        'SourceControl.inputBox'
      ]
    }
  ]