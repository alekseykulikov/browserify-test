var expect = require('chai').expect;
var mul = require('../').mul;

describe('test-mul', function() {
  it('calculates the mul', function() {
    expect(mul(10, 2)).equal(20);
    expect(mul(10, -4)).equal(-40);
  });

  it('supports many arguments', function() {
    expect(mul(10, 2, 10)).equal(200);
    expect(mul(10, -1, -1, -5)).equal(-50);
  });
});
