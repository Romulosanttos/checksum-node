/* eslint-disable no-undef */
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import checksum from '../src/checksum';

describe('unit: checksum', () => {
	it('runs with a jpg', async () => {
		const stream = fs.createReadStream(path.resolve(__dirname, '../assets/photo1.jpg'));
		const res = await checksum(stream);
		expect(res.sum).to.equal('b53397f48ead8563b86a817449c5ada8ce3db276');
		expect(res.size).to.equal(85699);
	});

	it('runs with md5 algorithm', async () => {
		const stream = fs.createReadStream(path.resolve(__dirname, '../assets/photo1.jpg'));
		const res = await checksum(stream, { algorithm: 'md5' });
		expect(res.sum).to.equal('7e0d6e76cfb001f73d241fd9ada11573');
	});

	it('runs with a string', async () => {
		const res = await checksum('hello');
		expect(res.sum).to.equal('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
		expect(res.size).to.equal(5);
	});

	it('runs with sha256', async () => {
		const res = await checksum('hello', { algorithm: 'sha256' });
		expect(res.sum).to.equal('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
		expect(res.size).to.equal(5);
	});
});
