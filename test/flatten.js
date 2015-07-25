'use strict';

var fileIncludePlugin = require('..');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures-flatten/result.html', 'utf8');

  describe('# flatten variables', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-flatten/index.html',
        contents: fs.readFileSync('test/fixtures-flatten/index.html')
      });

      var stream = fileIncludePlugin({
        context: {
          obj: {
            'param1': 'value1',
            'param2': 'value2'
          }
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

    it('stream', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-flatten/index.html',
        contents: fs.createReadStream('test/fixtures-flatten/index.html')
      });

      var stream = fileIncludePlugin({
        context: {
          obj: {
            'param1': 'value1',
            'param2': 'value2'
          }
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
