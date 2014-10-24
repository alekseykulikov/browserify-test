var expect = require('chai').expect;
var exec = require('child_process').exec;

describe('browserify-test', function() {
  it('runs one file', function(done) {
    exec('./bin/browserify-test ./test/app/test/sum.js', function(err, stdout) {
      if (err) return done(err);
      expect(stdout).contain('ok 1 PhantomJS 1.9 - test-sum calculates the sum');
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
      expect(stdout).contain('ok 1 PhantomJS 1.9 - test-mul calculates the mul');
      expect(stdout).contain('ok 2 PhantomJS 1.9 - test-mul supports many arguments');
      expect(stdout).contain('ok 3 PhantomJS 1.9 - test-odd calculates the odd');
      expect(stdout).contain('ok 4 PhantomJS 1.9 - test-sum calculates the sum');
      expect(stdout).contain('1..4');
      expect(stdout).contain('# ok');
      done();
    });
  });
});
