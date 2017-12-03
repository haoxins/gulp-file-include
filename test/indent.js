'use strict'

const setIndent = require('../lib/indent')

require('should')

describe('## indent', () => {
  it('# basic', done => {
    setIndent(
      ' content \n\t  start',
      13,
      'some other \n content').should.equal('some other \n\t   content')
    done()
  })

  it('# basic with \\r\\n newlines', done => {
    setIndent(
      ' content \r\n\t  start',
      14,
      '\r\n\r\nsome other \r\n content').should.equal('\r\n\r\n\t  some other \r\n\t   content')
    done()
  })

  it('# with non-space char', done => {
    setIndent(
      ' content \n\t g start',
      14,
      '\n\nsome other \n content').should.equal('\n\nsome other \n content')
    done()
  })

  it('# with non-space char and \\r\\n newlines', done => {
    setIndent(
      ' content \r\n\t g start',
      15,
      '\r\n\r\nsome other \r\n content').should.equal('\r\n\r\nsome other \r\n content')
    done()
  })
})
