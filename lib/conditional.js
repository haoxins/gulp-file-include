var balanced = require('balanced-match');

module.exports = function parse(inst, opts) {
  var content = inst.content;
  var regexpStart = new RegExp(opts.prefix + '[ ]*if([^{}]*)\\{');
  var regexpEnd = opts.suffix ? new RegExp('^\\s*' + opts.suffix) : false;
  var replacement;
  var result = '';
  var matchStart;
  var matchBody;
  var matchEnd;
  var startEnd;

  while (matchStart = regexpStart.exec(content)) {
    startEnd = matchStart.index + matchStart[0].length;
    matchBody = balanced('{', '}', content.slice(startEnd - 1));

    if (matchBody && matchBody.start === 0) {
      matchEnd = regexpEnd ? regexpEnd.exec(matchBody.post) : true;

      if (matchEnd) {
        matchEnd = regexpEnd ? matchEnd[0].length : 0;
        replacement = inst.handler(matchStart[1], matchBody.body);

        if(replacement !== undefined) {
          result += content.slice(0, matchStart.index);
          result += parse({
            handler: inst.handler,
            content: replacement.toString()
          }, opts);

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
};
