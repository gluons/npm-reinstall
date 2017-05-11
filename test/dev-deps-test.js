'use strict';

const expect = require('chai').expect;
const spawn = require('cross-spawn');
const path = require('path');

const devDeps = require('./dev-deps');

let cwd = path.resolve(__dirname, './dev-deps');
let reinstallPath = path.resolve(__dirname, '../reinstall');

describe('Dev Dependencies', function () {
	this.slow(5000);
	this.timeout(10000);

	it('should have devDependencies before reinstallation', () => {
		let result = devDeps();
		expect(result).to.be.true;
	});
	it('should have devDependencies after reinstallation', () => new Promise((resolve, reject) => {
		let child = spawn('node', [reinstallPath, '--save-dev', 'date-eq', 'nvl'], {
			cwd
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
				resolve();
			} else {
				if (!isErrorThrown) {
					isErrorThrown = true;
					reject(code);
				}
			}
		});
	}));
});
