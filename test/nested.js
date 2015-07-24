'use strict';

var fileIncludePlugin = require('..');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures-nested/result.html', 'utf8');

  describe('# nested arguments', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-nested/index.html',
        contents: fs.readFileSync('test/fixtures-nested/index.html')
      });

      var stream = fileIncludePlugin();
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(result);
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('stream', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-nested/index.html',
        contents: fs.createReadStream('test/fixtures-nested/index.html')
      });

      var stream = fileIncludePlugin();
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(result);
        done();
      });

      stream.write(file);
      stream.end();
    });
  });
});
