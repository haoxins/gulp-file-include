'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## built-in webRoot variable', () => {
  it('# regular usage and includes', done => {
    var result = fs.readFileSync('test/fixtures-webroot-variable/result.html', 'utf8')
    var path = 'test/fixtures-webroot-variable/index.html'
    var file = new Vinyl({ path: path, contents: fs.createReadStream(path) })

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

  it('# nested folder', done => {
    var result = fs.readFileSync('test/fixtures-webroot-variable/sub/result.html', 'utf8')
    var path = 'test/fixtures-webroot-variable/sub/index.html'
    var file = new Vinyl({ path: path, contents: fs.createReadStream(path) })

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
