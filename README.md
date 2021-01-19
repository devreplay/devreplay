![CI](https://github.com/devreplay/devreplay/workflows/CI/badge.svg)

# Devreplay

Devreplay is static analysis tool based on your own programming rule.

* [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.devreplay)
* [Other Editor Support (Language Server)](https://www.npmjs.com/package/devreplay-server)
* [GitHub Application](https://github.com/marketplace/dev-replay)
* [Pattern generator](https://github.com/devreplay/devreplay-pattern-generator)

## How to use

1. Install on local

```sh
$ npm install devreplay
# or
$ yarn global add 
```

2. Put your own programming rule(`devreplay.json`) on the project like bellow

```json
[
  {
    "before": [
      "tmp = $1",
      "$1 = $2",
      "$2 = tmp"
    ],
    "after": [
      "$1, $2 = $2, $1"
    ]
  }
]
```

3. Run the devreplay

```sh
$ devreplay yourfile.py
W:yourfile.py:15:$3 = $1$1 = $2$2 = $3 should be $2, $1 = $1, $2
```
or get fixed code
```sh
$ devreplay --fix yourfile.py
```

The target source code file will be
```diff
- tmp = a
- a = b
- b = a
+ a, b = b, a
```

* **Step up**: Make the rule message and severity. Also `after` can be more abstract

```json
[
  {
    "before": [
      "$3 = $1",
      "$1 = $2",
      "$2 = $3"
    ],
    "after": [
      "$1, $2 = $2, $1"
    ],
    "author": "Yuki Ueda",
    "message": "Value exchanging can be one line",
    "severity": "Information"
  }
]
```

* **Recommend**: Also you can generate rule file automatically by following command on your git repository

```sh
devreplay --init
```

* `severity` means how this rule is important
    * `E`: **E**rror
    * `W`: **W**arning
    * `I`: **I**nformation
    * `H`: **H**int

* Run devreplay again
```sh
$ devreplay yourfile.py
I:yourfile.py:15:Value exchanging can be one line by Yuki Ueda
```


Also, you can use default rules by extends some rules such as
```json
[
  {
    "extends": ["typescript", "react", "vscode"]
  }
]
```

## Make rules by using Regular Expression

```json
{
  "before": [
    "([a-z]+)-([a-z]+)"
  ],
  "after": [
      "$1 $2"
  ],
  "regex": true
}
```

That will fix

```diff
- print("hello-world")
+ print("hello world")
```

## Default rule languages

* c
* cpp
* dart
* cobol
* java
* javaScript
* typeScript
* python
* ruby
* go
* php

## Defaulr rule frameworks

* Angular
* chainer2pytouch
* tensorflow
* rails
* vue

### [Contribution Link](https://github.com/devreplay/devreplay/blob/master/CONTRIBUTING.md)

## Thanks

This package is made based on
* [tslint](https://palantir.github.io/tslint/)
* [vscode-python](https://github.com/Microsoft/vscode-python/blob/master/src/client/language/tokenizer.ts)
* [vscode-textmate](https://github.com/microsoft/vscode-textmate)

DevReplay is supported by 2019 Exploratory IT Human Resources Project [The MITOU Program](https://www.ipa.go.jp/jinzai/mitou/portal_index.html), JSPS KAKENHI Grant Numbers JP17H00731, JP15H02683, JP18H03221, and JP18KT0013.

## License

[MIT](LICENSE) © 2019 Yuki Ueda <ueda.yuki.un7@is.naist.jp> (ikuyadeu.github.io)
