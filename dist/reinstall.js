"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const caniuse_yarn_1 = require("@danielbayerlein/caniuse-yarn");
const has_yarn_1 = require("has-yarn");
const mode_1 = require("./lib/mode");
const npm_1 = require("./lib/npm");
const yarn_1 = require("./lib/yarn");
const canIUseYarn = caniuse_yarn_1.default();
/**
 * Run reinstall.
 *
 * @export
 * @param {yargs.Arguments} argv Yargs' argv.
 */
function reinstall(argv) {
    let yarnExists = has_yarn_1.default();
    let verbose = argv.verbose;
    let forceYarn = argv.yarn;
    let forceNPM = argv.npm;
    let runAll;
    let run;
    if (forceYarn) {
        runAll = yarn_1.YarnRunAll;
        run = yarn_1.YarnRun;
    }
    else if (forceNPM) {
        runAll = npm_1.NPMRunAll;
        run = npm_1.NPMRun;
    }
    else {
        runAll = canIUseYarn && yarnExists ? yarn_1.YarnRunAll : npm_1.NPMRunAll;
        // Use NPM on global when it isn't forced to use Yarn.
        if (argv.global) {
            run = npm_1.NPMRun;
        }
        else {
            run = canIUseYarn && yarnExists ? yarn_1.YarnRun : npm_1.NPMRun;
        }
    }
    if (argv._.length > 0) {
        if (argv.global) {
            run(mode_1.default.GLOBAL, argv._, verbose);
        }
        else if (argv.save) {
            run(mode_1.default.SAVE, argv._, verbose);
        }
        else if (argv.saveDev) {
            run(mode_1.default.SAVE_DEV, argv._, verbose);
        }
    }
    else {
        runAll(verbose);
    }
}
exports.default = reinstall;
