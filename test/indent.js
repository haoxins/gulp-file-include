'use strict';

var setIndent = require('../lib/indent');
var should = require('should');
var fs = require('fs');

describe('## indent', function() {
  it('# basic', function(done) {
    setIndent(
      ' content \n\t  start',
      13,
      'some other \n content').should.equal('some other \n\t   content');
    done();
  });

  it('# basic with \\r\\n newlines', function(done) {
    setIndent(
      ' content \r\n\t  start',
      14,
      '\r\n\r\nsome other \r\n content').should.equal('\r\n\r\n\t  some other \r\n\t   content');
    done();
  });

  it('# with non-space char', function(done) {
    setIndent(
      ' content \n\t g start',
      14,
      '\n\nsome other \n content').should.equal('\n\nsome other \n content');
    done();
  });

  it('# with non-space char and \\r\\n newlines', function(done) {
    setIndent(
      ' content \r\n\t g start',
      15,
      '\r\n\r\nsome other \r\n content').should.equal('\r\n\r\nsome other \r\n content');
    done();
  });
});

