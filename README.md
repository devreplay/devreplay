# Devreplay

Devreplay is static analysis tool based on your own proguramming style.

## How to use

1. Install on local

```sh
sudo npm install devreplay
```

2. Create your own programming style(`devreplay.json`) on the root like bellow
```json
[
    {
       "code": [
            "- console .",
            "* log --> info",
            "* \"Hello\" --> \"Hello World!\"",
            "= )",
            "+ ;"
       ]
    }
]
```
This mean if your code has `console.log`, it should be `info`
Please careful when you use `-` symbol or `*` symbol, you should add space by tokens (e.g. `- console.` should be `- console .`).

And create your code(`hello.ts`) like this.
```ts
console.log("Hello")
```

3. 
Run to get warning
```sh
devreplay hello.ts devreplay.json
hello.ts:1: console.log"Hello") should be info"HelloWorld!");
```
or get correct code
```sh
devreplay --fix hello.ts devreplay.json > hello2.ts
```
you can get `hello2.ts`, like bellow

```ts
info("Hello World!");
```

**Recommend**: 
* If you want to use it on editor, please try [vscode extensions](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.devreplay)
* If you want to get programing style automatically, please try [review_pattern_gen](https://github.com/Ikuyadeu/review_pattern_gen/tree/master)


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
yarn test:fix
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
