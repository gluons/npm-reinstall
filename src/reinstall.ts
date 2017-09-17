import * as caniuseYarn from '@danielbayerlein/caniuse-yarn';
import { red } from 'chalk';
import * as hasYarn from 'has-yarn';
import * as yargs from 'yargs';

import MODE from './lib/mode';
import { NPMRun, NPMRunAll } from './lib/npm';
import { YarnRun, YarnRunAll } from './lib/yarn';

const canIUseYarn: boolean = caniuseYarn();

/**
 * Run reinstall.
 *
 * @export
 * @param {yargs.Arguments} argv Yargs' argv.
 */
export default function reinstall(argv: yargs.Arguments) {
	let yarnExists: boolean = hasYarn();
	let verbose: boolean = argv.verbose;
	let forceYarn: boolean = argv.yarn;

	let runAll: typeof NPMRunAll | typeof YarnRunAll;
	let run: typeof NPMRun | typeof YarnRun;
	if (forceYarn) {
		runAll = YarnRunAll;
		run = YarnRun;
	} else {
		runAll = (canIUseYarn && yarnExists) ? YarnRunAll : NPMRunAll;

		// Only use NPM on global when it isn't forced to use Yarn.
		if (argv.global) {
			run = NPMRun;
		} else {
			run = (canIUseYarn && yarnExists) ? YarnRun : NPMRun;
		}
	}

	let errCatch = (err: Error) => {
		let errString: string = err.stack ? err.stack : err.toString();
		console.error(red(errString));
	};

	if (argv._.length > 0) {
		if (argv.global) {
			run(MODE.GLOBAL, argv._, verbose)
				.catch(errCatch);
		} else if (argv.save) {
			run(MODE.SAVE, argv._, verbose)
				.catch(errCatch);
		} else if (argv.saveDev) {
			run(MODE.SAVE_DEV, argv._, verbose)
				.catch(errCatch);
		}
	} else {
		runAll(verbose)
			.catch(errCatch);
	}
}
