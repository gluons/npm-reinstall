'use strict';

module.exports = function () {
	let evl = require('evl');
	let nvl = require('nvl');

	return evl(
		() => {
			throw new Error();
		},
		() => nvl(null, 1)
	);
};
