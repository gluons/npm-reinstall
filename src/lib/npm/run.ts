import chalk from 'chalk';
import * as del from 'del';
import * as ora from 'ora';

import { createInstallArgs, createUninstallArgs } from '../createArgs';
import MODE from '../mode';
import spawnNPM from './spawnNPM';

/**
 * Run installing some packages via NPM.
 *
 * @export
 * @param {string} mode Installation mode.
 * @param {string[]} packages Package names.
 * @param {boolean} [verbose=false] Display more information.
 * @returns
 */
export default function run(mode: string, packages: string[], verbose = false) {
	let spinner = ora({
		color: 'yellow'
	});
	let packagesAsString: string = chalk.cyan.bold(packages.join(' '));
	let installArgs = createInstallArgs('npm', mode, packages);
	let uninstallArgs = createUninstallArgs('npm', mode, packages);
	let endingInfo = '';

	switch (mode) {
		case MODE.GLOBAL:
			endingInfo = 'globally';
			break;
		case MODE.SAVE:
			endingInfo = 'dependencies';
			break;
		case MODE.SAVE_DEV:
			endingInfo = 'devDependencies';
			break;
	}

	if (!verbose) {
		let prefix = (mode === MODE.SAVE) || (mode === MODE.SAVE_DEV) ? 'from ' : '';
		spinner.start(`Uninstalling ${packagesAsString} ${prefix}${endingInfo} ...`);
	}

	return spawnNPM(uninstallArgs, verbose)
		.then(() => {
			if (!verbose) {
				let prefix = (mode === MODE.SAVE) || (mode === MODE.SAVE_DEV) ? 'as ' : '';
				spinner.text = `Installing ${packagesAsString} ${prefix}${endingInfo} ...`;
			}
			return spawnNPM(installArgs, verbose);
		})
		.then(() => {
			if (!verbose) {
				spinner.succeed(chalk.green('Finish reinstallation.'));
			}
			return Promise.resolve();
		});
}
