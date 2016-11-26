import assert from 'assert'
import fs from 'fs'
import zlib from 'zlib'
import tmp from 'tmp'
import isStream from 'is-stream'
import fileType from 'file-type'

tmp.setGracefulCleanup()

export default async function (rstream) {
  assert(isStream.readable(rstream), 'Must pass a readable stream!')

  const gzip = zlib.createGzip()
  const tmpFile = await getTempFile()
  const wstream = fs.createWriteStream(tmpFile)

  let type
  let size = 0
  rstream.on('data', buf => {
    if (!type) type = fileType(buf)
    size += Buffer.byteLength(buf)
  })

  rstream.pipe(gzip).pipe(wstream)
  await new Promise((resolve, reject) => {
    wstream.on('error', reject)
    wstream.on('finish', resolve)
  })

  const stat = await getFileStats(tmpFile)
  const ratio = await getCompressionRatio(size, stat.size)

  return {
    file: tmpFile,
    type: type.mime,
    old_size: size,
    new_size: stat.size,
    ratio
  }
}

function getTempFile () {
  return new Promise((resolve, reject) => {
    const config = {
      prefix: 'sums_',
      postfix: '.gz'
    }

    tmp.file(config, (err, file) => {
      if (err) reject(err)
      else resolve(file)
    })
  })
}

function getFileStats (file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) reject(err)
      else resolve(stat)
    })
  })
}

function getCompressionRatio (oldSize, newSize) {
  oldSize = parseInt(oldSize, 10)
  newSize = parseInt(newSize, 10)

  const ratio = 100 - ((newSize * 100) / oldSize)
  return `${ratio.toFixed(1)}%`
}
