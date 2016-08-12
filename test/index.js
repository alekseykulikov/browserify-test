/* eslint-env mocha */
import { expect } from 'chai'
import { exec, spawn } from 'child_process'

describe('browserify-test', () => {
  it('runs one file', (done) => {
    exec('./lib/cli.js -t [ babelify --presets es2015 ] ./test/app/test/sum.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('test-sum calculates the sum')
      expect(stdout).contain('1..1')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('runs multiple files', (done) => {
    exec('./lib/cli.js --transform [ babelify --presets es2015 ] ./test/app/test/sum.js ./test/app/test/odd.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('1..2')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('supports globs', (done) => {
    exec('./lib/cli.js -t [ babelify --presets es2015 ] ./test/app/test/*.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('test-mul calculates the mul')
      expect(stdout).contain('test-mul supports many arguments')
      expect(stdout).contain('test-odd calculates the odd')
      expect(stdout).contain('test-sum calculates the sum')
      expect(stdout).contain('1..4')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('supports multiple transforms', (done) => {
    exec('./lib/cli.js -t browserify-handlebars -t [ babelify --presets es2015 ] ./test/app/test2/read-html.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('test-read-file reads index.html')
      expect(stdout).contain('1..1')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('supports --watch', (done) => {
    const child = spawn('./lib/cli.js', ['--transform', '[', 'babelify', '--presets', 'es2015', ']', '-w', './test/app/test/mul.js'])
    let counter = 0

    child.stdout.on('data', (data) => {
      if (data.toString().trim() !== '2/2 ✔') return
      if (counter === 0) {
        counter = 1
        exec('touch ./test/app/index.js')
      } else if (counter === 1) {
        counter = 2
        child.stdin.write('q') // close testem
        done()
      }
    })
  })
})
