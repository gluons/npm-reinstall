import chalk from 'chalk';
import del from 'del';
import ora from 'ora';

import spawnYarn from './spawnYarn';

const { green, red } = chalk;

/**
 * Run installing all packages via Yarn.
 *
 * @export
 * @param {boolean} [verbose=false] Display more information
 * @returns Promise of run all
 */
export default async function runAll(verbose: boolean = false) {
	const spinner = ora({
		color: 'yellow'
	});

	spinner.start('Uninstalling all packages ...');

	try {
		await del('node_modules/'); // Uninstalling.

		/*
		 * If `verbose` is enable, no need to display installation message.
		 */
		if (verbose) {
			spinner.stop();
		} else {
			spinner.text = 'Installing all packages ...';
		}

		await spawnYarn([], verbose);

		!verbose && spinner.succeed(green('Finish reinstallation.'));
	} catch (err) {
		spinner.fail(red('Uninstallation fail.')); // Display message when uninstallation fail.

		throw err;
	}
}
