import assert from 'assert'
import zlib from 'zlib'
import crypto from 'crypto'
import isStream from 'is-stream'
import sconcat from 'concat-stream'
import through from 'through2'

export default async function (rstream, compressed) {
  assert(isStream.readable(rstream), 'Must pass a readable stream!')

  let size = 0
  const getSize = through((chunk, enc, cb) => {
    size += Buffer.byteLength(chunk)
    cb(null, chunk)
  })

  const sum = await new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha1').setEncoding('hex')

    rstream.on('error', reject)

    if (compressed) {
      const gunzip = zlib.createGunzip()
      rstream.pipe(gunzip).pipe(getSize).pipe(hash).pipe(sconcat(resolve))
    } else {
      rstream.pipe(getSize).pipe(hash).pipe(sconcat(resolve))
    }
  })

  return { sum, size }
}
