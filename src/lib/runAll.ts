import del from 'del';
import ora from 'ora';

import { Command } from '../types';
import createProgressMessage from './createProgressMessage';
import spawnCommand from './spawnCommand';

export default async function runAll(
	command: Command,
	verbose: boolean = false
) {
	const args = command === 'npm' ? ['install'] : [];
	const spinner = ora({
		color: 'yellow'
	});

	// Uninstall
	const uninstallMsg = createProgressMessage('uninstall');

	spinner.start(uninstallMsg);
	await del('node_modules/');

	// Install
	if (verbose) {
		spinner.stop();
	} else {
		const installMsg = createProgressMessage('install');

		spinner.text = installMsg;
	}

	await spawnCommand(command, args, verbose);

	// Finish
	if (!verbose) {
		const finishMsg = createProgressMessage('done');

		spinner.succeed(finishMsg);
	}
}
