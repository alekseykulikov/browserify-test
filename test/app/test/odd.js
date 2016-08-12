/* eslint-env mocha */
import { expect } from 'chai'
import { odd } from '../'

describe('test-odd', () => {
  it('calculates the odd', () => {
    expect(odd(10, 20)).equal(-10)
    expect(odd(10, -20)).equal(30)
  })
})
