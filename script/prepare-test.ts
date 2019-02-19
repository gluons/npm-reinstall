import chalk from 'chalk';
import { rainbow } from 'chalk-animation';
import spawn from 'cross-spawn';
import once from 'lodash.once';
import path from 'path';

const { green, red } = chalk;

// NPM
const depsPath = path.resolve(__dirname, '../test/npm/deps');
const devDepsPath = path.resolve(__dirname, '../test/npm/dev-deps');
// Yarn
const depsYarnPath = path.resolve(__dirname, '../test/yarn/deps');
const devDepsYarnPath = path.resolve(__dirname, '../test/yarn/dev-deps');

let rb = rainbow('Preparing test...');

let clear = once(() => {
	rb.stop();
	console.log('\u001Bc'); // Clear terminal.
});

let depsChild = spawn('npm', ['install'], {
	cwd: depsPath,
	stdio: 'ignore'
});
let devDepsChild = spawn('npm', ['install'], {
	cwd: devDepsPath,
	stdio: 'ignore'
});
let depsYarnChild = spawn('yarn', [], {
	cwd: depsYarnPath,
	stdio: 'ignore'
});
let devDepsYarnChild = spawn('yarn', [], {
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
