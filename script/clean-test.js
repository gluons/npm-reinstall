'use strict';

const chalk = require('chalk');
const del = require('del');
const path = require('path');

const depsNodeModulesPath = path.resolve(__dirname, '../test/deps/node_modules');
const devDepsNodeModulesPath = path.resolve(__dirname, '../test/dev-deps/node_modules');

console.log(chalk.cyan('Cleaning test...'));

del(depsNodeModulesPath).then(
	() => {
		console.log(chalk.green('Clean dependencies succeed.'));
	},
	() => {
		console.log(chalk.red('Clean dependencies fail.'));
	}
);

del(devDepsNodeModulesPath).then(
	() => {
		console.log(chalk.green('Clean devDependencies succeed.'));
	},
	() => {
		console.log(chalk.red('Clean devDependencies fail.'));
	}
);
