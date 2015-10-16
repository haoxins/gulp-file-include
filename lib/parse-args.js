var openRound = '('.charCodeAt(0);
var closeRound = ')'.charCodeAt(0);
var openCurly = '{'.charCodeAt(0);
var closeCurly = '}'.charCodeAt(0);
var openSquare = '['.charCodeAt(0);
var closeSquare = ']'.charCodeAt(0);
var singleQuote = '\''.charCodeAt(0);
var doubleQuote = '"'.charCodeAt(0);
var comma = ','.charCodeAt(0);
var backslash = '\\'.charCodeAt(0);

function skipQuotes(val, next, max) {
  var code = val.charCodeAt(next);
  var quote = code === singleQuote ? '\'' : '"';
  var escape;
  var escapePos;

  do {
    escape = false;
    next = val.indexOf(quote, next + 1);
    if (~next) {
      escapePos = next;
      while (val.charCodeAt(escapePos - 1) === backslash) {
        escapePos -= 1;
        escape = !escape;
      }
    } else {
      return false;
    }
  } while (escape);

  return next;
}

function skipObject(val, next, max) {
  var code;
  var balanced = 1;
  var openBracket = val.charCodeAt(next);
  var closeBracket = openBracket === openCurly ? closeCurly : closeSquare;

  next += 1;
  while (next < max && balanced !== 0) {
    code = val.charCodeAt(next);
    if (code === openBracket) {
      balanced += 1;
    } else if (code === closeBracket) {
      balanced -= 1;
    } else if (code === singleQuote || code === doubleQuote) {
      next = skipQuotes(val, next, max);
      if (next === false) {
        return false;
      }
    }
    next += 1;
  }

  if (balanced !== 0) {
    return false;
  }

  return next;
}

module.exports = function (val) {
  var pos = 0;
  var max = val.length;
  var next;
  var tokens = [];
  var balanced = 0;
  var stack = [tokens];

  while (pos < max) {
    code = val.charCodeAt(pos);

    if (code === openRound) {
      next = pos;
      do {
          next += 1;
          code = val.charCodeAt(next);
      } while (code <= 32);
      token = { type: 'function', nodes: [] };
      pos = next;

      balanced += 1;
      tokens.push(token);
      stack.push(token);
      tokens = token.nodes;

    } else if (code === closeRound) {
      if (tokens[tokens.length - 1] && tokens[tokens.length - 1].type === 'space') {
        tokens.pop();
      }

      balanced -= 1;
      stack.pop();
      tokens = stack[balanced];

      pos += 1;
    } else if (code === comma) {
      tokens.push({ type: ',', value: ',' });
      pos += 1;
    } else if (code === singleQuote || code === doubleQuote) {
      next = skipQuotes(val, pos, max);
      if (next === false) {
        tokens.push({ type: 'str', value: val.slice(pos + 1, max), unclosed: true });
        pos = max;
      } else {
        tokens.push({ type: 'str', value: val.slice(pos + 1, next) });
        pos = next;
      }
      pos += 1;
    } else if (code === openCurly || code === openSquare) {
      next = skipObject(val, pos, max);
      if (next === false) {
        tokens.push({ type: 'obj', value: val.slice(pos, max), unclosed: true });
        next = max;
      } else {
        tokens.push({ type: 'obj', value: val.slice(pos, next) });
        pos = next - 1;
      }
      pos += 1;
    } else if (code <= 32) {
      next = pos;
      do {
        next += 1;
        code = val.charCodeAt(next);
      } while (code <= 32);
      tokens.push({ type: 'space', value: val.slice(pos, next) });
      pos = next;
    } else {
      next = pos;
      do {
        next += 1;
        code = val.charCodeAt(next);
      } while (next < max && code > 32 && code !== comma &&
              code !== singleQuote && code !== doubleQuote &&
              code !== openRound && code !== closeRound &&
              code !== openCurly && code !== closeCurly &&
              code !== openSquare && code !== closeSquare);
      tokens.push({ type: 'expr', value: val.slice(pos, next) });
      pos = next;
    }

  }

  return stack[0];
}
