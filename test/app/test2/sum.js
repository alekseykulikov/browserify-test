const expect = require('chai').expect
const sum = require('../').sum

describe('test2-sum', () => {
  it('calculates the sum', () => {
    expect(sum(10, 20)).equal(30)
    expect(sum(10, -20)).equal(-10)
  })
})
