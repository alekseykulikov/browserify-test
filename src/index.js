import browserify from 'browserify'
import watchify from 'watchify'
import errorify from 'errorify'
import Testem from 'testem'
import concatStream from 'concat-stream'
import Server from 'testem/lib/server'
import { readFileSync as readFile } from 'fs'
import { join } from 'path'

/**
 * Since 1.x testem does not bundle mocha files, because of this
 * inline mocha's js/css files to support offline development.
 */

const mochaCss = readFile(join(__dirname, '../public/mocha234.min.css'), 'utf8')
const mochaJs = readFile(join(__dirname, '../public/mocha234.min.js'), 'utf8')

/**
 * Run testem server with `opts`.
 *
 * @param {Object} opts
 */

export default function ({ files, transform, watch }) {
  if (!files || !files.length) throw new Error('specify files')

  // setup testem & browserify

  const testem = new Testem()
  const config = {
    framework: 'mocha',
    launch_in_ci: ['phantomjs'],
    launch_in_dev: ['phantomjs']
  }

  let b
  if (watch) {
    testem.startDev(config)
    b = watchify(browserify(files, watchify.args))
    b.on('update', () => testem.app.startTests()) // reload
  } else {
    testem.startCI(config)
    b = browserify(files)
  }

  b.plugin(errorify)
  if (transform) {
    transform.forEach((tr) => {
      if (typeof tr === 'string') {
        b.transform(tr)
      } else {
        b.transform(tr[0], tr[1])
      }
    })
  }

  // monkey-patch testem to inject compiled bundle to root url

  Server.prototype.serveHomePage = (req, res) => {
    b.bundle()
    .on('error', (err) => {
      res.status(500).send(err.stack)
    })
    .pipe(concatStream((buf) => {
      res.status(200).send(`
        <!doctype html>
        <html>
        <head>
          <title>Tests</title>
          <style>${mochaCss}</style>
          <script>${mochaJs}</script>
          <script src="/testem.js"></script>
          <script>mocha.setup('bdd')</script>
        </head>
        <body>
          <div id="mocha"></div>
          <script>${buf.toString()}</script>
          <script>mocha.run()</script>
        </body>
        </html>
      `)
    }))
  }
}
