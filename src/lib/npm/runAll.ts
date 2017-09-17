import { green, red } from 'chalk';
import * as del from 'del';
import * as ora from 'ora';

import spawnNPM from './spawnNPM';

/**
 * Run installing all packages via NPM.
 *
 * @export
 * @param {boolean} [verbose=false] Display more information.
 * @returns Promise of run all.
 */
export default function runAll(verbose = false) {
	let spinner = ora({
		color: 'yellow'
	});

	spinner.start('Uninstalling all packages ...');

	return del('node_modules/') // Uninstalling.
		.then(
			() => {
				/*
				 * If `verbose` is enable, no need to display installation message.
				 */
				if (verbose) {
					spinner.stop();
				} else {
					spinner.text = 'Installing all packages ...';
				}
				return spawnNPM(['install'], verbose); // Installing
			},
			err => {
				spinner.fail(red('Uninstallation fail.')); // Display message when uninstallation fail.
				throw err;
			}
		)
		.then(() => {
			if (!verbose) {
				spinner.succeed(green('Finish reinstallation.'));
			}
			return Promise.resolve();
		});
}
