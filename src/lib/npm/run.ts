import chalk from 'chalk';
import ora from 'ora';

import { createInstallArgs, createUninstallArgs } from '../createArgs';
import MODE, { InstallMode } from '../mode';
import spawnNPM from './spawnNPM';

/**
 * Run installing some packages via NPM.
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
	const packagesAsString = chalk.cyan.bold(packages.join(' '));
	const installArgs = createInstallArgs('npm', mode, packages);
	const uninstallArgs = createUninstallArgs('npm', mode, packages);

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

	await spawnNPM(uninstallArgs, verbose);

	if (!verbose) {
		const prefix =
			mode === MODE.SAVE || mode === MODE.SAVE_DEV ? 'as ' : '';
		spinner.text = `Installing ${packagesAsString} ${prefix}${endingInfo} ...`;
	}

	await spawnNPM(installArgs, verbose);

	if (!verbose) {
		spinner.succeed(chalk.green('Finish reinstallation.'));
	}
}
