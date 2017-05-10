'use strict';

const chalk = require('chalk');
const rimraf = require('rimraf');
const path = require('path');

const depsNodeModulesPath = path.resolve(__dirname, '../test/deps/node_modules');
const devDepsNodeModulesPath = path.resolve(__dirname, '../test/dev-deps/node_modules');

console.log(chalk.cyan('Cleaning test...'));

rimraf(depsNodeModulesPath, err => {
	if (err) {
		console.log(chalk.red('Clean dependencies fail.'));
	} else {
		console.log(chalk.green('Clean dependencies succeed.'));
	}
});

rimraf(devDepsNodeModulesPath, err => {
	if (err) {
		console.log(chalk.red('Clean devDependencies fail.'));
	} else {
		console.log(chalk.green('Clean devDependencies succeed.'));
	}
});
