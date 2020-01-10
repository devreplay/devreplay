---
layout: default
---

DevReplay is an static analysis tool that check source code based on developer own coding convention.

# Quick start


```sh
# Install the global CLI and its peer dependency
yarn global add devreplay

# Navigate to your sources folder
cd path/to/project

# Lint TypeScript source globs
devreplay -c devreplay.json 'src/**/*.ts'
```
