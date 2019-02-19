/* tslint:disable:no-unused-expression */
import { expect } from 'chai';
import spawn from 'cross-spawn';
import path from 'path';

import deps = require('./yarn/deps');

const cwd = path.resolve(__dirname, './yarn/deps');
const reinstallBin = path.resolve(__dirname, '../dist/bin.js');

describe('[Yarn] Dependencies', function () {
	this.slow(5000);
	this.timeout(10000);

	it('should have dependencies before reinstallation', () => {
		let result = deps();
		expect(result).to.exist;
	});
	it('should have dependencies after reinstallation', () => new Promise((resolve, reject) => {
		let child = spawn('node', [reinstallBin, '--save', 'vue', 'vue-router'], {
			cwd,
			stdio: 'ignore'
		});

		let isErrorThrown = false;
		child.on('error', err => {
			if (!isErrorThrown) {
				isErrorThrown = true;
				reject(err);
			}
		});
		child.on('close', code => {
			if (code === 0) {
				try {
					let result = deps();
					expect(result).to.exist;
					resolve();
				} catch (err) {
					reject(err);
				}
			} else {
				if (!isErrorThrown) {
					isErrorThrown = true;
					reject(code);
				}
			}
		});
	}));
});
