import { expect } from 'chai'
import { sum } from '../'

describe('test-sum', () => {
  it('calculates the sum', () => {
    expect(sum(10, 20)).equal(30)
    expect(sum(10, -20)).equal(-10)
  })
})
