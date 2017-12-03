'use strict'

const fileIncludePlugin = require('..')
const gutil = require('gulp-util')
const fs = require('fs')

require('should')

describe('## error', () => {
  it('# if statement', done => {
    var file = new gutil.File({
      path: 'test/fixtures-error/if.html',
      contents: fs.readFileSync('test/fixtures-error/if.html')
    })

    var stream = fileIncludePlugin({
      prefix: '@@',
      basepath: '@root'
    })
    stream.on('error', error => {
      error.message.should.equal('invalid is not defined:  (invalid === true) ')
      done()
    })
    stream.write(file)
    stream.end()
  })

  it('# for statement', done => {
    var file = new gutil.File({
      path: 'test/fixtures-error/if.html',
      contents: fs.readFileSync('test/fixtures-error/for.html')
    })

    var stream = fileIncludePlugin({
      prefix: '@@',
      basepath: '@root'
    })
    stream.on('error', error => {
      error.message.should.equal('invalid is not defined: for (var i = 0; i < invalid.length; i++)  { result+=`\n  <label>`+invalid[i]+`</label>\n  `; }')
      done()
    })
    stream.write(file)
    stream.end()
  })
})
