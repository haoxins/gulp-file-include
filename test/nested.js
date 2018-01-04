'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## gulp-file-include', () => {
  var result = fs.readFileSync('test/fixtures-nested/result.html', 'utf8')

  describe('# nested arguments', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-nested/index.html',
        contents: fs.readFileSync('test/fixtures-nested/index.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(result)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('stream', done => {
      var file = new Vinyl({
        path: 'test/fixtures-nested/index.html',
        contents: fs.createReadStream('test/fixtures-nested/index.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(result)
        done()
      })

      stream.write(file)
      stream.end()
    })
  })
})
