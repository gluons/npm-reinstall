"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const ora_1 = require("ora");
const createArgs_1 = require("../createArgs");
const mode_1 = require("../mode");
const spawnNPM_1 = require("./spawnNPM");
/**
 * Run installing some packages via NPM.
 *
 * @export
 * @param {string} mode Installation mode.
 * @param {string[]} packages Package names.
 * @param {boolean} [verbose=false] Display more information.
 * @returns
 */
function run(mode, packages, verbose = false) {
    let spinner = ora_1.default({
        color: 'yellow'
    });
    let packagesAsString = chalk_1.default.cyan.bold(packages.join(' '));
    let installArgs = createArgs_1.createInstallArgs('npm', mode, packages);
    let uninstallArgs = createArgs_1.createUninstallArgs('npm', mode, packages);
    let endingInfo = '';
    switch (mode) {
        case mode_1.default.GLOBAL:
            endingInfo = 'globally';
            break;
        case mode_1.default.SAVE:
            endingInfo = 'dependencies';
            break;
        case mode_1.default.SAVE_DEV:
            endingInfo = 'devDependencies';
            break;
    }
    if (!verbose) {
        let prefix = (mode === mode_1.default.SAVE) || (mode === mode_1.default.SAVE_DEV) ? 'from ' : '';
        spinner.start(`Uninstalling ${packagesAsString} ${prefix}${endingInfo} ...`);
    }
    return spawnNPM_1.default(uninstallArgs, verbose)
        .then(() => {
        if (!verbose) {
            let prefix = (mode === mode_1.default.SAVE) || (mode === mode_1.default.SAVE_DEV) ? 'as ' : '';
            spinner.text = `Installing ${packagesAsString} ${prefix}${endingInfo} ...`;
        }
        return spawnNPM_1.default(installArgs, verbose);
    })
        .then(() => {
        if (!verbose) {
            spinner.succeed(chalk_1.default.green('Finish reinstallation.'));
        }
        return Promise.resolve();
    });
}
exports.default = run;
