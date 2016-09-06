'use strict';

var fileIncludePlugin = require('..');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures-plugin/result.html', 'utf8');

  describe('# plug external plugin', function() {
    it('plugin is worked', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures-plugin/index-01.html',
        contents: fs.readFileSync('test/fixtures-plugin/index-01.html')
      });

      var stream = fileIncludePlugin({
        plugins: [
          'test/fixtures-plugin/fake-plugin'
        ]
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
