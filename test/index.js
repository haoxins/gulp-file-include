var fileIncludePlugin = require('../')
var fs                = require('fs')
var path              = require('path')
var gutil             = require('gulp-util')
var should            = require('should')

describe('gulp-file-include', function () {
	it('should replace include-string on a file', function(done) {
		var file = new gutil.File({
			path: 'test/fixtures/index.html',
			cwd: 'test/',
			base: 'test/fixtures',
			contents: fs.readFileSync('test/fixtures/index.html')
		})

		var stream = fileIncludePlugin()
		stream.on('data', function(newFile) {
			should.exist(newFile)
			should.exist(newFile.contents)

			String(newFile.contents).should.equal('<!DOCTYPE html>\n'+'<html>\n'+'	<body>\n'+'	<h1>view</h1>\n'+'	</body>\n'+'</html>\n')
			done()
		})

		stream.write(file)
		stream.end()
	})
})
