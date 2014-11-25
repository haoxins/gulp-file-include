'use strict';

var fileIncludePlugin = require('..'),
  markdown = require('markdown'),
  gutil = require('gulp-util'),
  should = require('should'),
  fs = require('fs');

describe('## gulp-file-include', function() {
  var result = fs.readFileSync('test/fixtures/result.html', 'utf8');

  describe('# options - filters', function() {
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
  return (str + '').replace(/[a-z]/gi, function(s) {
    return String.fromCharCode(
      s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13)
    );
  });
}
