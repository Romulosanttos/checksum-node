# Sums

[![Build Status](https://travis-ci.org/zab/sums.svg?branch=master)](https://travis-ci.org/zab/sums)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A Node library to quickly generate SHA1 checksums of streams. Returns a promise resolving with a checksum of the stream data and the size of the stream in bytes. Can also compress a stream, and get the checksum of a compressed stream.

## Install

```bash
$ npm install sums
```

## Getting Started

##### Generating a checksum

```javascript
const fs = require('fs')
const sums = require('sums')

async function () {
  const stream = fs.createReadStream('path-to-file')
  return await sums.checksum(stream)
}
```

```javascript
{
  sum: '7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8',
  size: 1070
}
```

##### Compressing a file

```javascript
const fs = require('fs')
const sums = require('sums')

async function () {
  const stream = fs.createReadStream('path-to-something.jpg')
  return await sums.compress(stream)
}
```

```javascript
{
  file: '/var/folders/tb/dsyr2qf50lz4grxc63xqlvd40000gn/T/sums_47909VYt2yM20EE5f.gz',
  type: 'image/jpeg',
  old_size: 269883,
  new_size: 266862,
  ratio: '1.1%'
}
```

##### Using the CLI

```bash
$ sums [path-to-file]
```

```bash
Analyzing [path-to-file]...
Sum:   7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8
Size:  1070
```

## API

#### sums.checksum(stream:Stream, options:Object)

Generate a SHA1 checksum of a stream. Can pass in a gzip compressed file if `compressed` is set to true, and will return the checksum of the decompressed version.

> Type: `Stream`
> Required: yes

- `options`
  - `compressed` Whether the stream is gzip compressed (will automatically decompress)
  - `algorithm` The hashing algorithm used to generate checksum (defaults to SHA1)

#### sums.compress(stream:Stream)

Will compress a stream using gzip and store in a temporary location.

> Type: `Stream`
> Required: yes

## License

[MIT](license) © [Zab](https://zab.io)
