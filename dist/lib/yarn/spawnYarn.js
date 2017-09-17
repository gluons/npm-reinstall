"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spawnCommand_1 = require("../spawnCommand");
/**
 * Spawn Yarn command.
 *
 * @export
 * @param {string[]} args Command arguments.
 * @param {boolean} [verbose=false] Display more information.
 * @returns Promise of spawn.
 */
function spawnYarn(args, verbose = false) {
    return spawnCommand_1.default('yarn', args, verbose);
}
exports.default = spawnYarn;
