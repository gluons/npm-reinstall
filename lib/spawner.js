const chalk = require('chalk');
const spawn = require('cross-spawn');
const ora = require('ora');

const spinner = ora({
	color: 'yellow'
});

const MODE = {
	GLOBAL: Symbol('Global'),
	SAVE: Symbol('Save'),
	SAVE_DEV: Symbol('Save Dev')
};

let performSpawn = function (args, verbose) {
	if (verbose) {
		args.push('--verbose');
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
};

module.exports = function spawner(mode, packages, verbose = false) {
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
	performSpawn(uninstallArgs, verbose)
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
		})
		.catch(err => {
			process.stderr.write(err.toString());
		});
};

Object.defineProperty(module.exports, 'mode', {
	enumerable: true,
	value: MODE
});
