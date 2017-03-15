/* eslint-env mocha */
import { expect } from 'chai'
import { exec, spawn } from 'child_process'
import bt from '../'
import stream from 'stream'

describe('browserify-test', () => {
  // clean child process in the case of error
  let child
  afterEach(() => {
    if (child) {
      child.kill('SIGINT')
      child = null
    }
  })

  it('runs one file', (done) => {
    exec('node ./lib/cli.js -t [ babelify --presets es2015 ] ./test/app/test/sum.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('test-sum calculates the sum')
      expect(stdout).contain('1..1')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('runs multiple files', (done) => {
    exec('node ./lib/cli.js --transform [ babelify --presets es2015 ] ./test/app/test/sum.js ./test/app/test/odd.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('1..2')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('supports globs', (done) => {
    exec('node ./lib/cli.js -t [ babelify --presets es2015 ] ./test/app/test/*.js', (err, stdout) => {
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
    exec('node ./lib/cli.js -t browserify-handlebars -t [ babelify --presets es2015 ] ./test/app/test2/read-html.js', (err, stdout) => {
      if (err) return done(err)
      expect(stdout).contain('test-read-file reads index.html')
      expect(stdout).contain('1..1')
      expect(stdout).contain('# ok')
      done()
    })
  })

  it('supports testemOptions', (done) => {
    const browser = (/^win/.test(process.platform) ? 'Chrome' : 'Safari')
    exec('node ./lib/cli.js -t [ babelify --presets es2015 ] --testem \'{"launch_in_ci": ["' +
      browser +
      '"]}\' ./test/app/test/*.js',
      (err, stdout) => {
        if (err) return done(err)
        expect(stdout).contain('# ok')
        expect(stdout).contain(browser)
        done()
      })
  })

  it('should throw an error when the files option is not passed', function () {
    expect(bt.bind(null, {})).throw(Error)
  })

  it('should call the callback', function (done) {
    bt(
      {
        watch: false,
        files: ['./test/app/test/mul.js'],
        transform: [['babelify', { presets: 'es2015' }]],
        finalizer: done
      }
    )
  })

  it('should work with entries alias', function (done) {
    bt(
      {
        watch: false,
        entries: ['./test/app/test/mul.js'],
        transform: [['babelify', { presets: 'es2015' }]],
        finalizer: done
      }
    )
  })

  it('should work with transforms alias', function (done) {
    bt(
      {
        watch: false,
        files: ['./test/app/test/mul.js'],
        transforms: [['babelify', { presets: 'es2015' }]],
        finalizer: done
      }
    )
  })

  it('should not throw an error when transform options are not passed', function (done) {
    expect(bt.bind(null, {
      files: ['./test/odd-noES6.js'],
      finalizer: done
    })).not.throw()
  })

  it('supports browserifyOptions', (done) => {
    const b = bt({
      files: ['./test/app/test/sum.js'],
      transform: [['babelify', { presets: 'es2015' }]],
      browserifyOptions: { debug: true },
      finalizer: function () {
        let s = ''
        class CheckStream extends stream.Writable {
          _write (chunk, enc, next) {
            s += chunk.toString()
            next()
          }
          end () {
            expect(s).contain('sourceMappingURL')
            done()
          }
        }
        b.bundle().pipe(new CheckStream())
      }
    })
  })

  it('returns browserify instance', (done) => {
    const b = bt({
      files: ['./test/app/test/sum.js'],
      transform: [['babelify', { presets: 'es2015' }]],
      finalizer: done
    })
    expect(b).property('bundle').is.a('function')
  })

  it('supports multiple plugins', (done) => {
    let ct = 0
    function checkDone () {
      ct++
      if (ct === 2) done()
    }
    bt({
      plugins: [
        function () {
          checkDone()
        },
        function () {
          checkDone()
        }
      ],
      files: ['./test/odd-noES6.js']
    })
  })

  it('supports --watch', (done) => {
    child = spawn('node', ['./lib/cli.js', '--transform', '[', 'babelify', '--presets', 'es2015', ']', '-w', './test/app/test/mul.js'])
    let counter = 0

    child.stdout.on('data', (data) => {
      if (data.toString().indexOf('2/2') === -1) return
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
