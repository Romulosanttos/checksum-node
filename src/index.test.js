import { expect } from 'chai'
import mockFs from 'mock-fs'
import sums from './index'

beforeEach(() => mockFs({
  '/whatup.txt': new Buffer('hello'),
  '/yo.txt': 'hi',
  '/empty': ''
}))

describe('unit: index', () => {
  it('hashes file', async () => {
    expect(await sums('/whatup.txt')).to.equal('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d')
    expect(await sums('/yo.txt')).to.equal('c22b5f9178342609428d6f51b2c5af4c0bde6a42')
    expect(await sums('/empty')).to.equal('da39a3ee5e6b4b0d3255bfef95601890afd80709')
  })
})
