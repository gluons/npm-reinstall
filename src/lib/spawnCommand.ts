import spawn from 'cross-spawn';

/**
 * Spawn the command.
 *
 * @export
 * @param {string} command Command.
 * @param {string[]} args Command arguments.
 * @param {boolean} [verbose=false] Display more information.
 * @returns Promise of spawn.
 */
export default function spawnCommand(command: string, args: string[], verbose = false) {
	// Verbose only NPM
	if (command.toLowerCase() === 'npm') {
		if (verbose) {
			args.push('--verbose');
		} else {
			args.push('--silent');
		}
	}

	return new Promise((resolve, reject) => {
		let child = spawn(command, args);

		if (verbose) {
			child.stdout.pipe(process.stdout);
			child.stderr.pipe(process.stderr);
		}

		child.on('error', err => {
			reject(err);
		});
		child.on('close', () => {
			resolve();
		});
	});
}
