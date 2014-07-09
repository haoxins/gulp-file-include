'use strict';

var gulp = require('gulp'),
  fileinclude = require('../index');

gulp.task('include', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./result'));
});