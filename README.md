# NPM Reinstall
[![license](https://img.shields.io/github/license/gluons/npm-reinstall.svg?style=flat-square)](./LICENSE)
[![npm](https://img.shields.io/npm/v/npm-reinstall.svg?style=flat-square)](https://www.npmjs.com/package/npm-reinstall)
[![npm](https://img.shields.io/npm/dt/npm-reinstall.svg?style=flat-square)](https://www.npmjs.com/package/npm-reinstall)
[![ESLint Gluons](https://img.shields.io/badge/code%20style-gluons-9C27B0.svg?style=flat-square)](https://github.com/gluons/eslint-config-gluons)

🔄 Just reinstall [NPM](https://www.npmjs.com) package.

## What does this package do?

`npm-reinstall` will **uninstall** and **install** your packages again.

## Installation

```bash
npm install --global npm-reinstall
```

## Usage

```
Usage: reinstall [options] <package> ...

Options:
  --help, -h      Show help                                            [boolean]
  --version, -V   Show version number                                  [boolean]
  --global, -g    Reinstall global package                             [boolean]
  --save, -S      Reinstall package in dependencies                    [boolean]
  --save-dev, -D  Reinstall package in devDependencies                 [boolean]
  --verbose, -v   Display more information                             [boolean]
```

> `rin` is an alias for `reinstall`.  
  You can also use it. 🙂
