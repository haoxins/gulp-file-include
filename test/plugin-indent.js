'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## gulp-file-include', () => {
  var result = fs.readFileSync('test/fixtures-indent/result.html', 'utf-8')

  describe('# indent', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-indent/index.html',
        contents: fs.readFileSync('test/fixtures-indent/index.html')
      })

      var stream = fileIncludePlugin({
        prefix: '//=',
        indent: true
      })
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
        path: 'test/fixtures-indent/index.html',
        contents: fs.createReadStream('test/fixtures-indent/index.html')
      })

      var stream = fileIncludePlugin({
        prefix: '//=',
        indent: true
      })
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
