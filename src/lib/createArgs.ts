import { Command, Mode } from '../types';

/**
 * Create installation arguments.
 *
 * @export
 * @param {Command} command Command
 * @param {Mode} mode Installation mode
 * @param {string[]} packages Packages name
 * @returns {string[]} Installation arguments
 */
export function createInstallArgs(
	command: Command,
	mode: Mode,
	packages: string[]
): string[] {
	let args: string[] = [];

	if (command === 'npm') {
		args.push('install');

		switch (mode) {
			case 'GLOBAL':
				args.push('-g');
				break;
			case 'SAVE':
				args.push('-S');
				break;
			case 'SAVE_DEV':
				args.push('-D');
				break;
		}
	} else if (command === 'yarn') {
		args.push('add');

		switch (mode) {
			case 'GLOBAL':
				args.unshift('global');
				break;
			case 'SAVE_DEV':
				args.push('-D');
				break;
		}
	} else {
		args.push('install');

		switch (mode) {
			case 'SAVE':
				args.push('-P');
				break;
			case 'SAVE_DEV':
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
 * @param {Command} command Command
 * @param {Mode} mode Uninstallation mode
 * @param {string[]} packages Packages name
 * @returns {string[]} Uninstallation arguments
 */
export function createUninstallArgs(
	command: Command,
	mode: Mode,
	packages: string[]
): string[] {
	let args: string[] = [];

	if (command === 'npm') {
		args.push('uninstall');

		switch (mode) {
			case 'GLOBAL':
				args.push('-g');
				break;
			case 'SAVE':
				args.push('-S');
				break;
			case 'SAVE_DEV':
				args.push('-D');
				break;
		}
	} else if (command === 'yarn') {
		args.push('remove');

		if (mode === 'GLOBAL') {
			args.unshift('global');
		}
	} else {
		args.push('uninstall');
	}

	args = args.concat(packages);

	return args;
}
