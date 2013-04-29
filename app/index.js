'use strict';

var fs = require('fs');
var path = require('path');
var generator = require('yeoman-generator');
var util = require('util');
var npm = require('npm');
var walker = require('walker');

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
  this.cssDependencies = [this.baseTheme];

  this.on('end', function () {
    console.log([
      '',
      'Foundation theme "' + this.appname.bold.blue + '" created. Now run:',
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
    message: 'Which css preprocessing language would you prefer? stylus/sass',
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

Generator.prototype.copyStaticDir = function copyStaticDir() {
  this.directory('public', this.publicDir);
  this.directory('assets', 'assets');
};

Generator.prototype.common = function common() {
  this.template('common/gitignore', '.gitignore');
  this.template('common/jshintrc', '.jshintrc');
  this.template('common/Gruntfile.js', 'Gruntfile.js');
  this.template('common/package.json', 'package.json');
  this.template('common/README.md', 'README.md');
};

Generator.prototype.installBaseTheme = function installBaseTheme() {
  if (this.useStylus) {
    var self = this;
    var done = this.async();

    npm.load({save: true}, function (err, npm) {
      if (err) {
        return self.emit('error', err);
      }
      npm.commands.install([self.baseTheme], function (err, data) {
        if (err) {
          self.log.skip('Could not install base theme "' + self.baseTheme + '", please make sure it is published as an NPM module.');
          return self.emit('error', err);
        }
        done();
      });
    });
  }
};

Generator.prototype.generateTheme = function() {
  var self = this;
  var done = this.async();

  if (this.useStylus) {
    var appname = this._.slugify(this.appname);
    this.template('common/index.js', 'index.js');
    this.template('common/index.styl', 'index.styl');
    this.template('stylus/app.styl', path.join(this.cssPreprocessorDir, appname + '.styl'));
    this.template('stylus/app-components.styl', path.join(this.cssPreprocessorDir, appname + '-components.styl'));
    this.template('stylus/app-variables.styl', path.join(this.cssPreprocessorDir, appname, 'variables.styl'));

    var baseTheme = require(path.join(this.env.cwd, 'node_modules', this.baseTheme));
    walker(baseTheme.path).on('dir', function(dir) {
      // for each subdirectories of baseTheme's lib path, if variables.styl
      // is found we consider it a theme component
      var comName = path.basename(dir);
      var comVar = path.join(dir, 'variables.styl');
      if (fs.existsSync(comVar)) {
        self.copy(comVar, path.join(self.cssPreprocessorDir, comName, 'variables.styl'));
        var comComponents = path.join(dir, 'components.styl');
        if (fs.existsSync(comComponents)) {
          self.copy(comComponents, path.join(self.cssPreprocessorDir, comName, 'componenets.styl'));
        }
      }
    }).on('end', function() {
      var baseThemeComponents = path.join(baseTheme.path, self.baseTheme + '-components.styl');
      console.log(baseThemeComponents);
      if (fs.existsSync(baseThemeComponents)) {
        self.copy(baseThemeComponents, path.join(self.cssPreprocessorDir, self.baseTheme, 'components.styl'));
      }
      done();
    });
  } else {
    this.copy('sass/app.scss', path.join(self.cssPreprocessorDir, 'app.scss'));
    this.remote('blai', 'foundation', function(err, remote) {
      remote.copy('scss/foundation/_variables.scss', path.join(self.cssPreprocessorDir, '_variables.scss'));
      done();
    });
  }
};
