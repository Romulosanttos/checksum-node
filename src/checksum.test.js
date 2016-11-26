import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import checksum from './checksum'

describe('unit: checksum', () => {
  it('runs with a jpg', async () => {
    const stream = fs.createReadStream(path.resolve(__dirname, '../test/photo.jpg'))
    const res = await checksum(stream)
    expect(res.sum).to.equal('138107040f82d2c619d660e0b5dff46711f6862a')
    expect(res.size).to.equal(269883)
  })

  it('runs with a compressed jpg', async () => {
    const stream = fs.createReadStream(path.resolve(__dirname, '../test/photo.jpg.gz'))
    const res = await checksum(stream, { compressed: true })
    expect(res.sum).to.equal('138107040f82d2c619d660e0b5dff46711f6862a')
    expect(res.size).to.equal(269883)
  })

  it('runs with md5 algorithm', async () => {
    const stream = fs.createReadStream(path.resolve(__dirname, '../test/photo.jpg'))
    const res = await checksum(stream, { algorithm: 'md5' })
    expect(res.sum).to.equal('81239875ca78e5decbc80fd01fedaca3')
  })
})
