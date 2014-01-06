var fs    = require('fs')
var es    = require('event-stream')
var gutil = require('gulp-util')

module.exports = function (prefix) {
	prefix = prefix || '@@'
	var includeRegExp = new RegExp(prefix + 'include\\(\\s*["\'](.*?)["\'](,\\s*({[\\s\\S]*?})){0,1}\\s*\\)')

	function fileInclude(file) {
		if (file.isNull()) {
			return this.emit('data', file)
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-file-include', 'stream not supported'))
		}

		if (file.isBuffer()) {
			var text = String(file.contents)
			var matches = includeRegExp.exec(text)

			while (matches) {
				var match = matches[0]
				var includePath = matches[1]
				var includeContent = fs.readFileSync(includePath)

				text = text.replace(match, includeContent)
				matches = includeRegExp.exec(text)
			}
			file.contents = new Buffer(text)
		}

		this.emit('data', file)
	}

	return es.through(fileInclude)
}
