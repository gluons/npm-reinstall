'use strict';

module.exports = function () {
	const DateEQ = require('date-eq');
	const Comparer = DateEQ.Comparer;
	const nvl = require('nvl');

	const now = new Date();

	return nvl(void 0, Comparer.eq(now, now));
};
