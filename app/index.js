'use strict';

var path = require('path');
var generator = require('yeoman-generator');
var util = require('util');

var Generator = module.exports = function Generator(args, options, config) {
	generator.Base.apply(this, arguments);

	this.argument('appname', { type: String, required: false });
	this.appname = this.appname || path.basename(process.cwd());

	this.option('base', {
		type: String,
		defaults: 'foundation',
		banner: 'A base theme that the generated theme would used, default is "foundation"'
	});

	this.baseTheme = options.base;

	this.on('end', function () {
		console.log([
			'',
			'Foundation theme "' + this.appname .bold.blue + '"" created. Now run:',
			'1. ' + 'npm install'.bold.yellow + ' to install the required dependencies.',
			'2. ' + 'grunt'.bold.yellow + ' to start modifying your theme.'
		].join('\n'));
	});
};

util.inherits(Generator, generator.Base);

Generator.prototype.askForPreprocessorType = function askForPreprocessorType() {
	var done = this.async();
	var self = this;

	this.prompt({
		name: 'cssPreprocessor',
		message: 'Which css preprocessing language would you prefer? [stylus, sass]',
		'default': 'stylus'
	}, function(err, props) {
		if (err) {
			return self.emit('error', err);
		}

		self.useStylus = !/sass/i.test(props.cssPreprocessor);
		self.cssPreprocessor = self.useStylus ? 'stylus' : 'sass';
		
		if (self.useStylus) {
			self.log.writeln('Using "' + self.baseTheme + '" as base theme');
		}

		done();
	});
};

Generator.prototype.askForDir = function askForDir() {
	var done = this.async();
	var self = this;

	this.prompt([{
		name: 'publicDir',
		message: 'Where would you want to place your static contents?',
		'default': 'public'
	}, {
		name: 'cssPreprocessorDir',
		message: 'Where would you want to place your foundation ' + self.cssPreprocessor + ' files?',
		'default': self.cssPreprocessor
	}], function(err, props) {
		if (err) {
			return self.emit('error', err);
		}

		self.publicDir = props.publicDir || 'public';
		self.cssPreprocessorDir = props.cssPreprocessorDir || self.cssPreprocessor;
		done();
	});
};

Generator.prototype.genDir = function genDir() {
	this.directory('public', this.publicDir);
	this.directory(this.cssPreprocessor, this.cssPreprocessorDir);
};

Generator.prototype.common = function common() {
	this.template('common/gitignore', '.gitignore');
	this.template('common/jshintrc', '.jshintrc');
	this.template('common/Gruntfile.js', 'Gruntfile.js');
	this.template('common/package.json', 'package.json');
	this.copy('common/README.md', 'README.md');
	if (this.useStylus) {
		this.template('common/index.js', 'index.js');
		this.template('common/index.styl', 'index.styl');
		this.template('common/app.styl', path.join(this.cssPreprocessorDir, this._.slugify(this.appname) + '.styl'));
		this.directory('common/stylus', path.join(this.cssPreprocessorDir, this._.slugify(this.appname)));
		this.template('common/app-global.styl', path.join(this.cssPreprocessorDir, this._.slugify(this.appname), this._.slugify(this.appname) + '-global.styl'));
	}
};
