'use strict';

var replaceVariable = require('../lib/replace-variable');
var should = require('should');
var fs = require('fs');

describe('## variable', function() {
  var result = fs.readFileSync('test/fixtures-variable/result.html', 'utf-8');

  it('# basic', function(done) {
    var index = fs.readFileSync('test/fixtures-variable/index.html', 'utf-8');

    replaceVariable(index, {
      param1: 'value1',
      obj: {
        param1: 'o1',
        param2: 'o2'
      },
      param2: 'value2'
    }, {
      prefix: '//='
    }).should.equal(result);

    done();
  });

  it('# with suffix', function(done) {
    var index = fs.readFileSync('test/fixtures-variable/index-suffix.html', 'utf-8');

    replaceVariable(index, {
      param1: 'value1',
      obj: {
        param1: 'o1',
        param2: 'o2'
      },
      param2: 'value2'
    }, {
      prefix: '//=',
      suffix: '@@'
    }).should.equal(result);

    done();
  });
});
