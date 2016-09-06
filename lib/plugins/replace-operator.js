var balanced = require('balanced-match');

module.exports = function(file, text, data, opts, handleFn) {

  opts.name = 'if';

  return parse(text, data, opts);

};

function parse(content, data, opts) {
  var regexpStart = new RegExp(opts.prefix + '[ ]*' + opts.name + '([^{}]*)\\{');
  var regexpEnd = opts.suffix ? new RegExp('^\\s*' + opts.suffix) : false;
  var replacement;
  var result = '';
  var matchStart;
  var matchBody;
  var matchEnd;
  var startEnd;
  var before;

  while (matchStart = regexpStart.exec(content)) {
    startEnd = matchStart.index + matchStart[0].length;
    matchBody = balanced('{', '}', content.slice(startEnd - 1));

    if (matchBody && matchBody.start === 0) {
      matchEnd = regexpEnd ? regexpEnd.exec(matchBody.post) : true;

      if (matchEnd) {
        before = content.slice(0, matchStart.index);
        matchEnd = regexpEnd ? matchEnd[0].length : 0;
        replacement = handler({
          before: before,
          args: matchStart[1],
          body: matchBody.body
        }, data);

        if (replacement !== undefined) {
          result += before + parse(replacement.toString(), data, opts);
          content = content.slice(startEnd + matchBody.end + matchEnd);
          continue;
        }
      }
    }

    result += content.slice(0, startEnd);
    content = content.slice(startEnd);
  }

  result += content;

  return result;
}

function handler(inst, data) {
  // jshint ignore: start
  var condition = new Function('var context = this; with (context) { return ' + inst.args + '; }').call(data);
  // jshint ignore: end

  return condition ? inst.body : '';
}
