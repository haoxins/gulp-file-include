'use strict';

var fs = require('fs'),
  gulp = require('gulp'),
  fileinclude = require('../index');

gulp.task('fileinclude', function() {
  if (!fs.existsSync('./result')) {
    fs.mkdirSync('result');
  }
  gulp.src(['./index.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('./result'));
});

gulp.task('default', function() {
  gulp.run('fileinclude');
});