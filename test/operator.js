'use strict';

const parse = require('../lib/replace-operator');
const should = require('should');
const fs = require('fs');

describe('## operator', () => {

  it('# basic usage', done => {
    var result = fs.readFileSync('test/fixtures-operator/result-index.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-operator/index.html', 'utf-8');

    parse(index, {
      prefix: '@@',
      suffix: '',
      name: 'if',
      handler: inst => {
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

  it('# with suffix', done => {
    var result = fs.readFileSync('test/fixtures-operator/result-suffix.html', 'utf-8');
    var index = fs.readFileSync('test/fixtures-operator/suffix.html', 'utf-8');

    parse(index, {
      name: 'if',
      prefix: '@@',
      suffix: '##',
      handler: inst => {
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
