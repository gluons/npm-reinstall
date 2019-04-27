#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';

import notifier from './lib/notifier';
import reinstall from './reinstall';

const { cyan, green, yellow } = chalk;

const COMMAND = green('reinstall');
const repo = 'https://github.com/gluons/npm-reinstall';

notifier();

function createMutuallyExclusiveError(...options: string[]): Error {
	if (options.length <= 1) {
		return null;
	}

	const coloredOptions = options.map(option => yellow(option));
	const lastOption = coloredOptions.pop();
	const optionsStr = `${coloredOptions.join(', ')} and ${lastOption}`;
	const errMsg = `ℹ️ Options ${optionsStr} are mutually exclusive`;

	return new Error(errMsg);
}

const argv = yargs
	.usage(`Usage: ${COMMAND} [options] ${cyan('<package> ...')}`)
	.help()
	.alias('help', 'h')
	.version()
	.alias('version', 'V')
	.example(
		COMMAND,
		'Reinstall all local packages in current working directory.'
	)

	// Global
	.boolean('global')
	.group('global', 'Dependency Options:')
	.alias('global', 'g')
	.describe('global', 'Reinstall global package')
	.example(
		`${COMMAND} --global ${cyan('vue-cli')}`,
		`Reinstall ${cyan('vue-cli')} globally`
	)
	// Save
	.boolean('save')
	.group('save', 'Dependency Options:')
	.alias('save', 'S')
	.describe('save', 'Reinstall package in dependencies')
	.example(
		`${COMMAND} --save ${cyan('vue')}`,
		`Reinstall ${cyan('vue')} as dependencies`
	)
	// Save Dev
	.boolean('save-dev')
	.group('save-dev', 'Dependency Options:')
	.alias('save-dev', 'D')
	.describe('save-dev', 'Reinstall package in devDependencies')
	.example(
		`${COMMAND} --save-dev ${cyan('vue-loader')}`,
		`Reinstall ${cyan('vue-loader')} as devDependencies`
	)

	.boolean('npm')
	.alias('npm', 'n')
	.describe('npm', 'Force to use npm')

	.boolean('yarn')
	.alias('yarn', 'y')
	.describe('yarn', 'Force to use Yarn')

	.boolean('pnpm')
	.alias('pnpm', 'p')
	.describe('pnpm', 'Force to use pnpm')

	.boolean('verbose')
	.alias('verbose', 'v')
	.describe('verbose', 'Display more information')
	.epilog(`⭐ Star me at ${repo} 😃`)

	.check(parsedArgv => {
		const global = parsedArgv.global;
		const save = parsedArgv.save;
		const saveDev = parsedArgv['save-dev'];
		const npm: boolean = parsedArgv.npm;
		const yarn: boolean = parsedArgv.yarn;

		if (global && save) {
			throw createMutuallyExclusiveError('global', 'save');
		}
		if (global && saveDev) {
			throw createMutuallyExclusiveError('global', 'save-dev');
		}
		if (save && saveDev) {
			throw createMutuallyExclusiveError('save', 'save-dev');
		}
		if (global && save && saveDev) {
			throw createMutuallyExclusiveError('global', 'save', 'save-dev');
		}
		if (npm && yarn) {
			throw createMutuallyExclusiveError('npm', 'yarn');
		}

		return true;
	}).argv;

reinstall(argv);
