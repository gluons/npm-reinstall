"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const del_1 = require("del");
const ora_1 = require("ora");
const spawnNPM_1 = require("./spawnNPM");
/**
 * Run installing all packages via NPM.
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
        /*
         * If `verbose` is enable, no need to display installation message.
         */
        if (verbose) {
            spinner.stop();
        }
        else {
            spinner.text = 'Installing all packages ...';
        }
        return spawnNPM_1.default(['install'], verbose); // Installing
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
