/* eslint-env mocha */
import { expect } from 'chai'
import bt from '../'
import stream from 'stream'

describe('browserify-test/index', () => {
  it('should throw an error when the files option is not passed', function () {
    expect(bt.bind(null, {})).throw(Error)
  })

  it('should call the callback', function (done) {
    bt({
      watch: false,
      files: ['./test/app/test/mul.js'],
      transform: [['babelify', { presets: 'es2015' }]],
      finalizer: done
    })
  })

  it('should work with entries alias', function (done) {
    bt({
      watch: false,
      entries: ['./test/app/test/mul.js'],
      transform: [['babelify', { presets: 'es2015' }]],
      finalizer: done
    })
  })

  it('should work with transforms alias', function (done) {
    bt({
      watch: false,
      files: ['./test/app/test/mul.js'],
      transforms: [['babelify', { presets: 'es2015' }]],
      finalizer: done
    })
  })

  it('should not throw an error when transform options are not passed', function (done) {
    expect(bt.bind(null, {
      files: ['./test/app/odd-noES6.js'],
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
      files: ['./test/app/odd-noES6.js']
    })
  })
})
