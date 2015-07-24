'use strict';

var replaceOperator = require('./replace-operator');
var replaceFunction = require('./replace-function');
var replaceVariable = require('./replace-variable');
var concat = require('concat-stream');
var setIndent = require('./indent');
var through = require('through2');
var gutil = require('gulp-util');
var extend = require('extend');
var path = require('path');
var fs = require('fs');

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
    var filebase = opts.basepath === '@file' ? path.dirname(file.path) : opts.basepath;
    var currentFilename = path.resolve(file.base, file.path);

    data = extend(true, {}, opts.context, data || {});
    data.content = text;

    text = stripCommentedIncludes(text, opts);
    text = replaceOperator(text, {
      prefix: opts.prefix,
      suffix: opts.suffix,
      name: 'if',
      handler: conditionalHandler
    });
    text = replaceVariable(text, data, opts);
    text = replaceFunction(text, {
      prefix: opts.prefix,
      suffix: opts.suffix,
      name: 'include',
      handler: includeHandler
    });

    function conditionalHandler(inst) {
      // jshint ignore: start
      var condition = new Function('var context = this; with (context) { return ' + inst.args + '; }').call(data);
      // jshint ignore: end

      return condition ? inst.body : '';
    }

    function includeHandler(inst) {
        var args = /[^)"\']*["\']([^"\']*)["\'](,\s*({[\s\S]*})){0,1}\s*/.exec(inst.args);

        if (args) {
          var includePath = path.resolve(filebase, args[1]);
          // for checking if we are not including the current file again
          if (currentFilename.toLowerCase() === includePath.toLowerCase()) {
            throw new Error('recursion detected in file: ' + currentFilename);
          }

          var includeContent = fs.readFileSync(includePath, 'utf-8');

          if (opts.indent) {
            includeContent = setIndent(inst.before, inst.before.length, includeContent);
          }

          // need to double each `$` to escape it in the `replace` function
          // includeContent = includeContent.replace(/\$/gi, '$$$$');

          // apply filters on include content
          if (typeof opts.filters === 'object') {
            includeContent = applyFilters(includeContent, args.input);
          }

          var recFile = new gutil.File({
            cwd: process.cwd(),
            base: file.base,
            path: includePath,
            contents: new Buffer(includeContent)
          });

          recFile = include(recFile, includeContent, args[3] ? JSON.parse(args[3]) : {});

          return String(recFile.contents);
        }
      }

    file.contents = new Buffer(text);

    return file;
  }

  function applyFilters(includeContent, match) {
    if (!match.match(/\)+$/)) {
      // nothing to filter return unchanged
      return includeContent;
    }

    // now get the ordered list of filters
    var filterlist = match.split('(').slice(0, -1);
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
