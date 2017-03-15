/* eslint-env mocha */
var expect = require('chai').expect
function odd () {
  return [].slice.call(arguments).reduce(function (memo, val) { memo -= val; return memo })
}

describe('test-odd', function () {
  it('calculates the odd', function () {
    expect(odd(10, 20)).equal(-10)
    expect(odd(10, -20)).equal(30)
  })
})
