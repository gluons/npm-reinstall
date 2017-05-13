#!/usr/bin/env node
'use strict';

const caniuseYarn = require('@danielbayerlein/caniuse-yarn');
const chalk = require('chalk');
const hasYarn = require('has-yarn');

const MODE = require('./lib/mode');
const spawner = require('./lib/spawner');
const notifier = require('./lib/notifier');

const repo = 'https://github.com/gluons/npm-reinstall';

notifier(); // Update notifier.

let green = chalk.green;
let cyan = chalk.cyan;
let commandText = green('reinstall');

const argv = require('yargs')
			.usage(`Usage: ${commandText} [options] ${cyan('<package> ...')}`)
			.help()
			.alias('help', 'h')
			.version()
			.alias('version', 'V')
			.example(`${commandText}`, 'Reinstall all local packages in current working directory.')

			// Global
			.boolean('global')
			.group('global', 'Dependency Options:')
			.alias('global', 'g')
			.describe('global', 'Reinstall global package')
			.example(`${commandText} --global ${cyan('vue-cli')}`, `Reinstall ${cyan('vue-cli')} globally`)
			// Save
			.boolean('save')
			.group('save', 'Dependency Options:')
			.alias('save', 'S')
			.describe('save', 'Reinstall package in dependencies')
			.example(`${commandText} --save ${cyan('vue')}`, `Reinstall ${cyan('vue')} as dependencies`)
			// Save Dev
			.boolean('save-dev')
			.group('save-dev', 'Dependency Options:')
			.alias('save-dev', 'D')
			.describe('save-dev', 'Reinstall package in devDependencies')
			.example(`${commandText} --save-dev ${cyan('vue-loader')}`, `Reinstall ${cyan('vue-loader')} as devDependencies`)

			.boolean('yarn')
			.alias('yarn', 'y')
			.describe('yarn', 'Force to use Yarn')
			.boolean('verbose')
			.alias('verbose', 'v')
			.describe('verbose', 'Display more information')
			.epilog(`⭐ Star me at ${repo} 😃`)
			.argv;

let verbose = argv.verbose;
let forceUseYarn = argv.yarn;

let npmSpawner = spawner.npmSpawner;
let yarnSpawner = spawner.yarnSpawner;
let spawnCaller = ((caniuseYarn() && hasYarn()) || forceUseYarn) ? yarnSpawner : npmSpawner;

if (argv._.length > 0) {
	if (argv.global) {
		spawnCaller(MODE.GLOBAL, argv._, verbose);
	} else if (argv.save) {
		spawnCaller(MODE.SAVE, argv._, verbose);
	} else if (argv.saveDev) {
		spawnCaller(MODE.SAVE_DEV, argv._, verbose);
	}
} else {
	spawnCaller.all(verbose);
}
