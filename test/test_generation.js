'use strict';

var fs = require('fs');
var assert = require('assert');
var path = require('path');
var util = require('util');
var generators = require('yeoman-generator');
var helpers = require('yeoman-generator').test;

describe('Zurb foundation generator', function () {
	var foundation;

	beforeEach(function(done) {
		helpers.testDirectory(path.join(__dirname, 'temp'), function(err) {
			if (err) {
				done(err);
			}
			foundation = helpers.createGenerator('foundation:app', ['../../app']);
			done();
		});
	});

	it ('should generate project folder', function (done) {
		var expected = ['.gitignore',
						'.jshintrc',
						'Gruntfile.js',
						'package.json'
						];

		helpers.mockPrompt(foundation, {'publicDir': 'public', 'sassDir': 'sass'});

		foundation.run({}, function() {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('should copy foundation dependent javascript files', function (done) {
		var expected = ['public/javascripts/foundation/foundation.alerts.js',
						'public/javascripts/foundation/foundation.clearing.js',
						'public/javascripts/foundation/foundation.cookie.js',
						'public/javascripts/foundation/foundation.dropdown.js',
						'public/javascripts/foundation/foundation.forms.js',
						'public/javascripts/foundation/foundation.joyride.js',
						'public/javascripts/foundation/foundation.js',
						'public/javascripts/foundation/foundation.magellan.js',
						'public/javascripts/foundation/foundation.orbit.js',
						'public/javascripts/foundation/foundation.placeholder.js',
						'public/javascripts/foundation/foundation.reveal.js',
						'public/javascripts/foundation/foundation.section.js',
						'public/javascripts/foundation/foundation.tooltips.js',
						'public/javascripts/foundation/foundation.topbar.js',
						'public/javascripts/vendor/custom.modernizr.js',
						'public/javascripts/vendor/jquery.js',
						'public/javascripts/vendor/zepto.js',
						'public/index.html'
						];

		helpers.mockPrompt(foundation, {'publicDir': 'public', 'sassDir': 'sass'});

		foundation.run({}, function() {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('creates foundation sass files', function (done) {
		var expected = ['sass/_settings.scss',
						'sass/app.scss',
						'sass/normalize.scss'
						];

		helpers.mockPrompt(foundation, {'publicDir': 'public', 'sassDir': 'sass'});

		foundation.run({}, function() {
			helpers.assertFiles(expected);
			done();
		});
	});
});