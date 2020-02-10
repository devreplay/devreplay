---
title: DevReplay
layout: default
subtitle: An linter based on developer own coding convention.
---

# Quick start

Prerequisites: [Node.js](https://nodejs.org) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

You can install DevReplay using npm or yarn:

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

Lint source code
```sh
devreplay 'src/target.ts' devreplay.json
```
