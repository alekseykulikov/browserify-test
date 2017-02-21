#!/usr/bin/env node
import program from 'commander'
import glob from 'glob'
import subarg from 'subarg'
import omit from 'lodash.omit'
import pkg from '../package.json'
import run from './'

// cli

program
.version(pkg.version)
.usage('[options] [./test/*.js ...]')
.option('-w, --watch', 'run watch server on http://localhost:7357')
.option('-t, --transform <t1,t2,..>', 'add browserify transforms')
.option('-p, --plugins <p1,p2,..>', 'add browserify plugins')
.option('-b, --browserifyOptions <jsonStringifiedObj>', 'add browserifyOptions', JSON.parse)
.option('--testem, --testemOptions <jsonStringifiedObj>', 'add testemOptions', JSON.parse)
.parse(process.argv)

// prepare files

const argv = subarg(process.argv.slice(2), {
  alias: { t: 'transform', transforms: 'transform', p: 'plugins', w: 'watch', testem: 'testemOptions' },
  boolean: ['watch']
})
const files = []
if (!argv._.length) argv._ = ['./test/*.js']
argv._.forEach((p) => files.push(...glob.sync(p)))

// parse transforms

const transform = []
if (argv.transform) {
  if (!Array.isArray(argv.transform)) argv.transform = [argv.transform]
  argv.transform.forEach((tr) => {
    if (typeof tr === 'string') {
      transform.push(tr)
    } else if (Array.isArray(tr._)) {
      transform.push([tr._[0], omit(tr, '_')])
    } else {
      throw new Error(`invalid --transform value: ${JSON.stringify(tr)}`)
    }
  })
}

const plugins = []
if (argv.plugins) {
  if (!Array.isArray(argv.plugins)) argv.plugins = [argv.plugins]
  argv.plugins.forEach((tr) => {
    if (typeof tr === 'string') {
      plugins.push(tr)
    } else if (Array.isArray(tr._)) {
      plugins.push([tr._[0], omit(tr, '_')])
    } else {
      throw new Error(`invalid --plugins value: ${JSON.stringify(tr)}`)
    }
  })
}

const browserifyOptions = program.browserifyOptions || {}
const testemOptions = program.testemOptions || {}
// run testem

run({
  files, transform, plugins, browserifyOptions, testemOptions,
  watch: program.watch || false
})
