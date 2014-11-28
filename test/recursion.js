'use strict';

var fileIncludePlugin = require('..'),
  gutil = require('gulp-util'),
  should = require('should'),
  fs = require('fs');

describe('## recursion include', function() {
  var result = fs.readFileSync('test/fixtures-recursion/result.txt', 'utf8');

  describe('# basepath: @file', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-recursion/index.txt',
        contents: fs.readFileSync('test/fixtures-recursion/index.txt')
      });

      var stream = fileIncludePlugin({
        basepath: '@file'
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

    it('stream', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-recursion/index.txt',
        contents: fs.createReadStream('test/fixtures-recursion/index.txt')
      });

      var stream = fileIncludePlugin({
        basepath: '@file'
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
