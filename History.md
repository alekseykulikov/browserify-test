## 2.1.2 / 2015-11-12

* deps: glob@6.0.1, testem@0.9.11

## 2.1.1 / 2015-11-09

* fix support for default files

## 2.1.0 / 2015-11-09

* support subargs syntax for `--transform`
* support multiple transforms by repeating `--transform` option
* use eslint instead of jshint+jscs
* deps: browserify@12.0.1, commander@2.9.0, glob@5.0.15, testem@0.9.9, watchify@3.6.0

## 2.0.0 / 2015-09-13

* remove `--host` and inject scripts to `/` index.html
* handle compilation errors with [errorify](https://github.com/zertosh/errorify)
* rewrite project with ES6 and compile with babel to `./src` folder
* lint code with jshint & jscs
* deps: browserify@11.1.0, commander@2.8.1, glob@5.0.14, testem@0.9.4, watchify@3.4.0

## 1.3.0 / 2015-07-08

* support `--host` option
* deps: browserify@10.2.4, glob@5.0.13, testem@0.9.0-1, watchify@3.2.3

## 1.2.0 / 2015-04-30

* support `--transform` option
* deps: testem@0.8.3, commander@2.8.1, watchify@3.2.0

## 1.1.1 / 2015-04-11

* deps: browserify@9.0.8, glob@5.0.5, testem@0.8.0-0, watchify@3.1.0

## 1.1.0 / 2015-03-14

* deps: browserify@9.0.3, glob@5.0.3, testem@0.7.5, watchify@2.4.0

## 1.0.1 / 2014-10-26

* set correct http headers for /bundle.js [#1](https://github.com/alekseykulikov/browserify-test/issues/1)
* deps: browserify@6.2.0, commander@2.4.0, watchify@2.1.0

## 1.0.0 / 2014-10-24

* initial release
