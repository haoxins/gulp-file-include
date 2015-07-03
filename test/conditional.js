'use strict';

var parse = require('../lib/conditional');
var should = require('should');
var fs = require('fs');

describe('## conditional', function() {

  it('# basic usage', function(done) {
    var result = fs.readFileSync('test/fixtures-conditional/result-index.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-conditional/index.html', 'utf-8');

    parse(index, {
      name: 'c'
    }, {
      prefix: '@@',
      suffix: ''
    }).should.equal(result);

    done();
  });

  it('# with suffix', function(done) {
    var result = fs.readFileSync('test/fixtures-conditional/result-suffix.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-conditional/suffix.html', 'utf-8');

    parse(index, {
      name: 'c'
    }, {
      prefix: '@@',
      suffix: '##'
    }).should.equal(result);

    done();
  });
});
