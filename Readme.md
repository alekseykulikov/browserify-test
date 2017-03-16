# browserify-test

[![](https://travis-ci.org/alekseykulikov/browserify-test.png)](https://travis-ci.org/alekseykulikov/browserify-test)
[![](https://img.shields.io/npm/v/browserify-test.svg)](https://npmjs.org/package/browserify-test)
[![](http://img.shields.io/npm/dm/idb-schema.svg)](https://npmjs.org/package/browserify-test)
[![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> Simplify testing of front-end libraries using [browserify](http://browserify.org)
and [mocha](https://github.com/mochajs/mocha)

Features:

* No config files, just run your tests in terminal with phantomjs or start watch server to test and debug in actual browser;
* It builds on top of [testem](https://github.com/airportyh/testem) for solid integration with different browsers and platforms;
* It uses [watchify](https://github.com/substack/watchify) and [errorify](https://github.com/zertosh/errorify) for better development experience;

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
    -p, --plugins <p1,p2,..>    add browserify plugins
    -b, --browserifyOptions <jsonStringifiedObj>     add browserifyOptions
    --testem, --testemOptions <jsonStringifiedObj>   add testemOptions

browserify-test # run tests for ./test/*.js
browserify-test --watch # start watch server on localhost:7537
browserify-test ./path/to/test.js ./path/to/another-test.js # pass test files as arguments
browserify-test ./lib/**/test.js # use globs
browserify-test --transform [ babelify --presets es2015 ] ./path/to/es6-test.js # use transforms
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
    "browserify-test": "^2.1.2"
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

### Options

* `files` (or `entries`) - Array - a list of files for browserify
* `watch` - Boolean - enable watch server
* `transform` (or `transforms`) - Array - a list of browserify transform modules
* `plugins` - Array - a list of browserify transform modules
* `browserifyOptions` - Object - options to pass as [`browserify` options](https://github.com/substack/node-browserify#browserifyfiles--opts)
* `testemOptions` - Object - options to pass as [`testem` options](https://github.com/testem/testem/blob/master/docs/config_file.md#option-reference). Note that besides config-level options, the CLI-level options are also available, as are Testem's [hooks](https://github.com/testem/testem/blob/master/docs/config_file.md#available-hooks) which can be used to report on [testem phases](https://github.com/testem/testem/blob/master/README.md#preprocessors-coffeescript-less-sass-browserify-etc)); these can be expressed as strings (to execute shell commands) or as callbacks. Callbacks will be passed the Testem config object, any data object for the hook (only currently used for the undocumented `on_change` hook, providing a `file` path property), and a callback which should be invoked with a falsy argument (or no arguments) to indicate a passed Testem test or invoked with a truthy argument (such as an error object) to report a failed Testem test.
* `finalizer` - Function called toward end of tests; as in testem, this finalizer will be passed an exit code (set to 0 if normal and 1 if erring) and any [(Bluebird) error object](http://bluebirdjs.com/docs/api/ascallback.html). If you wish to execute code prior to the end of all tests, see the docs above on hooks in `testemOptions`.

## License

[MIT]('./LICENSE')
