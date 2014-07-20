'use strict';

var fileIncludePlugin = require('../'),
  fs = require('fs'),
  gutil = require('gulp-util'),
  should = require('should');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures/result.html').toString();

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

  describe('# options - filters', function() {
    var markdown = require('markdown');

    it('file - filters: markdown', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-markdown.html',
        contents: fs.readFileSync('test/fixtures/index-markdown.html')
      });

      var stream = fileIncludePlugin({
        filters: {
          markdown: markdown.parse
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
    
    it('stream - filters: markdown', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-markdown.html',
        contents: fs.createReadStream('test/fixtures/index-markdown.html')
      });

      var stream = fileIncludePlugin({
        filters: {
          markdown: markdown.parse
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

    it('file - filters: markdown & rot13', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-markdown-rot13.html',
        contents: fs.readFileSync('test/fixtures/index-markdown-rot13.html')
      });

      var stream = fileIncludePlugin({
        filters: {
          markdown: markdown.parse,
          rot13: rot13
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
    
    it('stream - filters: markdown & rot13', function(done) {
      var file = new gutil.File({
        path: 'test/fixtures/index-markdown-rot13.html',
        contents: fs.createReadStream('test/fixtures/index-markdown-rot13.html')
      });

      var stream = fileIncludePlugin({
        filters: {
          markdown: markdown.parse,
          rot13: rot13
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

function rot13(str) {
  // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  return (str + '').replace(/[a-z]/gi, function (s) {
    return String.fromCharCode(
      s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13)
    );
  });
}
