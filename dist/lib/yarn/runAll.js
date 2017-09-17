"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const del_1 = require("del");
const ora_1 = require("ora");
const spawnYarn_1 = require("./spawnYarn");
/**
 * Run installing all packages via Yarn.
 *
 * @export
 * @param {boolean} [verbose=false] Display more information.
 * @returns Promise of run all.
 */
function runAll(verbose = false) {
    let spinner = ora_1.default({
        color: 'yellow'
    });
    spinner.start('Uninstalling all packages ...');
    return del_1.default('node_modules/') // Uninstalling.
        .then(() => {
        return spawnYarn_1.default([], verbose); // Installing
    }, err => {
        spinner.fail(chalk_1.red('Uninstallation fail.')); // Display message when uninstallation fail.
        throw err;
    })
        .then(() => {
        if (!verbose) {
            spinner.succeed(chalk_1.green('Finish reinstallation.'));
        }
        return Promise.resolve();
    });
}
exports.default = runAll;
