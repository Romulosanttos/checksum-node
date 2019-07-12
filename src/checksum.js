import stream from 'stream';
import crypto from 'crypto';
import isStream from 'is-stream';
import concatStream from 'concat-stream';
import through from 'through2';

export default async function (data, opts = {}) {
	if (!isStream.readable(data)) {
		const bufferStream = new stream.PassThrough();
		bufferStream.end(Buffer.from(data));

		data = bufferStream;
	}

	const getSize = through((chunk, enc, cb) => {
		size += Buffer.byteLength(chunk);
		cb(null, chunk);
	});

	let size = 0;

	const sum = await new Promise((resolve, reject) => {
		const hash = crypto
			.createHash(opts.algorithm || 'sha1')
			.setEncoding('hex');

		data
			.on('error', reject)
			.pipe(getSize)
			.pipe(hash)
			.pipe(concatStream(resolve));
	});

	return {
		sum,
		size
	};
}
