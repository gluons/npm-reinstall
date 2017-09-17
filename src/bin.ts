#!/usr/bin/env node

import { cyan, green } from 'chalk';
import * as yargs from 'yargs';

import notifier from './lib/notifier';
import reinstall from './reinstall';

const COMMAND = green('reinstall');
const repo = 'https://github.com/gluons/npm-reinstall';

const argv = yargs
	.usage(`Usage: ${COMMAND} [options] ${cyan('<package> ...')}`)
	.help()
	.alias('help', 'h')
	.version()
	.alias('version', 'V')
	.example(COMMAND, 'Reinstall all local packages in current working directory.')

	// Global
	.boolean('global')
	.group('global', 'Dependency Options:')
	.alias('global', 'g')
	.describe('global', 'Reinstall global package')
	.example(`${COMMAND} --global ${cyan('vue-cli')}`, `Reinstall ${cyan('vue-cli')} globally`)
	// Save
	.boolean('save')
	.group('save', 'Dependency Options:')
	.alias('save', 'S')
	.describe('save', 'Reinstall package in dependencies')
	.example(`${COMMAND} --save ${cyan('vue')}`, `Reinstall ${cyan('vue')} as dependencies`)
	// Save Dev
	.boolean('save-dev')
	.group('save-dev', 'Dependency Options:')
	.alias('save-dev', 'D')
	.describe('save-dev', 'Reinstall package in devDependencies')
	.example(`${COMMAND} --save-dev ${cyan('vue-loader')}`, `Reinstall ${cyan('vue-loader')} as devDependencies`)

	.boolean('yarn')
	.alias('yarn', 'y')
	.describe('yarn', 'Force to use Yarn')

	.boolean('verbose')
	.alias('verbose', 'v')
	.describe('verbose', 'Display more information')
	.epilog(`⭐ Star me at ${repo} 😃`)
	.argv;

reinstall(argv);
