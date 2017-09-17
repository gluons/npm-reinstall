"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = require("cross-spawn");
/**
 * Spawn the command.
 *
 * @export
 * @param {string} command Command.
 * @param {string[]} args Command arguments.
 * @param {boolean} [verbose=false] Display more information.
 * @returns Promise of spawn.
 */
function spawnCommand(command, args, verbose = false) {
    // Verbose only NPM
    if (command.toLowerCase() === 'npm') {
        if (verbose) {
            args.push('--verbose');
        }
        else {
            args.push('--silent');
        }
    }
    return new Promise((resolve, reject) => {
        let child = cross_spawn_1.default(command, args);
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
exports.default = spawnCommand;
