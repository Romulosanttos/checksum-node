# Sums

[![Build Status](https://travis-ci.org/zab/sums.svg?branch=master)](https://travis-ci.org/zab/sums)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A library to quickly generate SHA1 checksums of Node streams. Returns a promise resolving with a checksum of the stream data and the size of the stream in bytes.

## Install

```bash
$ npm install sums
```

## Getting Started

```javascript
const fs = require('fs')
const sums = require('sums')

export default async function () {
  const stream = fs.createReadStream('path-to-file')
  return await sums(stream)
}
```

```javascript
/* example response */
{
  sum: '7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8',
  size: 1070
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

#### sums(stream:Stream or file:String)

Generate a sum of the stream or file. Accepts any kind of readable stream, or a filename (will be read as a stream).

> Type: `Stream` or `string`  
> Required: yes

## License

[MIT](license) © [Zab](https://zab.io)
