# Sums

[![Build Status](https://travis-ci.org/zab/sums.svg?branch=master)](https://travis-ci.org/zab/sums)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

A library to quickly generate SHA1 checksums of Node file streams. Returns a promise resolving with both a checksum of the stream data, and the size of the stream in bytes.

## Install

```bash
$ npm install sums
```

## Getting Started

```javascript
const sums = require('sums')

/* pass any kind of readable stream or a file path */
sums('path-to-file').then(/* ... */)
//= Promise => Object
```

```javascript
{
  sum: '7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8',
  size: 1070
}
```

##### Using the CLI

```bash
$ sums [path-to-file]

# Analyzing [path-to-file]...
# Sum:   7c3af16fe22fcb5f79dcd7cae12cf15cb91150c8
# Size:  1070
```

## API

#### sums(stream)

Generate a sum of the stream. Accepts either a filename (string), or any kind of a readable stream.

> Type: `Stream` or `string`  
> Required: yes

## License

[MIT](license) © [Zab](https://zab.io)
