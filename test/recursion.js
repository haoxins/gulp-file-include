'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## recursion include', () => {
  var result = fs.readFileSync('test/fixtures-recursion/result.txt', 'utf8')

  describe('# basepath: @file', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-recursion/index.txt',
        contents: fs.readFileSync('test/fixtures-recursion/index.txt')
      })

      var stream = fileIncludePlugin({
        basepath: '@file'
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
        path: 'test/fixtures-recursion/index.txt',
        contents: fs.createReadStream('test/fixtures-recursion/index.txt')
      })

      var stream = fileIncludePlugin({
        basepath: '@file'
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
