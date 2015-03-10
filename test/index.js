'use strict';

var fileIncludePlugin = require('..'),
  gutil = require('gulp-util'),
  should = require('should'),
  fs = require('fs');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures/result.html', 'utf8');
  var resultJS = fs.readFileSync('test/fixtures/result.js', 'utf8');
  var resultSamePrefix = fs.readFileSync('test/fixtures/sameprefix-result.html', 'utf8');

  describe('# default', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-01.html',
        contents: fs.readFileSync('test/fixtures/index-01.html')
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
        path: 'test/fixtures/index-01.html',
        contents: fs.createReadStream('test/fixtures/index-01.html')
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

  describe('# options - basepath', function() {
    it('file - basepath: @file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-01.html',
        contents: fs.readFileSync('test/fixtures/index-01.html')
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

    it('stream - basepath: @file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-01.html',
        contents: fs.createReadStream('test/fixtures/index-01.html')
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

    it('file - basepath: @root', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-03.html',
        contents: fs.readFileSync('test/fixtures/index-03.html')
      });

      var stream = fileIncludePlugin({
        basepath: '@root'
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

    it('stream - basepath: @root', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-03.html',
        contents: fs.createReadStream('test/fixtures/index-03.html')
      });

      var stream = fileIncludePlugin({
        basepath: '@root'
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

    it('file - basepath: dir', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-02.html',
        contents: fs.readFileSync('test/fixtures/index-02.html')
      });

      var stream = fileIncludePlugin({
        basepath: __dirname
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

    it('stream - basepath: dir', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-02.html',
        contents: fs.createReadStream('test/fixtures/index-02.html')
      });

      var stream = fileIncludePlugin({
        basepath: __dirname
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

  describe('# options - prefix, basepath', function() {
    it('file - basepath: @file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-01.html',
        contents: fs.readFileSync('test/fixtures/index-01.html')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
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

    it('stream - basepath: @file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-01.html',
        contents: fs.createReadStream('test/fixtures/index-01.html')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
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

    it('file - basepath: @root', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-03.html',
        contents: fs.readFileSync('test/fixtures/index-03.html')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
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

    it('stream - basepath: @root', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-03.html',
        contents: fs.createReadStream('test/fixtures/index-03.html')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
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

    it('file - basepath: dir', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-02.html',
        contents: fs.readFileSync('test/fixtures/index-02.html')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: __dirname
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

    it('stream - basepath: dir', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-02.html',
        contents: fs.createReadStream('test/fixtures/index-02.html')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: __dirname
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

  describe('# vars - same key prefix', function() {
    it('file', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/sameprefix.html',
        contents: fs.readFileSync('test/fixtures/sameprefix.html')
      });

      var stream = fileIncludePlugin();
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(resultSamePrefix);
        done();
      });

      stream.write(file);
      stream.end();
    });

    it('stream', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/sameprefix.html',
        contents: fs.createReadStream('test/fixtures/sameprefix.html')
      });

      var stream = fileIncludePlugin();
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);

        String(newFile.contents).should.equal(resultSamePrefix);
        done();
      });

      stream.write(file);
      stream.end();
    });
  });

  describe('# aggressive regex', function() {
    it('stream - basepath: @root', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-04.js',
        contents: fs.createReadStream('test/fixtures/index-04.js')
      });

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
      });
      stream.on('data', function(newFile) {
        should.exist(newFile);
        should.exist(newFile.contents);
        String(newFile.contents).should.equal(resultJS);
        done();
      });

      stream.write(file);
      stream.end();
    });
  });
});
