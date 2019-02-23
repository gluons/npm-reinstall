import MODE, { InstallMode } from './mode';

/**
 * Create installation arguments.
 *
 * @export
 * @param {('npm'| 'yarn')} command Command
 * @param {InstallMode} mode Installation mode
 * @param {string[]} packages Packages name
 * @returns {string[]} Installation arguments
 */
export function createInstallArgs(
	command: 'npm' | 'yarn',
	mode: InstallMode,
	packages: string[]
): string[] {
	let args: string[] = [];

	if (command.toLowerCase() === 'npm') {
		args.push('install');

		switch (mode) {
			case MODE.GLOBAL:
				args.push('-g');
				break;
			case MODE.SAVE:
				args.push('-S');
				break;
			case MODE.SAVE_DEV:
				args.push('-D');
				break;
		}
	} else {
		args.push('add');

		switch (mode) {
			case MODE.GLOBAL:
				args.unshift('global');
				break;
			case MODE.SAVE_DEV:
				args.push('-D');
				break;
		}
	}

	args = args.concat(packages);

	return args;
}

/**
 * Create uninstallation arguments.
 *
 * @export
 * @param {('npm'| 'yarn')} command Command
 * @param {InstallMode} mode Uninstallation mode
 * @param {string[]} packages Packages name
 * @returns {string[]} Uninstallation arguments
 */
export function createUninstallArgs(
	command: 'npm'| 'yarn',
	mode: InstallMode,
	packages: string[]
): string[] {
	let args: string[] = [];

	if (command.toLowerCase() === 'npm') {
		args.push('uninstall');

		switch (mode) {
			case MODE.GLOBAL:
				args.push('-g');
				break;
			case MODE.SAVE:
				args.push('-S');
				break;
			case MODE.SAVE_DEV:
				args.push('-D');
				break;
		}
	} else {
		args.push('remove');

		if (mode === MODE.GLOBAL) {
			args.unshift('global');
		}
	}

	args = args.concat(packages);

	return args;
}
