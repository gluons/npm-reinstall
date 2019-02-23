import ora from 'ora';

import { Command, Mode } from '../types';
import { createInstallArgs, createUninstallArgs } from './createArgs';
import createProgressMessage from './createProgressMessage';
import spawnCommand from './spawnCommand';

/**
 * Run reinstalling.
 *
 * @export
 * @param {Command} command Command
 * @param {Mode} mode Reinstallation mode
 * @param {string[]} packages Packages name
 * @param {boolean} [verbose=false] Display more information
 */
export default async function run(
	command: Command,
	mode: Mode,
	packages: string[],
	verbose: boolean = false
) {
	const spinner = ora({
		color: 'yellow'
	});

	const uninstallArgs = createUninstallArgs(command, mode, packages);
	const installArgs = createInstallArgs(command, mode, packages);

	// Uninstall
	if (!verbose) {
		const uninstallMsg = createProgressMessage('uninstall', mode, packages);

		spinner.start(uninstallMsg);
	}

	await spawnCommand(command, uninstallArgs, verbose);

	// Install
	if (!verbose) {
		const installMsg = createProgressMessage('install', mode, packages);

		spinner.text = installMsg;
	}

	await spawnCommand(command, installArgs, verbose);

	// Finish
	if (!verbose) {
		const finishMsg = createProgressMessage('done');

		spinner.succeed(finishMsg);
	}
}
