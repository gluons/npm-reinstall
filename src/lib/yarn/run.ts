import chalk from 'chalk';
import ora from 'ora';

import { createInstallArgs, createUninstallArgs } from '../createArgs';
import MODE, { InstallMode } from '../mode';
import spawnYarn from './spawnYarn';

/**
 * Run installing some packages via Yarn.
 *
 * @export
 * @param {string} mode Installation mode
 * @param {string[]} packages Package names
 * @param {boolean} [verbose=false] Display more information
 * @returns
 */
export default async function run(
	mode: InstallMode,
	packages: string[],
	verbose: boolean = false
) {
	const spinner = ora({
		color: 'yellow'
	});
	const packagesAsString: string = chalk.cyan.bold(packages.join(' '));
	const installArgs = createInstallArgs('yarn', mode, packages);
	const uninstallArgs = createUninstallArgs('yarn', mode, packages);

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
		const prefix =
			mode === MODE.SAVE || mode === MODE.SAVE_DEV ? 'from ' : '';

		spinner.start(
			`Uninstalling ${packagesAsString} ${prefix}${endingInfo} ...`
		);
	}

	await spawnYarn(uninstallArgs, verbose);

	if (!verbose) {
		const prefix =
			mode === MODE.SAVE || mode === MODE.SAVE_DEV ? 'as ' : '';

		spinner.text = `Installing ${packagesAsString} ${prefix}${endingInfo} ...`;
	}

	await spawnYarn(installArgs, verbose);

	if (!verbose) {
		spinner.succeed(chalk.green('Finish reinstallation.'));
	}
}
