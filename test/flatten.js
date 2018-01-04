'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const should = require('should')
const fs = require('fs')

describe('## gulp-file-include', () => {
  var result = fs.readFileSync('test/fixtures-flatten/result.html', 'utf8')

  describe('# flatten variables', () => {
    it('file', done => {
      var file = new Vinyl({
        path: 'test/fixtures-flatten/index.html',
        contents: fs.readFileSync('test/fixtures-flatten/index.html')
      })

      var stream = fileIncludePlugin({
        context: {
          obj: {
            'param1': 'value1',
            'param2': 'value2'
          }
        }
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
        path: 'test/fixtures-flatten/index.html',
        contents: fs.createReadStream('test/fixtures-flatten/index.html')
      })

      var stream = fileIncludePlugin({
        context: {
          obj: {
            'param1': 'value1',
            'param2': 'value2'
          }
        }
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
