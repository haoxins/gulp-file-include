'use strict';

var concat = require('concat-stream');
var through = require('through2');
var gutil = require('gulp-util');
var extend = require('extend');
var path = require('path');

module.exports = function(opts) {
  if (typeof opts === 'string') {
    opts = {prefix: opts};
  }

  opts = extend({}, {
    basepath: '@file',
    prefix: '@@',
    suffix: '',
    context: {},
    filters: false,
    indent: false
  }, opts);

  if (opts.basepath !== '@file') {
    opts.basepath = opts.basepath === '@root' ? process.cwd() : path.resolve(opts.basepath);
  }

  // add plugins
  opts.plugins = [].concat(
    // list of inner plugins
    [
      'replace-operator',
      'replace-operator-for',
      'replace-variable',
      'replace-function'
    ],
    // list of external plugins
    opts.plugins || []
  ).map(function(pluginOpts) {
    var plugin;

    try {
      // inner plugins
      plugin = require(`./plugins/${pluginOpts}`);
    } catch (e) {
      // external plugins
      plugin = require(path.resolve(pluginOpts));
    }
    return plugin;
  });

  function fileInclude(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
    } else if (file.isStream()) {
      file.contents.pipe(concat(function(data) {
        try {
          data = include(file, String(data));
          cb(null, data);
        } catch (e) {
          cb(new gutil.PluginError('gulp-file-include', e.message));
        }
      }));
    } else if (file.isBuffer()) {
      try {
        file = include(file, String(file.contents));
        cb(null, file);
      } catch (e) {
        cb(new gutil.PluginError('gulp-file-include', e.message));
      }
    }
  }

  return through.obj(fileInclude);

  /**
   * utils
   */
  function stripCommentedIncludes(content, opts) {
    // remove single line html comments that use the format: <!-- @@include() -->
    var regex = new RegExp('<\!--(.*)' + opts.prefix + '[ ]*include([\\s\\S]*?)[ ]*' + opts.suffix + '-->', 'g');
    return content.replace(regex, '');
  }

  function include(file, text, data) {

    data = extend(true, {}, opts.context, data || {});
    data.content = text;

    text = stripCommentedIncludes(text, opts);

    opts.plugins.forEach(plugin => text = plugin(file, text, data, opts, include));

    file.contents = new Buffer(text);

    return file;
  }
};
