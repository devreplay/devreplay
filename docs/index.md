---
title: DevReplay
layout: default
subtitle: An linter based on developer own coding convention.
---

# Quick start

You can install DevReplay using [npm](https://nodejs.org) or yarn:

```sh
npm install -g devreplay
# or
yarn global add devreplay
```

You should then make a `devreplay.json` file.
Here is the example.
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

Fix the your source file.
```sh
devreplay --fix yourfile.py > yourfile.py
```

```diff
- tmp = a
- a = b
- b = a
+ a, b = b, a
```
