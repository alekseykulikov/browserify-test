var expect = require('chai').expect;
var odd = require('../').odd;

describe('test-odd', function() {
  it('calculates the odd', function() {
    expect(odd(10, 20)).equal(-10);
    expect(odd(10, -20)).equal(30);
  });
});
