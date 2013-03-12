'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var util = require('util');


var Generator = module.exports = function Generator() {
	generator.Base.apply(this, arguments);

	this.argument('appname', { type: String, required: false });
	this.appname = this.appname || path.basename(process.cwd());
};

util.inherits(Generator, generator.Base);

Generator.prototype.publicDir = function publicDir() {
	var done = this.async();
	var self = this;

	this.prompt({
		name: 'publicDir',
		message: 'Where would you want to place your static contents?',
		'default': 'public',
	}, function(err, props) {
		if (err) {
			return self.emit('error', err);
		}

		self.publicDir = props.publicDir;
		self.directory('public', self.publicDir);

		done();
	});
};

Generator.prototype.sassDir = function sassDir() {
	var done = this.async();
	var self = this;

	this.prompt({
		name: 'sassDir',
		message: 'Where would you want to place your foundation scss files?',
		'default': 'sass',
	}, function(err, props) {
		if (err) {
			return self.emit('error', err);
		}

		self.sassDir = props.sassDir;
		self.directory('sass', self.sassDir);

		done();
	});
};

Generator.prototype.common = function common() {
	this.template('common/gitignore', '.gitignore');
	this.template('common/jshintrc', '.jshintrc');
	this.template('common/Gruntfile.js', 'Gruntfile.js');
	this.template('common/package.json', 'package.json');
	this.copy('common/README.md', 'README.md');
};
