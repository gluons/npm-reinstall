import MODE from './mode';

/**
 * Create installation arguments.
 *
 * @export
 * @param {string} command Command.
 * @param {string} mode Installation mode.
 * @param {string[]} packages Package names.
 * @returns Arguments.
 */
export function createInstallArgs(command: string, mode: string, packages: string[]) {
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
 * @param {string} command Command.
 * @param {string} mode Uninstallation mode.
 * @param {string[]} packages Package names.
 * @returns Arguments.
 */
export function createUninstallArgs(command: string, mode: string, packages: string[]) {
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
