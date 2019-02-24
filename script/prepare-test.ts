import { clearScreen } from 'ansi-escapes';
import chalk from 'chalk';
import { rainbow } from 'chalk-animation';
import spawn from 'cross-spawn';
import once from 'lodash.once';
import { resolve } from 'path';

const { green, red } = chalk;

// npm
const depsPath = resolve(__dirname, '../test/npm/deps');
const devDepsPath = resolve(__dirname, '../test/npm/dev-deps');
// Yarn
const depsYarnPath = resolve(__dirname, '../test/yarn/deps');
const devDepsYarnPath = resolve(__dirname, '../test/yarn/dev-deps');

const rb = rainbow('Preparing test...');

const clear = once(() => {
	rb.stop();
	console.log(clearScreen); // Clear terminal.
});

const depsChild = spawn('npm', ['install'], {
	cwd: depsPath,
	stdio: 'ignore'
});
const devDepsChild = spawn('npm', ['install'], {
	cwd: devDepsPath,
	stdio: 'ignore'
});
const depsYarnChild = spawn('yarn', [], {
	cwd: depsYarnPath,
	stdio: 'ignore'
});
const devDepsYarnChild = spawn('yarn', [], {
	cwd: devDepsYarnPath,
	stdio: 'ignore'
});

depsChild.on('close', code => {
	clear();

	if (code === 0) {
		console.log(green('Prepare dependencies for NPM succeed.'));
	} else {
		console.log(red('Prepare dependencies for NPM fail.'));
	}
});
devDepsChild.on('close', code => {
	clear();

	if (code === 0) {
		console.log(green('Prepare devDependencies for NPM succeed.'));
	} else {
		console.log(red('Prepare devDependencies for NPM fail.'));
	}
});
depsYarnChild.on('close', code => {
	clear();

	if (code === 0) {
		console.log(green('Prepare dependencies for Yarn succeed.'));
	} else {
		console.log(red('Prepare dependencies for Yarn fail.'));
	}
});
devDepsYarnChild.on('close', code => {
	clear();

	if (code === 0) {
		console.log(green('Prepare devDependencies for Yarn succeed.'));
	} else {
		console.log(red('Prepare devDependencies for Yarn fail.'));
	}
});
