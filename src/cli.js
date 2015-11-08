#!/usr/bin/env node
import program from 'commander'
import glob from 'glob'
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

if (!program.args.length) program.args.push('./test/*.js')
const files = []
program.args.forEach((p) => files.push(...glob.sync(p)))

// run testem

run({
  watch: Boolean(program.watch) || false,
  transform: program.transform ? program.transform.split(',') : [],
  files: files,
})
