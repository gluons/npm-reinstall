'use strict';

const expect = require('chai').expect;
const spawn = require('cross-spawn');
const path = require('path');

const deps = require('./deps');

let cwd = path.resolve(__dirname, './deps');
let reinstallPath = path.resolve(__dirname, '../reinstall');

describe('Dependencies', function () {
	this.slow(5000);
	this.timeout(10000);

	it('should have dependencies before reinstallation', () => {
		let result = deps();
		expect(result).to.exist;
	});
	it('should have dependencies after reinstallation', () => new Promise((resolve, reject) => {
		let child = spawn('node', [reinstallPath, '--save', 'vue', 'vue-router'], {
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
