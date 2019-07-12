# checksum-node

[![Build Status](https://travis-ci.org/jsonmaur/sums.svg?branch=master)](https://travis-ci.org/jsonmaur/sums)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A Node library to quickly generate a checksum for multiple types of data. Works well with streams and files.

## Install

```bash
$ npm install checksum-node
```

## Snapshots

Snapshots are a list of checksums and sizes for each file specified. It will also include a total size of all the files, and a checksum of the snapshot as a whole (e.g. `sum(checksum1:checksum2:checksum3)`) to determine if anything in the list of files has changed.

## Getting Started

#### Generating Checksum

```javascript
const fs = require('fs')
const checksum = require('checksum-node')

async function () {
  const stream = fs.createReadStream('path-to-file')
  return await checksum.generateChecksum(stream)
}
```

###### Example Response

```javascript
{
  sum: '7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8',
  size: 1070
}
```

#### Generating Snapshot

```javascript
const glob = require('glob')
const sums = require('sums')

async function () {
  const files = glob.sync('**/*')
  return await checksum.generateSnapshot(files)
}
```

###### Example Response

```javascript
{
  sum: 'e178bb2a25115a2cb657f57cbd7906f5f89422ba',
  size: 4470,
  snapshot: [
    {
      name: 'path/to/file1',
      sum: '7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8',
      size: 1070
    },
    {
      name: 'path/to/file2',
      sum: 'ca5e739f9c39d1a026de2ca31d6e5c50e0b8e24d',
      size: 3400
    }
  ]
}
```

## API

#### .generateChecksum(stream:Stream, options:Object)

Generate a checksum of a stream.

- `options`
  - `algorithm` The hashing algorithm used to generate checksum (defaults to SHA1)

#### .generateSnapshot(files:Array, options:Object)

Generate a snapshot of a list of files, which gives a size and checksum for each file, and for all of them together.

- `options`
  - `algorithm` The hashing algorithm used to generate checksum (defaults to SHA1)

## License

UNLICENSED 