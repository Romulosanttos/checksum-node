import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import isStream from 'is-stream'

module.exports = (stream) => {
  if (typeof stream !== 'string' && !isStream(stream)) {
    throw new TypeError(`stream must be a string or stream, got ${typeof stream}`)
  }

  return new Promise((resolve, reject) => {
    stream = !isStream.readable(stream)
      ? fs.createReadStream(path.resolve(stream))
      : stream

    let size = 0
    stream.on('data', (chunk) => (size += Buffer.byteLength(chunk)))

    const hash = crypto.createHash('sha1').setEncoding('hex')
    stream.pipe(hash, { end: false })

    stream.on('end', () => {
      hash.end()

      const sum = hash.read()
      resolve({ size, sum })
    })
  })
}
