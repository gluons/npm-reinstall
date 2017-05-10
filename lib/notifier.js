const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

module.exports = function notifier() {
	updateNotifier({
		pkg
	}).notify();
};
