import spawn from 'cross-spawn';

/**
 * Spawn the command.
 *
 * @export
 * @param {('npm'| 'yarn')} command Command
 * @param {string[]} args Command arguments
 * @param {boolean} [verbose=false] Display more information
 * @returns {Promise<void>} Promise of spawn
 */
export default function spawnCommand(
	command: 'npm' | 'yarn',
	args: string[],
	verbose: boolean = false
): Promise<void> {
	// Verbose only NPM
	if (command.toLowerCase() === 'npm') {
		if (verbose) {
			args.push('--verbose');
		} else {
			args.push('--silent');
		}
	}

	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			stdio: verbose ? 'inherit' : 'pipe'
		});

		child.on('error', (err: unknown) => {
			reject(err);
		});
		child.on('close', () => {
			resolve();
		});
	});
}
