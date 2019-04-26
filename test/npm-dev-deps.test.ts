import execa from 'execa';
import { resolve } from 'path';

const cwd = resolve(__dirname, './fixtures/npm/dev-deps/');
const reinstallBin = resolve(__dirname, '../dist/bin.js');
const args = [reinstallBin, '--save-dev', 'date-eq', 'nvl'];

describe('[NPM] Dev Dependencies', () => {
	it('should have dependencies before reinstallation', () => {
		const devDeps = require('./fixtures/npm/dev-deps');
		const result = devDeps();

		expect(result).toEqual(true);
	});
	it('should have dependencies after reinstallation', async () => {
		await execa('node', args, {
			cwd,
			stdio: 'ignore'
		});

		const devDeps = require('./fixtures/npm/dev-deps');
		const result = devDeps();

		expect(result).toEqual(true);
	}, 60000);
});
