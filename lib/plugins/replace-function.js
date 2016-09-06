var balanced = require('balanced-match');
var setIndent = require('./indent');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');

module.exports = function(file, text, data, opts, handleFn) {

  opts.name = 'include';

  return include(file, text, opts, handleFn);

};

function include(file, content, opts, handleFn) {
  var result = '';
  var reStart = new RegExp(opts.prefix + '[ ]*' + opts.name + '\\(');
  var reEnd = new RegExp('^[ ]*' + opts.suffix);
  var matchStart;
  var matchArg;
  var matchEnd;
  var safeStart;
  var before;
  var replacement;

  while (matchStart = reStart.exec(content)) {
    safeStart = matchStart.index + matchStart[0].length - 1;

    matchArg = balanced('(', ')', content.slice(safeStart));

    if (matchArg && matchArg.start === 0) {
      if (opts.suffix) {
        matchEnd = reEnd.exec(matchArg.post);
      }

      matchEnd = matchEnd ? matchEnd.index + matchEnd[0].length : 0;

      if (!opts.suffix || matchEnd) {
        before = content.slice(0, matchStart.index);
        replacement = handler(file, {
          before: before,
          args: matchArg.body,
        }, opts, handleFn);

        if (replacement !== undefined) {
          result += before + replacement.toString();
          content = content.slice(safeStart + matchArg.end + 1 + matchEnd);
          continue;
        }
      }
    }

    result += content.slice(0, safeStart);
    content = content.slice(safeStart);
  }

  result += content;

  return result;
}

function handler(file, inst, opts, handleFn) {
  var args = /[^)"\']*["\']([^"\']*)["\'](,\s*({[\s\S]*})){0,1}\s*/.exec(inst.args);
  var filebase = opts.basepath === '@file' ? path.dirname(file.path) : opts.basepath;
  var currentFilename = path.resolve(file.base, file.path);

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
      includeContent = applyFilters(includeContent, args.input, opts);
    }

    var recFile = new gutil.File({
      cwd: process.cwd(),
      base: file.base,
      path: includePath,
      contents: new Buffer(includeContent)
    });

    recFile = handleFn(recFile, includeContent, args[3] ? JSON.parse(args[3]) : {});

    return String(recFile.contents);
  }
}

function applyFilters(includeContent, match, opts) {
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

function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}
