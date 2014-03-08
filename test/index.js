'use strict';

var fileIncludePlugin = require('../'),
  fs = require('fs'),
  gutil = require('gulp-util'),
  should = require('should');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures/result.html').toString();

  it('# should replace include-string on a file', function(done) {
    var file = new gutil.File({
      path: 'test/fixtures/index.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.readFileSync('test/fixtures/index.html')
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


  it('# should replace include-string on a stream', function(done) {
    var file = new gutil.File({
      path: 'test/fixtures/index.html',
      cwd: 'test/',
      base: 'test/fixtures',
      contents: fs.createReadStream('test/fixtures/index.html')
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