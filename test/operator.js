'use strict';

var parse = require('../lib/plugins/replace-operator');
var should = require('should');
var fs = require('fs');

describe('## operator', function() {

  it('# basic usage', function(done) {
    var result = fs.readFileSync('test/fixtures-operator/result-index.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-operator/index.html', 'utf-8');

    parse(
      null,
      index,
      {
        content: index,
        name: 'c'
      },
      {
        prefix: '@@',
        suffix: ''
      }
    ).should.equal(result);

    done();
  });

  it('# with suffix', function(done) {
    var result = fs.readFileSync('test/fixtures-operator/result-suffix.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-operator/suffix.html', 'utf-8');

    parse(
      null,
      index,
      {
        content: index,
        name: 'c'
      },
      {
        name: 'if',
        prefix: '@@',
        suffix: '##'
      }
    ).should.equal(result);

    done();
  });
});
