import { green, red } from 'chalk';
import del from 'del';
import ora from 'ora';

import spawnYarn from './spawnYarn';

/**
 * Run installing all packages via Yarn.
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
				return spawnYarn([], verbose); // Installing
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
