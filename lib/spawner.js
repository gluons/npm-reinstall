'use strict';

const chalk = require('chalk');
const spawn = require('cross-spawn');
const nvl = require('nvl');
const ora = require('ora');
const rimraf = require('rimraf');

const MODE = {
	GLOBAL: Symbol('Global'),
	SAVE: Symbol('Save'),
	SAVE_DEV: Symbol('Save Dev')
};
Object.freeze(MODE);

/**
 * Spawn the NPM command.
 * @param  {String[]} args    Command arguments.
 * @param  {Boolean}  verbose Display more information.
 * @return {Promise}          Promise of spawn.
 */
function performSpawn(args, verbose) {
	if (verbose) {
		args.push('--verbose');
	} else {
		args.push('--silent');
	}

	return new Promise((resolve, reject) => {
		let npm = spawn('npm', args);
		if (verbose) {
			npm.stdout.pipe(process.stdout);
			npm.stderr.pipe(process.stderr);
		}
		npm.on('error', err => {
			reject(err);
		});
		npm.on('close', () => {
			resolve();
		});
	});
}

/**
 * Spawn the reinstallation command of all packages.
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
	let uninstallPromise = new Promise((resolve, reject) => {
		rimraf('node_modules/', err => {
			if (err) {
				spinner.fail(chalk.red('Uninstall fail.'));
				reject(err);
			} else {
				resolve();
			}
		});
	});

	return uninstallPromise
			.then(() => {
				if (verbose) {
					spinner.stop();
				} else {
					spinner.text = 'Installing all packages ...';
				}
				return performSpawn(['install'], verbose);
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
 * Spawn the reinstallation command by mode.
 * @param  {Symbol}   mode            Installation mode.
 * @param  {String[]} packages        List of package name.
 * @param  {Boolean}  [verbose=false] Display more information.
 * @return {Promise}                  Promise of spawn.
 */
module.exports = function spawner(mode, packages, verbose) {
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

	return performSpawn(uninstallArgs, verbose)
			.then(() => {
				if (!verbose) {
					let prefix = (mode === MODE.SAVE) || (mode === MODE.SAVE_DEV) ? 'as ' : '';
					spinner.text = `Installing ${packagesAsString} ${prefix}${endingInfo} ...`;
				}
				return performSpawn(installArgs, verbose);
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
};

module.exports.all = spawnerAll;
module.exports.mode = MODE;
