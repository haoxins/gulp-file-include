'use strict'

const fileIncludePlugin = require('..')
const Vinyl = require('vinyl')
const fs = require('fs')
const os = require('os')

require('should')

describe('## error', () => {
  it('# if statement', done => {
    var file = new Vinyl({
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
    var file = new Vinyl({
      path: 'test/fixtures-error/if.html',
      contents: fs.readFileSync('test/fixtures-error/for.html')
    })

    var stream = fileIncludePlugin({
      prefix: '@@',
      basepath: '@root'
    })
    stream.on('error', error => {
      error.message.should.equal('invalid is not defined: for (var i = 0; i < invalid.length; i++)  { result+=`' + os.EOL + '  <label>`+invalid[i]+`</label>' + os.EOL + '  `; }')
      done()
    })
    stream.write(file)
    stream.end()
  })
})
