# Devreplay

Devreplay is static analysis tool based on your own programming pattern.

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

2. Put your own programming pattern(`devreplay.json`) on the project like bellow

```json
[
  {
    "condition": [
      "tmp = $1",
      "$1 = $2",
      "$2 = tmp"
    ],
    "consequent": [
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


* **Recommend**: [DevReplay Pattern Generator](https://github.com/devreplay/devreplay-pattern-generator) generate your pattern from .git
* **Step up**: Make the pattern description and severity. Also condition can be more abstract

```json
[
  {
    "condition": [
      "$3 = $1",
      "$1 = $2",
      "$2 = $3"
    ],
    "consequent": [
      "$1, $2 = $2, $1"
    ],
    "author": "Yuki Ueda",
    "description": "Value exchanging can be one line",
    "severity": "Information"
  }
]
```

* `severity` means how this pattern is important
    * `E`: **E**rror
    * `W`: **W**arning
    * `I`: **I**nformation
    * `H`: **H**int

* Run devreplay again
```sh
$ devreplay yourfile.py
I:yourfile.py:15:Value exchanging can be one line by Yuki Ueda
```

## Supported Language

* C/CPP
* Java
* JavsScript/TypeScript
* Python
* Ruby
* Go
* PHP
* R

### [Contribution Link](https://github.com/devreplay/devreplay/blob/master/CONTRIBUTING.md)

## Thanks

This package is made based on
* [tslint](https://palantir.github.io/tslint/)
* [vscode-python](https://github.com/Microsoft/vscode-python/blob/master/src/client/language/tokenizer.ts)
* [vscode-textmate](https://github.com/microsoft/vscode-textmate)

DevReplay is supported by 2019 Exploratory IT Human Resources Project [The MITOU Program](https://www.ipa.go.jp/jinzai/mitou/portal_index.html), Support Center for Advanced Telecommunications (SCAT) Technology Research, Foundation, JSPS KAKENHI Grant Numbers JP18H03222, JP17H00731, JP15H02683, and JP18KT0013.

## License

[MIT](LICENSE) © 2019 Yuki Ueda <ueda.yuki.un7@is.naist.jp> (ikuyadeu.github.io)
