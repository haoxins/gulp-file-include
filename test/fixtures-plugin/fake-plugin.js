module.exports = function(file, text, data, opts, handleFn) {

  opts.name = 'fakePlugin';

  return handle(file, text, opts, handleFn);

};

function handle(file, content, opts, handleFn) {
  return '***fake plugin start***\n' + content + '\n***fake plugin end***';
}
