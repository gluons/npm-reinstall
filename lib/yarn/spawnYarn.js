'use strict';

const arrvl = require('arrvl');
const spawn = require('cross-spawn');

/**
 * Spawn the Yarn command.
 * @param  {String[]} args    Command arguments.
 * @param  {Boolean}  verbose Display more information.
 * @return {Promise}          Promise of spawn.
 */
module.exports = function spawnYarn(args, verbose) {
	args = arrvl(args, []);

	return new Promise((resolve, reject) => {
		let yarn = spawn('yarn', args);
		if (verbose) {
			yarn.stdout.pipe(process.stdout);
			yarn.stderr.pipe(process.stderr);
		}
		yarn.on('error', err => {
			reject(err);
		});
		yarn.on('close', () => {
			resolve();
		});
	});
};
