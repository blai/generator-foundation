'use strict';

var path = require('path');
var stylus = require('stylus');
var connect = require('connect');


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
var dest = path.join(__dirname, 'dist', 'css');
exports.middlewares = [
  stylus.middleware({
    src: path.join(__dirname, '<%= cssPreprocessorDir %>'),
    dest: dest,
    compile: function(str, path) {
      return stylus(str)
        .set('filename', path)
        .set('force', false)
        .set('compress', true)
        .use(require('<%= baseTheme %>')());
    }
  }),
  connect['static'](dest)
];
