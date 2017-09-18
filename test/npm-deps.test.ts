/* tslint:disable:no-unused-expression */
import { expect } from 'chai';
import * as spawn from 'cross-spawn';
import * as path from 'path';

import deps = require('./npm/deps');

const cwd = path.resolve(__dirname, './npm/deps');
const reinstallBin = path.resolve(__dirname, '../dist/bin.js');

describe('[NPM] Dependencies', function () {
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
