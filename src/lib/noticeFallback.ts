import chalk from 'chalk';
import { EOL } from 'os';

const { cyan, yellow } = chalk;

/**
 * Display notice message about fallbacking to `npm` when command doesn't exist.
 *
 * @export
 * @param {string} command
 */
export default function noticeFallback(command: string): void {
	const commandText = yellow(command);
	const noticeText = cyan(
		`"${commandText}" command does not exist. Fallback to npm.${EOL}`
	);

	process.stdout.write(noticeText);
}
