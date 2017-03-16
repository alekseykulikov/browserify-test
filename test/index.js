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

  it('should support testemOptions', function (done) {
    bt({
      watch: false,
      files: ['./test/app/test/mul.js'],
      transform: [['babelify', { presets: 'es2015' }]],
      finalizer: function (ec, e) {
        expect(ec).equal(1)
        expect(e).property('cause').property('message').equal('true') // See http://bluebirdjs.com/docs/api/ascallback.html
        done()
      },
      testemOptions: {
        on_exit: function (conf, data, cb) {
          cb(true)
        }
      }
    })
  })

  it('supports multiple plugins', (done) => {
    let pluginACalled = false
    let pluginBCalled = false

    bt({
      watch: false,
      plugins: [
        function () {
          pluginACalled = true
        },
        function () {
          pluginBCalled = true
        }
      ],
      files: ['./test/app/odd-noES6.js'],
      finalizer: function () {
        expect(pluginACalled).equal(true)
        expect(pluginBCalled).equal(true)
        done()
      }
    })
  })
})
