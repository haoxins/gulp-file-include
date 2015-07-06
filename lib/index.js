'use strict';

var parseConditional = require('./conditional');
var flatten = require('flatnest').flatten;
var concat = require('concat-stream');
var setIndent = require('./indent');
var through = require('through2');
var gutil = require('gulp-util');
var extend = require('extend');
var path = require('path');
var fs = require('fs');

module.exports = function(opts) {
  if(typeof opts === 'string') {
    opts = { prefix: opts };
  }

  opts = extend({}, {
    basepath: '@file',
    prefix: '@@',
    suffix: '',
    context: {},
    filters: false,
    indent: false
  }, opts);

  var includeRegExp = new RegExp(opts.prefix + '[ ]*include\\s*\\([^)"\']*["\']([^"\']*)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)+[ ]*' + opts.suffix);

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
    data = extend({}, opts.context, data || {});
    text = parseConditional(text, data, opts);
    text = stripCommentedIncludes(text, opts);

    // grab keys & sort by longest keys 1st to iterate in that order
    var variables = flatten(data);
    var keys = Object.keys(variables).sort();
    var i = keys.length - 1;
    var key;
    for (; ~i; i -= 1) {
      key = keys[i];
      text = text.replace(new RegExp(opts.prefix + '[ ]*' + key + '[ ]*' + opts.suffix, 'g'), variables[key]);
    }

    var filebase = opts.basepath === '@file' ? path.dirname(file.path) : opts.basepath === '@root' ? process.cwd() : opts.basepath;
    var matches = includeRegExp.exec(text);

    filebase = path.resolve(process.cwd(), filebase);

    // for checking if we are not including the current file again
    var currentFilename = path.resolve(file.base, file.path);

    while (matches) {
      var match = matches[0];
      var includePath = path.resolve(filebase, matches[1]);
      if (currentFilename.toLowerCase() === includePath.toLowerCase()) {
        throw new Error('recursion detected in file: ' + currentFilename);
      }

      var includeContent = fs.readFileSync(includePath, 'utf-8');

      if(opts.indent) {
        includeContent = setIndent(text, matches.index, includeContent);
      }

      // need to double each `$` to escape it in the `replace` function
      includeContent = includeContent.replace(/\$/gi, '$$$$');

      // apply filters on include content
      if (typeof opts.filters === 'object') {
        includeContent = applyFilters(includeContent, match);
      }

      var recFile = new gutil.File({
        cwd: process.cwd(),
        base: file.base,
        path: includePath,
        contents: new Buffer(includeContent)
      });
      recFile = include(recFile, includeContent, matches[3] ? JSON.parse(matches[3]) : {});
      includeContent = String(recFile.contents);

      text = text.replace(match, includeContent);

      matches = includeRegExp.exec(text);
    }

    file.contents = new Buffer(text);
    return file;
  }

  function applyFilters(includeContent, match) {
    if (match.match(/\)+$/)[0].length === 1) {
      // nothing to filter return unchanged
      return includeContent;
    }

    // now get the ordered list of filters
    var filterlist = match.split('(').slice(1, -1);
    filterlist = filterlist.map(function(str) {
      return opts.filters[str.trim()];
    });

    // compose them together into one function
    var filter = filterlist.reduce(compose);

    // and apply the composed function to the stringified content
    return filter(String(includeContent));
  }
};

function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}
