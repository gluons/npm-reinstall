import execa from 'execa';
import { resolve } from 'path';

const cwd = resolve(__dirname, './pnpm/dev-deps/');
const reinstallBin = resolve(__dirname, '../dist/bin.js');
const args = [reinstallBin, '--save-dev', 'date-eq', 'nvl'];

describe('[PNPM] Dev Dependencies', () => {
	it('should have dependencies before reinstallation', () => {
		const devDeps = require('./pnpm/dev-deps');
		const result = devDeps();

		expect(result).toEqual(true);
	});
	it('should have dependencies after reinstallation', async () => {
		await execa('node', args, {
			cwd,
			stdio: 'ignore'
		});

		const devDeps = require('./pnpm/dev-deps');
		const result = devDeps();

		expect(result).toEqual(true);
	}, 60000);
});
