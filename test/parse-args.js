var parseArgs = require('../lib/parse-args');
var should = require('should');

var tests = [{
  message: 'should tokenize comma separated arguments',
  fixture: 'args1, args2, args3, args4',
  expected: [
    { type: 'expr', value: 'args1' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'expr', value: 'args2' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'expr', value: 'args3' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'expr', value: 'args4' },
  ]
}, {
  message: 'should tokenize strings',
  fixture: 'args1, "string1", args3, \'string2\'',
  expected: [
    { type: 'expr', value: 'args1' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'str', value: 'string1' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'expr', value: 'args3' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'str', value: 'string2' },
  ]
}, {
  message: 'should tokenize objects',
  fixture: 'args1, {"param": "value"}, args3, ["param"]',
  expected: [
    { type: 'expr', value: 'args1' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'obj', value: '{"param": "value"}' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'expr', value: 'args3' },
    { type: ',', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'obj', value: '["param"]' },
  ]
}, {
  message: 'should tokenize parentheses',
  fixture: 'func(arg1, arg2), {}',
  expected: [
    { type: 'expr', value: 'func' },
    { type: 'function', nodes: [
      { type: 'expr', value: 'arg1' },
      { type: ',', value: ',' },
      { type: 'space', value: ' ' },
      { type: 'expr', value: 'arg2' },
    ] },
    { type: ',', value: ','},
    { type: 'space', value: ' '},
    { type: 'obj', value: '{}'},
  ]
}, {
  message: 'should tokenize condition expr',
  fixture: 'if ( 32 <= 32 )',
  expected: [
    { type: 'expr', value: 'if' },
    { type: 'space', value: ' ' },
    { type: 'function', nodes: [
      { type: 'expr', value: '32' },
      { type: 'space', value: ' ' },
      { type: 'expr', value: '<=' },
      { type: 'space', value: ' ' },
      { type: 'expr', value: '32' },
    ] },
  ]
}];

describe('Arguments Parser', function () {
  tests.forEach(function (test) {
    it(test.message, function (done) {
      test.expected.should.eql(parseArgs(test.fixture));
      done();
    });
  });
});
