import assert from 'assert'
import crypto from 'crypto'
import isStream from 'is-stream'
import concatStream from 'concat-stream'
import through from 'through2'

export default async function (rstream, opts = {}) {
  assert(isStream.readable(rstream),
    'Must pass a readable stream!')

  let size = 0
  const getSize = through((chunk, enc, cb) => {
    size += Buffer.byteLength(chunk)
    cb(null, chunk)
  })

  const sum = await new Promise((resolve, reject) => {
    const algo = opts.algorithm || 'sha1'
    const hash = crypto.createHash(algo).setEncoding('hex')

    rstream.on('error', reject)
    rstream.pipe(getSize).pipe(hash).pipe(concatStream(resolve))
  })

  return {
    sum,
    size
  }
}
