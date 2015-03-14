var expect = require('chai').expect;
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

describe('browserify-test', function() {
  it('runs one file', function(done) {
    exec('./bin/browserify-test ./test/app/test/sum.js', function(err, stdout) {
      if (err) return done(err);
      expect(stdout).contain('ok 1 PhantomJS 2.0 - test-sum calculates the sum');
      expect(stdout).contain('1..1');
      expect(stdout).contain('# ok');
      done();
    });
  });

  it('runs many files', function(done) {
    exec('./bin/browserify-test ./test/app/test/sum.js ./test/app/test/odd.js', function(err, stdout) {
      if (err) return done(err);
      expect(stdout).contain('1..2');
      expect(stdout).contain('# ok');
      done();
    });
  });

  it('supports globs', function(done) {
    exec('./bin/browserify-test ./test/app/test/*.js', function(err, stdout) {
      if (err) return done(err);
      expect(stdout).contain('ok 1 PhantomJS 2.0 - test-mul calculates the mul');
      expect(stdout).contain('ok 2 PhantomJS 2.0 - test-mul supports many arguments');
      expect(stdout).contain('ok 3 PhantomJS 2.0 - test-odd calculates the odd');
      expect(stdout).contain('ok 4 PhantomJS 2.0 - test-sum calculates the sum');
      expect(stdout).contain('1..4');
      expect(stdout).contain('# ok');
      done();
    });
  });

  it('supports --watch', function(done) {
    var child = spawn('./bin/browserify-test', ['--watch', './test/app/test/mul.js']);
    var timer = setTimeout(child.kill.bind(child), 8000);
    var counter = 0;

    child.stdout.on('data', function (data) {
      if (data.toString().trim() != '2/2 ✔') return;
      if (counter === 0) {
        counter = 1;
        exec('touch ./test/app/index.js');
      } else if (counter === 1) {
        counter = 2;
        child.stdin.write('q'); // close testem
      }
    });

    child.on('close', function() {
      clearTimeout(timer);
      expect(counter).equal(2);
      done();
    });
  });
});
