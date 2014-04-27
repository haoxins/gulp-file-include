'use strict';

var gulp = require('gulp'),
  fileinclude = require('../index');

gulp.task('fileinclude', function() {
  gulp.src(['../test/fixtures/index-01.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
  gulp.run('fileinclude');
});