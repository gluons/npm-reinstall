import * as caniuseYarn from '@danielbayerlein/caniuse-yarn';
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
	let forceNPM: boolean = argv.npm;

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
		// Use NPM on global when it isn't forced to use Yarn.
		if (argv.global) {
			run = NPMRun;
		} else {
			run = canIUseYarn && yarnExists ? YarnRun : NPMRun;
		}
	}

	if (argv._.length > 0) {
		if (argv.global) {
			run(MODE.GLOBAL, argv._, verbose);
		} else if (argv.save) {
			run(MODE.SAVE, argv._, verbose);
		} else if (argv.saveDev) {
			run(MODE.SAVE_DEV, argv._, verbose);
		}
	} else {
		runAll(verbose);
	}
}
