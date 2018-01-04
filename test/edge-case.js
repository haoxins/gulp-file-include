'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## gulp-file-include', () => {
  describe('# edge cases', () => {
    it('should escape included content to avoid recursive includes', done => {
      var file = new Vinyl({
        path: 'test/fixtures-edge-case/index.html',
        contents: fs.createReadStream('test/fixtures-edge-case/index.html')
      })
      var expected = fs.readFileSync('test/fixtures-edge-case/result.html', 'utf8')

      var stream = fileIncludePlugin()
      stream.on('data', newFile => {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(expected)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('should work without trailing newline', done => {
      var file = new Vinyl({
        path: 'test/fixtures-edge-case/without-trailing-newline.txt',
        contents: fs.createReadStream('test/fixtures-edge-case/without-trailing-newline.txt')
      })
      var expected = fs.readFileSync('test/fixtures-edge-case/without-trailing-newline-result.txt', 'utf8')

      var stream = fileIncludePlugin()
      stream.on('data', function(newFile) {
        should.exist(newFile)
        should.exist(newFile.contents)

        String(newFile.contents).should.equal(expected)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('should skip commented includes', done => {
      var file = new Vinyl({
        path: 'test/fixtures-edge-case/commented-inclusion.html',
        contents: fs.createReadStream('test/fixtures-edge-case/commented-inclusion.html')
      })
      var expected = fs.readFileSync('test/fixtures-edge-case/commented-inclusion-result.html', 'utf8').replace(/\s/g, '')

      var stream = fileIncludePlugin()

      stream.on('data', newFile => {
        var inputString = String(newFile.contents).replace(/\s/g, '')

        inputString.should.equal(expected)
        done()
      })

      stream.write(file)
      stream.end()
    })

    it('should give an error on recursive includes', done => {
      var file = new Vinyl({
        path: 'test/fixtures-edge-case/recursion.html',
        contents: fs.createReadStream('test/fixtures-edge-case/recursion.html')
      })

      var stream = fileIncludePlugin()

      stream.on('error', err => {
        should.exist(err)
        done()
      })

      stream.write(file)
      stream.end()
    })

    // it('should give an error on circular recursive includes', function(done) {
    //   var file = new Vinyl({
    //     path: 'test/fixtures-edge-case/a.html',
    //     contents: fs.createReadStream('test/fixtures-edge-case/a.html')
    //   });

    //   var stream = fileIncludePlugin();

    //   stream.on('error', function(err) {
    //     should.exist(err);
    //     done();
    //   });

    //   stream.write(file);
    //   stream.end();
    // });
  })
})
