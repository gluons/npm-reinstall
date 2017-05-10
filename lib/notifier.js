'use strict';

const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

module.exports = function notifier() {
	updateNotifier({
		pkg,
		updateCheckInterval: 1000 * 60 * 60 // 1 hour
	}).notify();
};
