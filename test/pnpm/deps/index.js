'use strict';

module.exports = function () {
	const Vue = require('vue');
	const VueRouter = require('vue-router');

	Vue.use(VueRouter);

	return new Vue();
};
