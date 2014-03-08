### gulp-file-include
a plugin of gulp for file include

### install
```bash
npm install gulp-file-include
```

### how to use

index.html
```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {"name": "haoxin", "age": 12345})
  </body>
</html>
```

view.html
```html
<h1>view</h1>
```

var.html
```html
<label>@@name</label>
<label>@@age</label>
```

gulpfile.js
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

and the result is:
```html
<!DOCTYPE html>
<html>
  <body>
  <h1>view</h1>
  <label>haoxin</label>
<label>12345</label>
  </body>
</html>
```

### License
MIT
