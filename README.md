# Devreplay

Devreplay is static analysis tool based on your own proguramming pattern.
* Visual Studio Code for DevReplay is [here](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.devreplay)
* GitHub Application for DevReplay is [here](https://github.com/marketplace/dev-replay)
* Auto pattern generator is [here](https://github.com/Ikuyadeu/review_pattern_gen)

## How to use

1. Install on local

```sh
sudo npm install devreplay
```

2. Create your own programming pattern(`devreplay.json`) on the root like bellow
(**Recommend**) [Review Pattern Generator](https://github.com/Ikuyadeu/review_pattern_gen) can generate your rule file automatically
```json
[
    {
        "condition": [
            "for $0 in xrange(${1:name}.$2):"
        ],
        "consequent": [
            "import six",
            "for $0 in six.moves.range(${1:name}.$2):"
        ],
        "description": "You shoud use six for python 3",
        "severity": "E"
    },
]
```
This mean if your code has `xrange`, it should be `six.moves.range`

And create your code(`hello.py`) like this.
```python
for a in xrange(array.x):
    pass
```

`Severity` means how this pattern is important
* `E`: **E**rror
* `W`: **W**arning
* `I`: **I**nformation
* `H`: **H**int

3. Run to get warning
```sh
devreplay hello.py devreplay.json
test/files/hello.ts:4:
for $0 in xrange($1.$2): should be import six       for $0 in six.moves.range($1.$2):
```
or get correct code
```sh
devreplay --fix hello.py devreplay.json > hello2.py
```
you can get `hello2.py`, like bellow

```python
import six
for a in six.moves.range(array.x):
    pass
```

**Recommend**: 
* If you want to use it on editor, please try [vscode extensions](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.devreplay)
* If you want to get programing style automatically, please try [review_pattern_gen](https://github.com/Ikuyadeu/review_pattern_gen/tree/master)


## Supported Language

* CPP
* Java
* JavsScript
* TypeScript
* Python
* Ruby

## Future work
For the future, we are preparing default rules for each Language and Frameworks, such as...

* Tensorflow
* Ruby on Rails
* jQuery
* Pandas
* React
* Unity 3D
...

### Contribution

Please check [here](https://github.com/devreplay/devreplay/blob/master/CONTRIBUTING.md)

Quick Start
```sh
git clone https://github.com/devreplay/devreplay.git
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
