'use strict';

const chalk = require('chalk');
const del = require('del');
const nvl = require('nvl');
const ora = require('ora');

const MODE = require('../mode');
const spawnNPM = require('./spawnNPM');

/**
 * Spawn the NPM reinstallation command of all packages.
 * @param  {Boolean} [verbose=false] Display more information.
 * @return {Promise}                 Promise of spawn all.
 */
function spawnerAll(verbose) {
	verbose = nvl(verbose, false);
	let spinner = ora({
		color: 'yellow'
	});

	spinner.text = 'Uninstalling all packages ...';
	spinner.start();

	let uninstallPromise = del('node_modules/').catch(err => {
		spinner.fail(chalk.red('Uninstall fail.'));
		throw err;
	});

	return uninstallPromise
			.then(() => {
				if (verbose) {
					spinner.stop();
				} else {
					spinner.text = 'Installing all packages ...';
				}
				return spawnNPM(['install'], verbose);
			})
			.then(() => {
				if (!verbose) {
					spinner.succeed(chalk.green('Finish reinstallation.'));
				}
				return Promise.resolve();
			})
			.catch(err => {
				process.stderr.write(err.toString());
				return err;
			});
}

/**
 * Spawn the NPM reinstallation command by mode.
 * @param  {String}   mode            Installation mode.
 * @param  {String[]} packages        List of package name.
 * @param  {Boolean}  [verbose=false] Display more information.
 * @return {Promise}                  Promise of spawn.
 */
function spawner(mode, packages, verbose) {
	verbose = nvl(verbose, false);
	let spinner = ora({
		color: 'yellow'
	});
	let packagesAsString = chalk.cyan.bold(packages.join(' '));
	let installArgs = ['install'];
	let uninstallArgs = ['uninstall'];
	let endingInfo = '';

	switch (mode) {
		case MODE.GLOBAL:
			installArgs.push('-g');
			uninstallArgs.push('-g');

			endingInfo = 'globally';
			break;
		case MODE.SAVE:
			installArgs.push('-S');
			uninstallArgs.push('-S');

			endingInfo = 'dependencies';
			break;
		case MODE.SAVE_DEV:
			installArgs.push('-D');
			uninstallArgs.push('-D');

			endingInfo = 'devDependencies';
			break;
	}

	installArgs = installArgs.concat(packages);
	uninstallArgs = uninstallArgs.concat(packages);

	if (!verbose) {
		let prefix = (mode === MODE.SAVE) || (mode === MODE.SAVE_DEV) ? 'from ' : '';

		spinner.text = `Uninstalling ${packagesAsString} ${prefix}${endingInfo} ...`;
		spinner.start();
	}

	return spawnNPM(uninstallArgs, verbose)
			.then(() => {
				if (!verbose) {
					let prefix = (mode === MODE.SAVE) || (mode === MODE.SAVE_DEV) ? 'as ' : '';
					spinner.text = `Installing ${packagesAsString} ${prefix}${endingInfo} ...`;
				}
				return spawnNPM(installArgs, verbose);
			})
			.then(() => {
				if (!verbose) {
					spinner.succeed(chalk.green('Finish reinstallation.'));
				}
				return Promise.resolve();
			})
			.catch(err => {
				process.stderr.write(err.toString());
				return err;
			});
}

module.exports = spawner;
module.exports.all = spawnerAll;
