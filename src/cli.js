import fs from 'fs'
import path from 'path'
import { checksum } from './index'

export default function () {
  const file = process.argv[2]
  const isGz = path.extname(file) === '.gz'

  checksum(fs.createReadStream(file), isGz)
    .then(sum => {
      console.log('Sum:  ', sum.sum)
      console.log('Size: ', sum.size)
    })
    .catch(err => {
      console.error('Error:', err.message || err)
    })
}
