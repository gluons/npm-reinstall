import caniuseYarn from '@danielbayerlein/caniuse-yarn';
import chalk from 'chalk';
import hasYarn from 'has-yarn';
import { EOL } from 'os';
import { Arguments } from 'yargs';

import MODE from './lib/mode';
import { NPMRun, NPMRunAll } from './lib/npm';
import { YarnRun, YarnRunAll } from './lib/yarn';

const { red } = chalk;

const canIUseYarn: boolean = caniuseYarn();

/**
 * Reinstall packages.
 *
 * @export
 * @param {Arguments} argv Yargs' `argv`
 */
export default async function reinstall(argv: Arguments) {
	const yarnExists: boolean = hasYarn();
	const verbose = argv.verbose as boolean;
	const forceYarn = argv.yarn as boolean;
	const forceNPM = argv.npm as boolean;

	let runAll: typeof NPMRunAll | typeof YarnRunAll;
	let run: typeof NPMRun | typeof YarnRun;

	if (forceYarn) {
		runAll = YarnRunAll;
		run = YarnRun;
	} else if (forceNPM) {
		runAll = NPMRunAll;
		run = NPMRun;
	} else {
		runAll = canIUseYarn && yarnExists ? YarnRunAll : NPMRunAll;

		// Only use NPM on global when it isn't forced to use Yarn.
		if (argv.global) {
			run = NPMRun;
		} else {
			run = canIUseYarn && yarnExists ? YarnRun : NPMRun;
		}
	}

	try {
		if (argv._.length > 0) {
			const packages = argv._; // Name of packages

			if (argv.global) {
				await run(MODE.GLOBAL, packages, verbose);
			} else if (argv.save) {
				await run(MODE.SAVE, packages, verbose);
			} else if (argv.saveDev) {
				await run(MODE.SAVE_DEV, packages, verbose);
			}
		} else {
			await runAll(verbose);
		}
	} catch (e) {
		const err = e as Error;
		const errString = err.stack ? err.stack : err.toString();

		process.stderr.write(`${red(errString)}${EOL}`);
	}
}
