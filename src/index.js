import fs from 'fs'
import crypto from 'crypto'

module.exports = (filename, opts = {}) => {
  opts.algorithm = opts.algorithm || 'sha1'

  return new Promise((resolve, reject) => {
    fs.stat(filename, (err, stat) => {
      if (err) return reject(err)

      if (!stat.isFile()) {
        return reject(new Error(`${filename} is not a file!`))
      }

      const hash = crypto.createHash(opts.algorithm)
      const fileStream = fs.createReadStream(filename)

      hash.setEncoding('hex')
      fileStream.pipe(hash, { end: false })

      fileStream.on('end', () => {
        hash.end()
        resolve(hash.read())
      })
    })
  })
}
