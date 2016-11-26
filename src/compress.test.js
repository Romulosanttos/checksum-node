import { expect } from 'chai'
import fs from 'fs'
import path from 'path'
import compress from './compress'

describe('unit: compress', () => {
  it('runs with a jpg', async () => {
    const stream = fs.createReadStream(path.resolve(__dirname, '../test/photo.jpg'))
    const res = await compress(stream)
    expect(res.file).to.match(/\.gz$/)
    expect(res.old_size).to.equal(269883)
    expect(res.new_size).to.equal(266862)
    expect(res.ratio).to.equal('1.1%')
    expect(fs.existsSync(res.file)).to.be.true
  })
})
