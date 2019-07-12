import fs from 'fs';
import {generateChecksum} from './checksum';

export default async function (files, opts = {}) {
	let size = 0;

	const snapshot = await Promise.all(
		files.sort().map((file) => {
			const stream = fs.createReadStream(file);

			return generateChecksum(stream, opts).then(data => {
				size += data.size;

				return {
					name: file,
					sum: data.sum,
					size: data.size
				};
			});
		})
	);

	const { sum } = await generateChecksum(snapshot
		.map(s => s.sum)
		.join(':'));

	return {
		sum,
		size,
		snapshot
	};
}
