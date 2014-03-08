'use strict';

var fs = require('fs'),
  concat = require('concat-stream'),
  es = require('event-stream');

module.exports = function(prefix) {
  prefix = prefix || '@@';
  var includeRegExp = new RegExp(prefix + 'include\\(\\s*["\'](.*?)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)');

  function fileInclude(file) {
    var self = this;

    if (file.isNull()) {
      self.emit('data', file);
    } else if (file.isStream()) {
      file.contents.pipe(concat(function(data) {
        var text = String(data);
        self.emit('data', include(file, text, includeRegExp, prefix));
      }));
    } else if (file.isBuffer()) {
      self.emit('data', include(file, String(file.contents), includeRegExp, prefix));
    }
  }

  return es.through(fileInclude);
};

function include(file, text, includeRegExp, prefix) {
  prefix = prefix || '';
  var matches = includeRegExp.exec(text);

  while (matches) {
    var match = matches[0],
      includePath = matches[1],
      includeContent = fs.readFileSync(includePath);

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