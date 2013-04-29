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
			foundation = helpers.createGenerator('foundation:app', ['../../app'], 'app');
			done();
		});
	});

	it('should generate default stylus structure with default input', function (done) {
		var expected = ['.gitignore',
						'.jshintrc',
						'Gruntfile.js',
						'package.json',
						'index.styl',
						'index.js',
						'stylus/app.styl',
						'stylus/app-components.styl',
						'stylus/app/variables.styl',
						'stylus/foundation/variables.styl',
						'stylus/foundation/components.styl',
						];

		helpers.mockPrompt(foundation, {'cssPreprocessor': '', 'publicDir': '', 'cssPreprocessorDir': ''});

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
						'public/index.html',
						'public/css/normalize.css'
						];

		helpers.mockPrompt(foundation, {'cssPreprocessor': '', 'publicDir': '', 'cssPreprocessorDir': ''});

		foundation.run({}, function() {
			helpers.assertFiles(expected);
			done();
		});
	});
});
