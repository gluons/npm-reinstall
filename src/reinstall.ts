import caniuseYarn from '@danielbayerlein/caniuse-yarn';
import caniusePNPM from 'caniuse-pnpm';
import chalk from 'chalk';
import hasPNPM from 'has-pnpm';
import hasYarn from 'has-yarn';
import { EOL } from 'os';
import { Arguments } from 'yargs';

import createProgressMessage from './lib/createProgressMessage';
import noticeFallback from './lib/noticeFallback';
import run from './lib/run';
import runAll from './lib/runAll';
import { Command, Mode } from './types';

const { red } = chalk;

const canIUseYarn = caniuseYarn();
const canIUsePNPM = caniusePNPM();

interface Argv {
	global: boolean;
	save: boolean;
	'save-dev': boolean;

	yarn: boolean;
	npm: boolean;
	pnpm: boolean;

	verbose: boolean;
}

/**
 * Reinstall packages.
 *
 * @export
 * @param {Arguments<Argv>} argv Yargs' `argv`
 */
export default async function reinstall(argv: Arguments<Argv>) {
	const yarnExists = hasYarn();
	const pnpmExists = hasPNPM();

	const global = argv.global;
	const save = argv.save;
	const saveDev = argv['save-dev'];

	const forceYarn = argv.yarn;
	const forceNPM = argv.npm;
	const forcePNPM = argv.pnpm;

	const verbose = argv.verbose;

	let command: Command = 'npm';

	if (!global) {
		if (yarnExists) {
			command = 'yarn';
		} else if (pnpmExists) {
			command = 'pnpm';
		}
	}

	// Force
	if (forceNPM) {
		command = 'npm';
	} else if (forceYarn) {
		command = 'yarn';
	} else if (forcePNPM) {
		command = 'pnpm';
	}

	// Checking yarn command
	if (command === 'yarn' && !canIUseYarn) {
		command = 'npm';

		noticeFallback('yarn');
	}

	// Checking pnpm command
	if (command === 'pnpm' && !canIUsePNPM) {
		command = 'npm';

		noticeFallback('pnpm');
	}

	try {
		if ((global || save || saveDev) && argv._.length > 0) {
			const packages = argv._; // Name of packages
			const mode: Mode = global ? 'GLOBAL' : save ? 'SAVE' : 'SAVE_DEV';

			await run(command, mode, packages, verbose);
		} else {
			await runAll(command, verbose);
		}
	} catch (e) {
		const err = e as Error;
		const errMsg = red(`Error: ${err.stack ? err.stack : err.toString()}`);

		process.stderr.write(`${createProgressMessage('fail')}${EOL}`);
		process.stderr.write(`${errMsg}${EOL}`);
	}
}
