---
title: DevReplay
layout: default
subtitle: An linter based on developer own coding convention.
---

# Quick start

Prerequisites: [Node.js](https://nodejs.org) built with SSL support. (If you are using an official Node.js distribution, SSL is always built in.)

You can install DevReplay using npm or yarn:

```sh
sudo npm install -g devreplay
# or
yarn global add devreplay
```

You should then set up a configuration file:
```sh
touch devreplay.json

code devreplay.json
# or
vi devreplay.json
```

Here is example of configuration
```json
[
    {
        "condition" ["hello $1"],
        "consequent" ["Hello $1"]
    }
]
```

Lint source code
```sh
devreplay 'src/target.ts' devreplay.json
```
