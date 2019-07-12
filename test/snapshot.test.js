/* eslint-disable no-undef */
import { expect } from 'chai';
import snapshot from '../src/snapshot';

describe('unit: snapshot', () => {
	it('runs with a jpg', async () => {
		const files = [
			'assets/photo1.jpg',
			'assets/photo2.jpg'
		];
		expect(await snapshot(files)).to.deep.equal({
			sum: '0fb3afe0fb94399a6c4a863d19534c77c64c5c3d',
			size: 203735,
			snapshot: [
				{
					name: 'assets/photo1.jpg',
					sum: 'b53397f48ead8563b86a817449c5ada8ce3db276',
					size: 85699
				},
				{
					name: 'assets/photo2.jpg',
					sum: 'b0c476c36ee7f9f462713de6e1a97adeb78cfe25',
					size: 118036
				}
			]
		});
	});

	it('runs with md5 algorithm', async () => {
		const files = [
			'assets/photo1.jpg',
			'assets/photo2.jpg'
		];
		expect(await snapshot(files, { algorithm: 'md5' })).to.deep.equal({
			sum: 'c006c94c4ba83aeb68f3a2b06dd147d679738830',
			size: 203735,
			snapshot: [
				{
					name: 'assets/photo1.jpg',
					sum: '7e0d6e76cfb001f73d241fd9ada11573',
					size: 85699
				},
				{
					name: 'assets/photo2.jpg',
					sum: '5d860820a67246913a3fa400cbd104ba',
					size: 118036
				}
			]
		});
	});
});
