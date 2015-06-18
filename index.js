'use strict';

var concat = require('concat-stream'),
  merge = require('merge').recursive,
  through = require('through2'),
  gutil = require('gulp-util'),
  path = require('path'),
  fs = require('fs');

module.exports = function(options) {
  var prefix, suffix, basepath, filters, context;

  if (typeof options === 'object') {
    basepath = options.basepath || '@file';
    prefix = options.prefix || '@@';
    suffix = options.suffix || '';
    context = options.context || {};
    filters = options.filters;
  } else {
    prefix = options || '@@';
    suffix = '';
    basepath = '@file';
    context = {};
  }

  var includeRegExp = new RegExp(prefix + 'include\\s*\\([^)"\']*["\']([^"\']*)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)+' + suffix);

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
  function stripCommentedIncludes(content) {
    // remove single line html comments that use the format: <!-- @@include() -->
    var regex = new RegExp('<\!--(.*)' + prefix + 'include([\\s\\S]*?)' + suffix + '-->', 'g');
    return content.replace(regex, '');
  }

  function parseConditionalIncludes(content, data) {
    // parse @@if (something) { include('...') }
    var regexp = new RegExp(prefix + 'if.*\\{[^{}]*\\}\\s*' + suffix),
      matches = regexp.exec(content),
      included = false;

    if (!data.content) data.content = content;

    while (matches) {
      var match = matches[0],
        includeContent = /\{([^{}]*)\}/.exec(match)[1];

      // jshint ignore: start
      var exp = /if(.*)\{/.exec(match)[1];
      included = new Function('var context = this; with (context) { return ' + exp + '; }').call(data);
      // jshint ignore: end

      if (included) {
        content = content.replace(match, includeContent);
      } else {
        content = content.replace(match, '');
      }

      matches = regexp.exec(content);
    }

    return content;
  }

  function include(file, text, data) {
    data = merge(true, context, data || {});
    text = stripCommentedIncludes(text);

    // grab keys & sort by longest keys 1st to iterate in that order
    var keys = Object.keys(data).sort();
    var i = keys.length - 1;
    for ( ; ~i; i -= 1) {
      text = text.replace(new RegExp(prefix + keys[i] + suffix, 'g'), data[keys[i]]);
    }

    var filebase = basepath === '@file' ? path.dirname(file.path) : basepath === '@root' ? process.cwd() : basepath;
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

      // need to double each `$` to escape it in the `replace` function
      includeContent = includeContent.replace(/\$/gi, '$$$$');

      // apply filters on include content
      if (typeof filters === 'object') {
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

    text = parseConditionalIncludes(text, data);

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
      return filters[str.trim()];
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
