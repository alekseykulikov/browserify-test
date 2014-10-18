# browserify-test

Run browser tests with browserify.

  * build and run tests with phantomjs
  * no test.html page
  * no need to use Selenium to run tests in real browsers
  * smooth integration with testem
  * use watchify for fast development updates

Try: https://github.com/mantoni/mochify.js

## Usage

```bash
browserify-test # run tests for ./test/*.js
browserify-test ./path/to/test.js ./path/to/another-test.js
browserify-test --watch # start watch server on localhost:7537
```

## Installation

    $ npm install -g browserify-test

## License

Aleksey Kulikov, [MIT](http://alekseykulikov.mit-license.org/).
