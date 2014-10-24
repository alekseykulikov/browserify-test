var expect = require('chai').expect;
var sum = require('../').sum;

describe('test-sum', function() {
  it('calculates the sum', function() {
    expect(sum(10, 20)).equal(30);
    expect(sum(10, -20)).equal(-10);
  });
});
