var balanced = require('balanced-match');

module.exports = function parse(content, data, opts) {
  // parse @@if (something) { include('...') }
  var regexpStart = new RegExp(opts.prefix + '[ ]*if([^{}]*)\\{');
  var regexpEnd = opts.suffix ? new RegExp('^\\s*' + opts.suffix) : false;
  var condition;
  var result = '';
  var matchStart;
  var matchBody;
  var matchEnd;
  var startEnd;

  if (!data.content) {
    data.content = content;
  }

  while (matchStart = regexpStart.exec(content)) {
    startEnd = matchStart.index + matchStart[0].length;
    matchBody = balanced('{', '}', content.slice(startEnd - 1));

    if (matchBody && matchBody.start === 0) {
      matchEnd = regexpEnd ? regexpEnd.exec(matchBody.post) : true;

      if (matchEnd) {
        matchEnd = regexpEnd ? matchEnd[0].length : 0;

        // jshint ignore: start
        condition = new Function('var context = this; with (context) { return ' + matchStart[1] + '; }').call(data);
        // jshint ignore: end

        result += content.slice(0, matchStart.index);
        result += condition ? parse(matchBody.body, data, opts) : '';

        content = content.slice(startEnd + matchBody.end + matchEnd);

        continue;
      }
    }

    result += content.slice(0, startEnd);
    content = content.slice(startEnd);
  }

  result += content;

  return result;
};
