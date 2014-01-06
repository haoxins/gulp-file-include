var gulp = require('gulp')
var fileinclude = require('../index')

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('./result/'))
});

gulp.task('default', function() {
  gulp.run('fileinclude')

  gulp.watch('*.html', function(event) {
    gulp.run('fileinclude');
  })
})
