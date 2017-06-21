import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import checksum from './checksum'

describe('unit: checksum', () => {
  it('runs with a jpg', async () => {
    const stream = fs.createReadStream(path.resolve(__dirname, '../test/photo.jpg'))
    const res = await checksum(stream)
    expect(res.sum).to.equal('b53397f48ead8563b86a817449c5ada8ce3db276')
    expect(res.size).to.equal(85699)
  })

  it('runs with md5 algorithm', async () => {
    const stream = fs.createReadStream(path.resolve(__dirname, '../test/photo.jpg'))
    const res = await checksum(stream, { algorithm: 'md5' })
    expect(res.sum).to.equal('7e0d6e76cfb001f73d241fd9ada11573')
  })
})
