"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mode_1 = require("./mode");
/**
 * Create installation arguments.
 *
 * @export
 * @param {string} command Command.
 * @param {string} mode Installation mode.
 * @param {string[]} packages Package names.
 * @returns Arguments.
 */
function createInstallArgs(command, mode, packages) {
    let args = [];
    if (command.toLowerCase() === 'npm') {
        args.push('install');
        switch (mode) {
            case mode_1.default.GLOBAL:
                args.push('-g');
                break;
            case mode_1.default.SAVE:
                args.push('-S');
                break;
            case mode_1.default.SAVE_DEV:
                args.push('-D');
                break;
        }
    }
    else {
        args.push('add');
        switch (mode) {
            case mode_1.default.GLOBAL:
                args.unshift('global');
                break;
            case mode_1.default.SAVE_DEV:
                args.push('-D');
                break;
        }
    }
    args = args.concat(packages);
    return args;
}
exports.createInstallArgs = createInstallArgs;
/**
 * Create uninstallation arguments.
 *
 * @export
 * @param {string} command Command.
 * @param {string} mode Uninstallation mode.
 * @param {string[]} packages Package names.
 * @returns Arguments.
 */
function createUninstallArgs(command, mode, packages) {
    let args = [];
    if (command.toLowerCase() === 'npm') {
        args.push('uninstall');
        switch (mode) {
            case mode_1.default.GLOBAL:
                args.push('-g');
                break;
            case mode_1.default.SAVE:
                args.push('-S');
                break;
            case mode_1.default.SAVE_DEV:
                args.push('-D');
                break;
        }
    }
    else {
        args.push('remove');
        if (mode === mode_1.default.GLOBAL) {
            args.unshift('global');
        }
    }
    args = args.concat(packages);
    return args;
}
exports.createUninstallArgs = createUninstallArgs;
