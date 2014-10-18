var browserify = require('browserify');
var glob = require('glob');
var Testem = require('testem');
var Server = require('testem/lib/server');
var configure = Server.prototype.configureExpress;

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
  var files = [];
  opts.files.forEach(function(p) { files.push.apply(files, glob.sync(p)) });
  var bundler = browserify(files);

  var testem = new Testem();
  opts.watch ? testem.startDev(config) : testem.startCI(config);

  Server.prototype.configureExpress = function() {
    var server = testem.app.server, app = server.express;
    configure.call(server, app);

    app.get('/bundle.js', function(req, res) {
      bundler.bundle(function(err, js) {
        if (err) return res.status(500).send(err.message);
        res.send(200, js);
      });
    });
  };
};
