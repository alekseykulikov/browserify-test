var browserify = require('browserify');
var watchify = require('watchify');
var Testem = require('testem');
var Server = require('testem/lib/server');
var resolve = require('url').resolve;

/**
 * Run testem server with `opts`.
 *
 * @param {Object} opts { files: [], tranform: [], watch: false }
 */

module.exports = function run(opts) {
  var testem = new Testem();
  var b;
  var config = {
    framework: 'mocha',
    launch_in_ci: ['phantomjs'],
    launch_in_dev: ['phantomjs'],
    serve_files: [resolve(opts.host || 'http://localhost:7357', '/bundle.js')],
  };

  if (opts.watch) {
    testem.startDev(config);
    b = watchify(browserify(opts.files, watchify.args));
    b.on('update', function() { testem.app.startTests() }); // reload
    opts.transform.forEach(b.transform, b)
  } else {
    testem.startCI(config);
    b = browserify(opts.files);
    opts.transform.forEach(b.transform, b)
  }

  // patch testem to handle /bundle.js
  var configure = Server.prototype.configureExpress;
  Server.prototype.configureExpress = function(app) {
    configure.call(this, app);

    app.get('/bundle.js', function(req, res, next) {
      b.bundle(function(err, js) {
        if (err) return next(err);

        res.setHeader('Cache-Control', 'private, no-cache');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Content-Length', js.length);
        res.end(js);
      });
    });
  };
};
