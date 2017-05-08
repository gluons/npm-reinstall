const spawn = require('cross-spawn');

let mode = {
	GLOBAL: Symbol('Global'),
	SAVE: Symbol('Save'),
	SAVE_DEV: Symbol('Save Dev')
};

let performSpawn = function (args) {
	spawn.sync('npm', args, {
		stdio: 'inherit'
	});
};

module.exports = function spawner(mode, packages) {
	let installArgs = ['install'];
	let uninstallArgs = ['uninstall'];

	switch (mode) {
		case mode.GLOBAL:
			installArgs.push('-g');
			uninstallArgs.push('-g');
			break;
		case mode.SAVE:
			installArgs.push('-S');
			uninstallArgs.push('-S');
			break;
		case mode.SAVE_DEV:
			installArgs.push('-D');
			uninstallArgs.push('-D');
			break;
	}

	installArgs = installArgs.concat(packages);
	uninstallArgs = uninstallArgs.concat(packages);

	console.log('Start reinstallation.');
	performSpawn(uninstallArgs);
	console.log('Uninstalled. Reinstalling....');
	performSpawn(installArgs);
	console.log('Finish reinstallation.');
};

Object.defineProperty(module.exports, 'mode', {
	enumerable: true,
	value: mode
});
