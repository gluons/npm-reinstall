import spawn from 'cross-spawn';
import { resolve } from 'path';

const cwd = resolve(__dirname, './npm/deps/');
const reinstallBin = resolve(__dirname, '../dist/bin.js');
const args = [reinstallBin, '--save', 'vue', 'vue-router'];

describe('[NPM] Dependencies', () => {
	it('should have dependencies before reinstallation', () => {
		const deps = require('./npm/deps');
		const result = deps();

		expect(result).toBeDefined();
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

			const deps = require('./npm/deps');
			const result = deps();

			expect(result).toBeDefined();

			done();
		});
	}, 60000);
});
