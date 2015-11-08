# browserify-test

[![Build Status](https://travis-ci.org/alekseykulikov/browserify-test.png?branch=master)](https://travis-ci.org/alekseykulikov/browserify-test)
[![](https://img.shields.io/npm/v/browserify-test.svg)](https://npmjs.org/package/browserify-test)

> Test front-end libraries using [browserify](http://browserify.org)
and [mocha](https://github.com/mochajs/mocha) with ease

Features:

* No config files, just run your tests in terminal with phantomjs or start watch server to test and debug in actual browser;
* It builds on top of [testem](https://github.com/airportyh/testem) for solid integration with different browsers and platforms;
* It uses [watchify](https://github.com/substack/watchify) and [errorify](https://github.com/zertosh/errorify) for better development experience;
* Clean ES6 [source code](./lib/index.js).

![](https://dl.dropboxusercontent.com/u/1682963/browserify-test.gif)

## Usage

Install with npm and make sure phantomjs is installed (`phantomjs -v`):

```bash
npm install --global browserify-test
```

Pass test files to `browserify-test` and enjoy browserified mocha tests:

```bash
browserify-test --help

  Usage: browserify-test [options] [./test/*.js ...]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -w, --watch                 run watch server on http://localhost:7357
    -t, --transform <t1,t2,..>  add browserify transforms

browserify-test # run tests for ./test/*.js
browserify-test --watch # start watch server on localhost:7537
browserify-test ./path/to/test.js ./path/to/another-test.js # pass test files as arguments
browserify-test ./lib/**/test.js # use globs
browserify-test --tranform [ babelify --presets es2015 ] ./path/to/es6-test.js # use transforms
```

## Integration with npm

  Add `browserify-test` to your development dependencies:

```bash
npm install --save-dev browserify-test
```

And use [npm scripts](https://www.npmjs.org/doc/misc/npm-scripts.html)
to run your tests in terminal with `npm test` or start development watch server with `npm start`.


```json
{
  "scripts": {
    "test": "browserify-test ./test/index.js",
    "start": "browserify-test --watch ./test/index.js"
  },
  "devDependencies": {
    "browserify-test": "^2.1.0"
  }
}
```

**npm hint:** you don't need to type `./node_modules/.bin/browserify-test` to refer on local copy of `browserify-test`,
npm does it [automatically](https://www.npmjs.org/doc/files/npm-folders.html#executables).


## Node.js

```js
import run from 'browserify-test'

run({
  watch: false,
  transform: ['brsf', ['babelify', { presets: 'es2015' }]],
  files: ['./test/file1.js', './test/file2.js'],
})
```

Options:

* `watch` - Boolean - enable watch server
* `transform` - Array - a list of browserify transform modules
* `files` - Array - a list of files for browserify

## License

[MIT]('./LICENSE')
