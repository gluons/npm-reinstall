#!/usr/bin/env node

const argv = require('yargs')
			.usage('Usage: reinstall [options] <package> ...')
			.help()
			.alias('help', 'h')
			.version()
			.alias('version', 'v')
			.boolean('global')
			.alias('global', 'g')
			.describe('global', 'Reinstall global package')
			.boolean('save')
			.alias('save', 'S')
			.describe('save', 'Reinstall package in dependencies')
			.boolean('save-dev')
			.alias('save-dev', 'D')
			.describe('save-dev', 'Reinstall package in devDependencies')
			.argv;

const spawner = require('./lib/spawner');

if (argv.global) {
	spawner(spawner.mode.GLOBAL, argv._);
} else if (argv.save) {
	spawner(spawner.mode.SAVE, argv._);
} else if (argv.saveDev) {
	spawner(spawner.mode.SAVE_DEV, argv._);
}
