import caniuseYarn from '@danielbayerlein/caniuse-yarn';
import chalk from 'chalk';
import hasYarn from 'has-yarn';
import { EOL } from 'os';
import { Arguments } from 'yargs';

import createProgressMessage from './lib/createProgressMessage';
import run from './lib/run';
import runAll from './lib/runAll';
import { Command, Mode } from './types';

const { cyan, red, yellow } = chalk;

const canIUseYarn: boolean = caniuseYarn();

/**
 * Reinstall packages.
 *
 * @export
 * @param {Arguments} argv Yargs' `argv`
 */
export default async function reinstall(argv: Arguments) {
	const yarnExists: boolean = hasYarn();
	const global = argv.global as boolean;
	const save = argv.save as boolean;
	const saveDev = argv['save-dev'] as boolean;
	const forceYarn = argv.yarn as boolean;
	const forceNPM = argv.npm as boolean;
	const verbose = argv.verbose as boolean;

	let command: Command = 'npm';

	if (yarnExists) {
		command = 'yarn';
	}

	// Force
	if (forceNPM) {
		command = 'npm';
	} else if (forceYarn) {
		command = 'yarn';
	}

	// Checking yarn command
	if (command === 'yarn' && !canIUseYarn) {
		command = 'npm';

		process.stdout.write(
			cyan(
				`"${yellow(
					'yarn'
				)}" command does not exist. Fallback to npm.${EOL}`
			)
		);
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
