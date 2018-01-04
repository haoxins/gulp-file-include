
'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## gulp-file-include', () => {
  var result = fs.readFileSync('test/fixtures/result.html', 'utf8')
  var resultJS = fs.readFileSync('test/fixtures/result.js', 'utf8')
  var resultSamePrefix = fs.readFileSync('test/fixtures/sameprefix-result.html', 'utf8')
  var resultArr = fs.readFileSync('test/fixtures/arr-result.html', 'utf8')

  describe('# default', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-01.html',
        contents: fs.readFileSync('test/fixtures/index-01.html')
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
        path: 'test/fixtures/index-01.html',
        contents: fs.createReadStream('test/fixtures/index-01.html')
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

  describe('# options - basepath', () => {
    it('file - basepath: @file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-01.html',
        contents: fs.readFileSync('test/fixtures/index-01.html')
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

    it('stream - basepath: @file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-01.html',
        contents: fs.createReadStream('test/fixtures/index-01.html')
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

    it('file - basepath: @root', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-03.html',
        contents: fs.readFileSync('test/fixtures/index-03.html')
      })

      var stream = fileIncludePlugin({
        basepath: '@root'
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

    it('stream - basepath: @root', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-03.html',
        contents: fs.createReadStream('test/fixtures/index-03.html')
      })

      var stream = fileIncludePlugin({
        basepath: '@root'
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

    it('file - basepath: dir', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-02.html',
        contents: fs.readFileSync('test/fixtures/index-02.html')
      })

      var stream = fileIncludePlugin({
        basepath: __dirname
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

    it('stream - basepath: dir', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-02.html',
        contents: fs.createReadStream('test/fixtures/index-02.html')
      })

      var stream = fileIncludePlugin({
        basepath: __dirname
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

  describe('# options - prefix, basepath', () => {
    it('file - basepath: @file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-01.html',
        contents: fs.readFileSync('test/fixtures/index-01.html')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
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

    it('stream - basepath: @file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-01.html',
        contents: fs.createReadStream('test/fixtures/index-01.html')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
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

    it('file - basepath: @root', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-03.html',
        contents: fs.readFileSync('test/fixtures/index-03.html')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
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

    it('stream - basepath: @root', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-03.html',
        contents: fs.createReadStream('test/fixtures/index-03.html')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
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

    it('file - basepath: dir', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-02.html',
        contents: fs.readFileSync('test/fixtures/index-02.html')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: __dirname
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

    it('stream - basepath: dir', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-02.html',
        contents: fs.createReadStream('test/fixtures/index-02.html')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: __dirname
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

  describe('# options - suffix', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-suffix/index.html',
        contents: fs.readFileSync('test/fixtures-suffix/index.html')
      })

      var stream = fileIncludePlugin({
        suffix: '@@'
      })
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents);
        // TODO
        (String(newFile.contents) === result).should.equal(true)
        // String(newFile.contents).should.equal(result);
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('stream', done => {
      var file = new Vinyl({
        path: 'test/fixtures-suffix/index.html',
        contents: fs.createReadStream('test/fixtures-suffix/index.html')
      })

      var stream = fileIncludePlugin({
        suffix: '@@'
      })
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents);
        // TODO
        (String(newFile.contents) === result).should.equal(true)
        // String(newFile.contents).should.equal(result);
        done()
      })

      stream.write(file)
      stream.end()
    })
  })

  describe('# vars - same key prefix', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/sameprefix.html',
        contents: fs.readFileSync('test/fixtures/sameprefix.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(resultSamePrefix)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('stream', done => {
      var file = new Vinyl({
        path: 'test/fixtures/sameprefix.html',
        contents: fs.createReadStream('test/fixtures/sameprefix.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(resultSamePrefix)
        done()
      })

      stream.write(file)
      stream.end()
    })
  })

  describe('# aggressive regex', () => {
    it('file - basepath: @root', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-04.js',
        contents: fs.readFileSync('test/fixtures/index-04.js')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
      })
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)
        String(newFile.contents).should.equal(resultJS)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('stream - basepath: @root', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-04.js',
        contents: fs.createReadStream('test/fixtures/index-04.js')
      })

      var stream = fileIncludePlugin({
        prefix: '@@',
        basepath: '@root'
      })
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)
        String(newFile.contents).should.equal(resultJS)
        done()
      })

      stream.write(file)
      stream.end()
    })
  })

  describe('# for statement', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-05.html',
        contents: fs.readFileSync('test/fixtures/index-05.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(resultArr)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('stream', done => {
      var file = new Vinyl({
        path: 'test/fixtures/index-05.html',
        contents: fs.createReadStream('test/fixtures/index-05.html')
      })

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(resultArr)
        done()
      })

      stream.write(file)
      stream.end()
    })
  })
})
