import { clearScreen } from 'ansi-escapes';
import { rainbow } from 'chalk-animation';
import execa from 'execa';
import { EOL } from 'os';
import { resolve } from 'path';
import signale from 'signale';

// npm
const depsPath = resolve(__dirname, '../test/npm/deps');
const devDepsPath = resolve(__dirname, '../test/npm/dev-deps');
// Yarn
const depsYarnPath = resolve(__dirname, '../test/yarn/deps');
const devDepsYarnPath = resolve(__dirname, '../test/yarn/dev-deps');

const rb = rainbow('Preparing test...');

const clear = () => {
	rb.stop();
	process.stdout.write(`${clearScreen}${EOL}`); // Clear terminal
};

(async () => {
	try {
		await Promise.all([
			execa('npm', ['install'], {
				cwd: depsPath,
				stdio: 'ignore'
			}),
			execa('npm', ['install'], {
				cwd: devDepsPath,
				stdio: 'ignore'
			}),
			execa('yarn', ['install'], {
				cwd: depsYarnPath,
				stdio: 'ignore'
			}),
			execa('yarn', ['install'], {
				cwd: devDepsYarnPath,
				stdio: 'ignore'
			})
		]);

		clear();

		signale.success('Test fixtures dependencies prepared.');
	} catch (err) {
		signale.error(err);
	}
})();
