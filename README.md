### gulp-file-include

* a plugin of gulp for file include

### install
```bash
npm install gulp-file-include
```

### how to use
```js
var gulp = require('gulp')
var fileinclude = require('gulp-file-include')

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
```
