'use strict';

const chalk = require('chalk');
const spawn = require('cross-spawn');
const path = require('path');

const depsPath = path.resolve(__dirname, '../test/deps');
const devDepsPath = path.resolve(__dirname, '../test/dev-deps');

console.log(chalk.cyan('Preparing test...'));

let depsChild = spawn('npm', ['install'], {
	cwd: depsPath,
	stdio: 'ignore'
});

let devDepsChild = spawn('npm', ['install'], {
	cwd: devDepsPath,
	stdio: 'ignore'
});

depsChild.on('close', code => {
	if (code === 0) {
		console.log(chalk.green('Prepare dependencies succeed.'));
	} else {
		console.log(chalk.red('Prepare dependencies fail.'));
	}
});

devDepsChild.on('close', code => {
	if (code === 0) {
		console.log(chalk.green('Prepare devDependencies succeed.'));
	} else {
		console.log(chalk.red('Prepare devDependencies fail.'));
	}
});
