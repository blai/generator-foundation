'use strict';

var path = require('path');

var packageInfo = require('./package.json');
var libPath = path.join(__dirname, '<%= cssPreprocessorDir %>');
var dependencies = [<%= cssDependencies.map(function(dep) { return 'require(\'' + dep + '\')'; }).join(', ') %>];


/**
 * Return the plugin callback for stylus.
 *
 * @return {Function}
 * @api public
 */
exports = module.exports = function plugin() {
  return function(style){
    style.include(libPath);
    dependencies.forEach(function(dep) {
      style.use(dep.call(dep));
    });
  };
}



/**
 * Theme name.
 */
exports.theme = packageInfo.name;

/**
 * Theme version.
 */
exports.version = packageInfo.version;

/**
 * Stylus path.
 */
exports.path = libPath;

/**
 * Dependent modules
 * 
 * @type {Array}
 */
exports.dependencies = dependencies;

/**
 * Assets paths
 * 
 * @type {Array}
 */
exports.assetPaths = [path.join(__dirname, 'assets')];
