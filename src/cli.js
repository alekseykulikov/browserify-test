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
.parse(process.argv)

// prepare files

const argv = subarg(process.argv.slice(2), {
  alias: { t: 'transform', w: 'watch' },
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

// run testem

run({
  transform, files,
  watch: program.watch || false
})
