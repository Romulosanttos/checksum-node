'use strict';

var _checksum = require('../src/checksum');

var _snapshot = require('./snapshot');

module.exports = {
	generateChecksum: _checksum.generateChecksum,
	generateSnapshot: _snapshot.generateSnapshot
};