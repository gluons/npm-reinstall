'use strict';

module.exports = function () {
	let DateEQ = require('date-eq');
	let Comparer = DateEQ.Comparer;
	let nvl = require('nvl');

	let now = new Date();

	return nvl(void 0, Comparer.eq(now, now));
};
