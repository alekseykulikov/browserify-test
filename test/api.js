var expect = require('chai').expect;
var api = require('..');

describe('browserify-test', function() {
  describe('api', function() {

    it('should throw an error when the files option is not passed', function() {
      expect(api.bind(null, {})).to.throw(Error);
    });

    //it('should not throw an error when transform options are not passed', function(done) {
    //  expect(api.bind(null, {
    //    watch: false,
    //    files: ['./test/app/test/mul.js']
    //  }, done)).to.not.throw();
    //});

    it('should call the callback', function(done) {
      api(
        {
          watch: false,
          files: ['./test/app/test/mul.js']
        },
        done
      );
    });

  });
});
