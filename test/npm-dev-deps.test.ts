/* tslint:disable:no-unused-expression */
import { expect } from 'chai';
import * as spawn from 'cross-spawn';
import * as path from 'path';

import devDeps = require('./npm/dev-deps');

const cwd = path.resolve(__dirname, './npm/dev-deps');
const reinstallBin = path.resolve(__dirname, '../dist/bin.js');

describe('[NPM] Dev Dependencies', function () {
	this.slow(5000);
	this.timeout(10000);

	it('should have dependencies before reinstallation', () => {
		let result: boolean = devDeps();
		expect(result).to.be.true;
	});
	it('should have dependencies after reinstallation', () => new Promise((resolve, reject) => {
		let child = spawn('node', [reinstallBin, '--save', 'date-eq', 'nvl'], {
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
					let result: boolean = devDeps();
					expect(result).to.be.true;
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
