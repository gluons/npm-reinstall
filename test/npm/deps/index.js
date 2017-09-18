'use strict';

module.exports = function () {
	let Vue = require('vue');
	let VueRouter = require('vue-router');

	Vue.use(VueRouter);

	return new Vue();
};
