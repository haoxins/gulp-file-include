'use strict';

var fileIncludePlugin = require('..');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures-indent/result.html', 'utf-8');

  describe('# indent', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-indent/index.html',
        contents: fs.readFileSync('test/fixtures-indent/index.html')
      });

      var stream = fileIncludePlugin({
        prefix: '//=',
        indent: true
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
        path: 'test/fixtures-indent/index.html',
        contents: fs.createReadStream('test/fixtures-indent/index.html')
      });

      var stream = fileIncludePlugin({
        prefix: '//=',
        indent: true
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
