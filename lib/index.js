var browserify = require('browserify');
var watchify = require('watchify');
var Testem = require('testem');
var Server = require('testem/lib/server');

/**
 * Default testem config.
 */

var config = {
  framework: 'mocha',
  launch_in_ci: ['phantomjs'],
  launch_in_dev: ['phantomjs'],
  serve_files: ['http://localhost:7357/bundle.js'],
};

/**
 * Run testem server with `opts`.
 *
 * @param {Object} opts { files: [], watch: false }
 */

module.exports = function run(opts) {
  var testem = new Testem();
  var bundler;

  if (opts.watch) {
    testem.startDev(config);
    bundler = watchify(browserify(opts.files, watchify.args));
    bundler.on('update', function() { testem.app.startTests() }); // reload
  } else {
    testem.startCI(config);
    bundler = browserify(opts.files);
  }

  // patch testem to handle /bundle.js
  var configure = Server.prototype.configureExpress;
  Server.prototype.configureExpress = function(app) {
    configure.call(this, app);

    app.get('/bundle.js', function(req, res, next) {
      bundler.bundle(function(err, js) {
        if (err) return next(err);

        res.setHeader('Cache-Control', 'private, no-cache');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Content-Length', js.length);
        res.end(js);
      });
    });
  };
};
