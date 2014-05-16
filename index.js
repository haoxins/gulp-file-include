'use strict';

var fs = require('fs'),
  path = require('path'),
  concat = require('concat-stream'),
  es = require('event-stream'),
  gutil = require('gulp-util');

module.exports = function(options) {
  var prefix, basepath;

  if (typeof options === 'object') {
    prefix = options.prefix || '@@';
    basepath = options.basepath || '@file';
  } else {
    prefix = options || '@@';
    basepath = '@file';
  }

  var includeRegExp = new RegExp(prefix + 'include\\(\\s*["\'](.*?)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)');

  function fileInclude(file) {
    var self = this;

    if (file.isNull()) {
      self.emit('data', file);
    } else if (file.isStream()) {
      file.contents.pipe(concat(function(data) {
        var text = String(data);

        try {
          self.emit('data', include(file, text, includeRegExp, prefix, basepath));
        } catch (e) {
          self.emit('error', new gutil.PluginError('gulp-file-include', e.message));
        }
      }));
    } else if (file.isBuffer()) {
      try {
        self.emit('data', include(file, String(file.contents), includeRegExp, prefix, basepath));
      } catch (e) {
        self.emit('error', new gutil.PluginError('gulp-file-include', e.message));
      }
    }
  }

  return es.through(fileInclude);
};

function include(file, text, includeRegExp, prefix, basepath) {
  var matches = includeRegExp.exec(text);

  switch (basepath) {
    case '@file':
      basepath = path.dirname(file.path);
      break;
    case '@root':
      basepath = '';
      break;
    default:
      break;
  }
  basepath = path.resolve(__dirname, basepath);

  while (matches) {
    var match = matches[0],
      includePath = matches[1],
      includeContent = fs.readFileSync(path.resolve(basepath, includePath));

    text = text.replace(match, includeContent);

    if (matches[3]) {
      // replace variables
      var data = JSON.parse(matches[3]);
      for (var k in data) {
        text = text.replace(new RegExp(prefix + k, 'g'), data[k]);
      }
    }

    matches = includeRegExp.exec(text);
  }
  file.contents = new Buffer(text);
  return file;
}