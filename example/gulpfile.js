'use strict'

const fileinclude = require('..')
const gulp = require('gulp')

gulp.task('include', () => {
  gulp.src(['index.txt'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        name: 'example'
      }
    }))
    .pipe(gulp.dest('./result'))
})
