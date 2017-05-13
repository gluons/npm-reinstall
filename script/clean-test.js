'use strict';

const chalk = require('chalk');
const del = require('del');
const path = require('path');

const depsNodeModulesPath = path.resolve(__dirname, '../test/deps/node_modules');
const devDepsNodeModulesPath = path.resolve(__dirname, '../test/dev-deps/node_modules');
const depsYarnNodeModulesPath = path.resolve(__dirname, '../test/deps-yarn/node_modules');
const devDepsYarnNodeModulesPath = path.resolve(__dirname, '../test/dev-deps-yarn/node_modules');

console.log(chalk.cyan('Cleaning test...'));

del(depsNodeModulesPath).then(
	() => {
		console.log(chalk.green('Clean dependencies for NPM succeed.'));
	},
	() => {
		console.log(chalk.red('Clean dependencies for NPM fail.'));
	}
);
del(devDepsNodeModulesPath).then(
	() => {
		console.log(chalk.green('Clean devDependencies for NPM succeed.'));
	},
	() => {
		console.log(chalk.red('Clean devDependencies for NPM fail.'));
	}
);
del(depsYarnNodeModulesPath).then(
	() => {
		console.log(chalk.green('Clean dependencies for Yarn succeed.'));
	},
	() => {
		console.log(chalk.red('Clean dependencies for Yarn fail.'));
	}
);
del(devDepsYarnNodeModulesPath).then(
	() => {
		console.log(chalk.green('Clean devDependencies for Yarn succeed.'));
	},
	() => {
		console.log(chalk.red('Clean devDependencies for Yarn fail.'));
	}
);
