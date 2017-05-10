#!/usr/bin/env node

const chalk = require('chalk');

const repo = 'https://github.com/gluons/npm-reinstall';

const argv = require('yargs')
			.usage(`Usage: ${chalk.green('reinstall')} [options] ${chalk.cyan('<package> ...')}`)
			.help()
			.alias('help', 'h')
			.version()
			.alias('version', 'V')
			.boolean('global')
			.group('global', 'Dependency Options:')
			.alias('global', 'g')
			.describe('global', 'Reinstall global package')
			.boolean('save')
			.group('save', 'Dependency Options:')
			.alias('save', 'S')
			.describe('save', 'Reinstall package in dependencies')
			.boolean('save-dev')
			.group('save-dev', 'Dependency Options:')
			.alias('save-dev', 'D')
			.describe('save-dev', 'Reinstall package in devDependencies')
			.boolean('verbose')
			.alias('verbose', 'v')
			.describe('verbose', 'Display more information')
			.epilog(`⭐ Star me at ${repo} 🙂`)
			.argv;

const spawner = require('./lib/spawner');
const notifier = require('./lib/notifier');

notifier(); // Update notifier.

let verbose = argv.verbose;

if (argv.global) {
	spawner(spawner.mode.GLOBAL, argv._, verbose);
} else if (argv.save) {
	spawner(spawner.mode.SAVE, argv._, verbose);
} else if (argv.saveDev) {
	spawner(spawner.mode.SAVE_DEV, argv._, verbose);
}
