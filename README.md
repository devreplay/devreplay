# Devreplay

![CI](https://github.com/devreplay/devreplay/workflows/CI/badge.svg)
![Lint](https://github.com/devreplay/devreplay/workflows/Lint/badge.svg)

Devreplay is static analysis tool based on your own programming rule.

* [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=Ikuyadeu.devreplay)
* [Other Editor Support (Language Server)](https://www.npmjs.com/package/devreplay-server)

## How to use

1. Install on local

```sh
$ npm install -g devreplay
# or
$ yarn global add devreplay
```

2. Put your own programming rule(`.devreplay.json`) on the project like bellow

```json
{
  "before": [
    "(?<tmp>.+)\\s*=\\s*(?<a>.+)",
    "\\k<a>\\s*=\\s*(?<b>.+)",
    "\\k<b>\\s*=\\s*\\k<tmp>"
  ],
  "after": [
    "$2, $3 = $3, $2"
  ],
  "isRegex": true
}
```

3. Run the devreplay

```sh
devreplay yourfile.py
```

or get fixed code

```sh
devreplay --fix yourfile.py
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
{
  "before": [
    "(?<tmp>.+)\\s*=\\s*(?<a>.+)",
    "\\k<a>\\s*=\\s*(?<b>.+)",
    "\\k<b>\\s*=\\s*\\k<tmp>"
  ],
  "after": [
    "$2, $3 = $3, $2"
  ],
  "isRegex": true,
  "author": "Yuki Ueda",
  "message": "Value exchanging can be one line",
  "severity": "Information"
}
```

* `severity` means how this rule is important
  * `E`: **E**rror
  * `W`: **W**arning
  * `I`: **I**nformation
  * `H`: **H**int

* Run devreplay again

```sh
$ devreplay yourfile.py
./yourfile.py
  15:1  warning  Value exchanging can be one line  0
```

### Make rules by using Regular Expression

```json
{
  "before": [
    "([a-z]+)-([a-z]+)"
  ],
  "after": [
      "$1 $2"
  ],
  "isRegex": true
}
```

That will fix

```diff
- print("hello-world")
+ print("hello world")
```

### Support Languages and Frameworks

Also, you can use default rules by extends some rules such as

```json
[
  "TypeScript",
  "Python",
]
```

| Languages  | Frameworks      |
|------------|-----------------|
| C          | Android         |
| CPP        | Angular         |
| Cobol      | chainer2pytouch |
| Dart       | Rails           |
| Java       | React           |
| JavaScript | TensorFlow      |
| PHP        |  VS Code        |
| Python     |  Vue            |
| Ruby       |                 |
| TypeScript |                 |

### API Usage

You can use `devreplay` as a TypeScript API.

```ts
import {DevReplayRule, BaseRule2DevReplayRule, fixWithRules} from 'devreplay';

const rules: DevReplayRule[] = [{
    before: [
      '([a-z]+)-([a-z]+)'
    ],
    after: [
        '$1 $2'
    ],
    isRegex: true
},
{
  before: [
    'for \\(let (?<i>.+) = 0;\\k<i> < (?<arr>.+).length;\\k<i>\\+\\+\\) (.*)\\(\\k<arr>\\[\\k<i>\\]\\)'
  ],
  after: [
    'for (let $1 = 0;$1 < $2.length;i++) {',
    '    $3($2[$1])',
    '}'
  ],
  isRegex: true,
  message: 'One line for should use paren'
}].map(rule => BaseRule2DevReplayRule(rule, 0));

const fixed = fixWithRules('print("hello-world")', rules)
/*
'print("hello world")'
*/
console.log(fixed)

const fixed2 = fixWithRules('for (let i = 0;i < arr.length;i++) foo(arr[i])', rules)
/*
for (let i = 0;i < arr.length;i++) {
  foo(arr[i])
}
*/
console.log(fixed2)
```

### GitHub Actions

Please copy following `.github/workflows/devreplay.yml` file to your repository.

```yml
name: Devreplay
on: [push, pull_request]
jobs:
  devreplay:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "14.x"
      - run: npm install -g devreplay
      - name: Run devreplay
        run: devreplay ./ .devreplay.json
```

## [Contribution Link](https://github.com/devreplay/devreplay/blob/master/CONTRIBUTING.md)

## TODO

* Support rule ignoring comments
* Support `.devreplayignore` file
* Make rule generating GUI

## License

[MIT](LICENSE) © 2019 Yuki Ueda <ikuyadeu0513@gmail.com> (ikuyadeu.github.io)
