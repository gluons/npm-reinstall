import chalk from 'chalk';

import { Mode } from '../types';

const { cyan, green, red } = chalk;

const typeTexts = Object.freeze<Record<Mode, string>>({
	GLOBAL: 'globally',
	SAVE: 'dependencies',
	SAVE_DEV: 'devDependencies'
});

export type ProgressType = 'install' | 'uninstall' | 'done' | 'fail';

/**
 * Create progress message.
 *
 * @export
 * @param {(Extract<ProgressType, 'done' | 'fail'>)} progress Progess
 * @returns {string}
 */
function createProgressMessage(
	progress: Extract<ProgressType, 'done' | 'fail'>
): string;
/**
 * Create progress message.
 *
 * @param {(Exclude<ProgressType, 'done' | 'fail'>)} progress Progess
 * @param {Mode} mode Reinstallation mode
 * @param {string[]} [packages] Packages name
 * @returns {string}
 */
function createProgressMessage(
	progress: Exclude<ProgressType, 'done' | 'fail'>,
	mode?: Mode,
	packages?: string[]
): string;
function createProgressMessage(
	progress: ProgressType,
	mode?: Mode,
	packages?: string[]
): string {
	if (progress === 'done') {
		return green('Finish reinstallation.');
	}
	if (progress === 'fail') {
		return red('Reinstallation fail.');
	}

	// Is for all packages?
	const isForAll =
		!mode ||
		!packages ||
		(Array.isArray(packages) && packages.length === 0);

	const progressMsg = progress === 'install' ? 'Installing' : 'Uninstalling';
	const packagesStr = isForAll
		? 'all packages'
		: cyan.bold(packages.join(' '));
	const prep = progress === 'install' ? 'as' : 'from';
	const type = typeTexts[mode];

	const msgs = [progressMsg, packagesStr];

	if (!isForAll) {
		msgs.push(prep);
		msgs.push(type);
	}

	msgs.push('...');

	return msgs.join(' ');
}

export default createProgressMessage;
