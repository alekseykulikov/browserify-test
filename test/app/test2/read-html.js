/* eslint-env mocha */
import { expect } from 'chai'
import template from './index.html'

describe('test-read-file', () => {
  it('reads index.html', () => {
    expect(template({ greeting: 'friends' }).trim()).equal('<h1>Hello friends!</h1>')
  })
})
