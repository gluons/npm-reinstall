#!/usr/bin/env node
'use strict';

const chalk = require('chalk');

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

			.boolean('verbose')
			.alias('verbose', 'v')
			.describe('verbose', 'Display more information')
			.epilog(`⭐ Star me at ${repo} 🙂`)
			.argv;

let verbose = argv.verbose;

if (argv._.length > 0) {
	if (argv.global) {
		spawner(spawner.mode.GLOBAL, argv._, verbose);
	} else if (argv.save) {
		spawner(spawner.mode.SAVE, argv._, verbose);
	} else if (argv.saveDev) {
		spawner(spawner.mode.SAVE_DEV, argv._, verbose);
	}
} else {
	spawner.all(verbose);
}
