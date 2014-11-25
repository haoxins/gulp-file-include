'use strict';

var fileIncludePlugin = require('..'),
  gutil = require('gulp-util'),
  should = require('should'),
  fs = require('fs');

describe('## conditional include', function() {
  var result = fs.readFileSync('test/fixtures-conditional-include/result.html', 'utf8');

  describe('# basic usage', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-conditional-include/index.html',
        contents: fs.readFileSync('test/fixtures-conditional-include/index.html')
      });

      var stream = fileIncludePlugin({
        context: {
          name: 'c'
        }
      });
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(result);
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('stream - basepath: @file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-conditional-include/index.html',
        contents: fs.createReadStream('test/fixtures-conditional-include/index.html')
      });

      var stream = fileIncludePlugin({
        context: {
          name: 'c'
        }
      });
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
