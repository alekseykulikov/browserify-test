import browserify from 'browserify'
import watchify from 'watchify'
import errorify from 'errorify'
import Testem from 'testem'
import concatStream from 'concat-stream'
import Server from 'testem/lib/server'

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
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/mocha/2.3.4/mocha.css">
          <script src="//cdnjs.cloudflare.com/ajax/libs/mocha/2.3.4/mocha.js"></script>
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
