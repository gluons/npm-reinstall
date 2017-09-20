import spawnCommand from '../spawnCommand';

/**
 * Spawn NPM command.
 *
 * @export
 * @param {string[]} args Command arguments.
 * @param {boolean} [verbose=false] Display more information.
 * @returns Promise of spawn.
 */
export default function spawnNPM(args: string[], verbose = false) {
	return spawnCommand('npm', args, verbose);
}
