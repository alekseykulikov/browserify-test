/* eslint-env mocha */
import { expect } from 'chai'
import { mul } from '../'

describe('test-mul', () => {
  it('calculates the mul', () => {
    expect(mul(10, 2)).equal(20)
    expect(mul(10, -4)).equal(-40)
  })

  it('supports many arguments', () => {
    expect(mul(10, 2, 10)).equal(200)
    expect(mul(10, -1, -1, -5)).equal(-50)
  })
})
