import execa from 'execa';
import { resolve } from 'path';

const cwd = resolve(__dirname, './fixtures/pnpm/deps/');
const reinstallBin = resolve(__dirname, '../dist/bin.js');
const args = [reinstallBin, '--save', 'vue', 'vue-router'];

describe('[PNPM] Dependencies', () => {
	it('should have dependencies before reinstallation', () => {
		const deps = require('./fixtures/pnpm/deps');
		const result = deps();

		expect(result).toBeDefined();
	});
	it('should have dependencies after reinstallation', async () => {
		await execa('node', args, {
			cwd,
			stdio: 'ignore'
		});

		const deps = require('./fixtures/pnpm/deps');
		const result = deps();

		expect(result).toBeDefined();
	}, 60000);
});
