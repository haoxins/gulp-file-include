'use strict';

var parse = require('../lib/replace-operator');
var should = require('should');
var fs = require('fs');

describe('## operator', function() {

  it('# basic usage', function(done) {
    var result = fs.readFileSync('test/fixtures-operator/result-index.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-operator/index.html', 'utf-8');

    parse(index, {
      prefix: '@@',
      suffix: '',
      name: 'if',
      handler: function(inst) {
        // jshint ignore: start
        var condition = new Function('var context = this; with (context) { return ' + inst.args + '; }').call({
          content: index,
          name: 'c'
        });
        // jshint ignore: end

        return condition ? inst.body : '';
      }
    }).should.equal(result);

    done();
  });

  it('# with suffix', function(done) {
    var result = fs.readFileSync('test/fixtures-operator/result-suffix.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-operator/suffix.html', 'utf-8');

    parse(index, {
      name: 'if',
      prefix: '@@',
      suffix: '##',
      handler: function(inst) {
        // jshint ignore: start
        var condition = new Function('var context = this; with (context) { return ' + inst.args + '; }').call({
          content: index,
          name: 'c'
        });
        // jshint ignore: end

        return condition ? inst.body : '';
      }
    }).should.equal(result);

    done();
  });
});
