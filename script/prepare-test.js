'use strict';

const chalk = require('chalk');
const spawn = require('cross-spawn');
const path = require('path');

const depsPath = path.resolve(__dirname, '../test/deps');
const devDepsPath = path.resolve(__dirname, '../test/dev-deps');
const depsYarnPath = path.resolve(__dirname, '../test/deps-yarn');
const devDepsYarnPath = path.resolve(__dirname, '../test/dev-deps-yarn');

console.log(chalk.cyan('Preparing test...'));

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
	if (code === 0) {
		console.log(chalk.green('Prepare dependencies for NPM succeed.'));
	} else {
		console.log(chalk.red('Prepare dependencies for NPM fail.'));
	}
});
devDepsChild.on('close', code => {
	if (code === 0) {
		console.log(chalk.green('Prepare devDependencies for NPM succeed.'));
	} else {
		console.log(chalk.red('Prepare devDependencies for NPM fail.'));
	}
});
depsYarnChild.on('close', code => {
	if (code === 0) {
		console.log(chalk.green('Prepare dependencies for Yarn succeed.'));
	} else {
		console.log(chalk.red('Prepare dependencies for Yarn fail.'));
	}
});
devDepsYarnChild.on('close', code => {
	if (code === 0) {
		console.log(chalk.green('Prepare devDependencies for Yarn succeed.'));
	} else {
		console.log(chalk.red('Prepare devDependencies for Yarn fail.'));
	}
});
