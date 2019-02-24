import spawn from 'cross-spawn';
import { resolve } from 'path';

const cwd = resolve(__dirname, './npm/dev-deps/');
const reinstallBin = resolve(__dirname, '../dist/bin.js');
const args = [reinstallBin, '--save-dev', 'date-eq', 'nvl'];

describe('[NPM] Dev Dependencies', () => {
	it('should have dependencies before reinstallation', () => {
		const devDeps = require('./npm/dev-deps');
		const result = devDeps();

		expect(result).toEqual(true);
	});
	it('should have dependencies after reinstallation', done => {
		const child = spawn('node', args, {
			cwd,
			stdio: 'ignore'
		});

		child.on('error', err => {
			throw err;
		});
		child.on('close', code => {
			if (code !== 0) {
				throw new Error(`Command finished with code ${code}.`);
			}

			const devDeps = require('./npm/dev-deps');
			const result = devDeps();

			expect(result).toEqual(true);

			done();
		});
	}, 60000);
});
