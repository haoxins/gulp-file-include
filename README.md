### gulp-file-include

* a plugin of gulp for file include

### install
```bash
npm install gulp-file-include
```

### how to use

* index.html

```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  </body>
</html>
```

* view.html

```html
<h1>view</h1>
```

* gulpfile.js

```js
var gulp = require('gulp')
var fileinclude = require('../index')

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude())
    .pipe(gulp.dest('./result/'))
});

gulp.task('default', function() {
  gulp.run('fileinclude')
})
```

* and the result is:

```html
<!DOCTYPE html>
<html>
  <body>
  <h1>view</h1>
  </body>
</html>
```

### License
MIT
