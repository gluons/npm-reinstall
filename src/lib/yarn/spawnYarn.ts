import spawnCommand from '../spawnCommand';

/**
 * Spawn Yarn command.
 *
 * @export
 * @param {string[]} args Command arguments
 * @param {boolean} [verbose=false] Display more information
 * @returns Promise of spawn
 */
export default function spawnYarn(args: string[], verbose: boolean = false) {
	return spawnCommand('yarn', args, verbose);
}
