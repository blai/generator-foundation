'use strict';

var path = require('path');
var stylus = require('stylus');
var connect = require('connect');

/**
 * Library version.
 */
exports.version = require('./package.json').version;

/**
 * Stylus path.
 */
exports.path = path.join(__dirname, '<%= cssPreprocessorDir %>');


/**
 * Connect middleware
 */
exports.middlewares = [
  stylus.middleware({src: __dirname, dest: path.join(__dirname, 'dist', 'css')}),
  connect['static'](path.join(__dirname, '<%= publicDir %>'))
];


/**
 * Return the plugin callback for stylus.
 *
 * @return {Function}
 * @api public
 */
function plugin() {
  return function(style){
    style.include(path.join(__dirname, '<%= cssPreprocessorDir %>'));
    style.use(require('<%= baseTheme %>')());
  };
}

exports = module.exports = plugin;
