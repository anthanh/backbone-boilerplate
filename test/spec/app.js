/* globals define, describe, it, expect */
define([
	// import the module to be tested
	'scripts/app'
], function(app) {
	'use strict';

	describe('app', function () {

		it('app has trigger method', function () {
			expect(app.vent.trigger).to.be.a('function');
		});

		it('app has event listener method', function () {
			expect(app.vent.on).to.be.a('function');
		});

		it('app has common constants', function () {
			expect(app.common).to.be.a('object');
		});

		it('app can add regions', function () {
			expect(app.addRegions).to.be.a('function');
		});

		it.skip('app has router', function () {
			expect(app.router).to.be.a('object');
		});

	});

	describe('common module', function () {

		it('common.production isboolean', function () {
			expect(app.common.production).to.be.equal(false);
		});

		it.skip('common.apiGateway is URL', function () {
			var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
			expect(app.common.apiGateway).to.match(urlPattern);
		});

		it('common.lang is String', function () {
			expect(app.common.lang).to.be.a('String');
		});

	});


});
