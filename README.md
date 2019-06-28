# Dev replay

Dev replay is static analysis tool based on your own proguramming style.

## How to use

1. Make your rule file `devreplay.json`

```json
[
 {
    "code": [
     "* == --> ==="
    ]
 }
]
```

2. Install and run devreplay

```sh
sudo npm install devreplay
devreplay checkedFile.ts
```

Also, I published the vscode extensions. Please try it.


## Supported Language

* CPP
* Java
* JavsScript
* Python
* Ruby
* TypeScript

### Contribution

```sh
git clone https://github.com/ikuyadeu/devreplay.git
yarn
yarn compile
yarn test
```

If you have suggestions for how another-code-reviewer could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

## Thanks

This package is made based on
* [tslint](https://palantir.github.io/tslint/)
* [vscode-python](https://github.com/Microsoft/vscode-python/blob/master/src/client/language/tokenizer.ts)
* [vscode-textmate](https://github.com/microsoft/vscode-textmate)

We would like to thank the Support Center for Advanced Telecommunications (SCAT) Technology Research, Foundation.
This system was supported by JSPS KAKENHI Grant Numbers JP18H03222, JP17H00731, JP15H02683, and JP18KT0013.

## License

[MIT](LICENSE) © 2019 Yuki Ueda <ueda.yuki.un7@is.naist.jp> (ikuyadeu.github.io)
