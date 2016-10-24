import { expect } from 'chai'
import fs from 'fs'
import mockFs from 'mock-fs'
import sums from './index'

describe('unit: sums', () => {
  beforeEach(() => mockFs({
    '/whatup': new Buffer('hello'),
    '/empty': ''
  }))

  it('gets sums of file', async () => {
    expect(await sums('/whatup')).to.deep.equal({
      sum: 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
      size: 5
    })
    expect(await sums('/empty')).to.deep.equal({
      sum: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
      size: 0
    })
    expect(() => sums({ hi: 'hey' })).to.throw
  })

  it('gets sums of stream', async () => {
    expect(await sums(fs.createReadStream('/whatup'), 'js')).to.deep.equal({
      sum: 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d',
      size: 5
    })
    expect(() => sums(fs.createReadStream('/whatup'))).to.throw
  })
})
