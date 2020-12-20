'use strict'

const fileIncludePlugin = require('../lib')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## gulp-file-include', () => {
  var result = fs.readFileSync('test/fixtures-nested-once/result.html', 'utf8')
  var resultTwice = fs.readFileSync('test/fixtures-nested-once/result-twice.html', 'utf8')

  describe('# nested once arguments', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-nested-once/index.html',
        contents: fs.readFileSync('test/fixtures-nested-once/index.html')
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
        path: 'test/fixtures-nested-once/index.html',
        contents: fs.createReadStream('test/fixtures-nested-once/index.html')
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

  describe('# nested once arguments twice', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-nested-once/index-twice.html',
        contents: fs.readFileSync('test/fixtures-nested-once/index-twice.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(resultTwice)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('stream', done => {
      var file = new Vinyl({
        path: 'test/fixtures-nested-once/index-twice.html',
        contents: fs.createReadStream('test/fixtures-nested-once/index-twice.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(resultTwice)
        done()
      })

      stream.write(file)
      stream.end()
    })
  })
})
