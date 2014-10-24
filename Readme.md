
# browserify-test [![Build Status](https://travis-ci.org/alekseykulikov/browserify-test.png?branch=master)](https://travis-ci.org/alekseykulikov/browserify-test)

  An easy way to test front-end libraries using [browserify](http://browserify.org) and [mocha](https://github.com/mochajs/mocha).
  Run your tests in terminal with phantomjs or start watch server to test in any browser.

  Main features:

  * No need for test.html page
  * Minimum configuration, just run your tests whenever you want
  * Builds on top of [testem](https://github.com/airportyh/testem) for solid integration with different browsers and platforms
  * Uses [watchify](https://github.com/substack/watchify) for fast development rebuilds.

![](https://dl.dropboxusercontent.com/u/1682963/browserify-test.gif)

## Usage

  Install with npm and make sure phantomjs is installed (`phantomjs -v`):

```bash
npm install -g browserify-test
```

  Pass test files to `browserify-test` and enjoy browserified mocha tests:

```bash
browserify-test # run tests for ./test/*.js
browserify-test --watch # start watch server on localhost:7537
browserify-test ./path/to/test.js ./path/to/another-test.js # pass test files as arguments
browserify-test ./lib/**/test.js # use globs
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
    "browserify-test": "^1.0.0"
  }
}
```

  **npm hint:** you don't need to type `./node_modules/.bin/browserify-test` to refer on local copy of `browserify-test`,
  npm does it [automatically](https://www.npmjs.org/doc/files/npm-folders.html#executables).

## Node.js

```js
var run = require('browserify-test');

run({
  watch: false,
  files: ['./test/file1.js', './test/file2.js']
});
```

  Options:

  * watch - Boolean - enable watch server
  * files - Array - a list of files for browserify

## License

  Aleksey Kulikov, [MIT](http://alekseykulikov.mit-license.org/).
