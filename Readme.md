[![NPM](https://nodei.co/npm/gulp-file-include.png?downloads=true)](https://nodei.co/npm/gulp-file-include/)

### gulp-file-include
a plugin of gulp for file include

### install
```bash
npm install gulp-file-include
```

### options

* options - type: `string`, just as prefix, default `@@`, and basepath is default `@file`

```js
fileinclude('@@')
```

* options - type: `object`
  - prefix: `string`, default `@@`
  - basepath: `string`, default `@file`, it could be `@root`, `@file`, `your-basepath`
  - filters: `object`, filters of include content

* options.basepath - type: `string`, it could be
  - `@root`, include file relative to the dir where `gulp` running in
  - `@file`, include file relative to the dir where `file` in [example](example)
  - `your-basepath` include file relative to the basepath you give

```js
fileinclude({
  prefix: '@@',
  basepath: '@file'
})
```

**important**: `@file` is relative to the `file` pass to gulp, not the file `include expression` in, see [example](example)

```js
fileinclude({
  prefix: '@@',
  basepath: '/home/'
})
```

### example

index.html
```html
<!DOCTYPE html>
<html>
  <body>
  @@include('./view.html')
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345
  })
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
var gulp = require('gulp'),
  fileinclude = require('gulp-file-include');

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});
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

### filters

```html
<!DOCTYPE html>
<html>
  <body>
  @@include(markdown('view.md'))
  @@include('./var.html', {
    "name": "haoxin",
    "age": 12345
  })
  </body>
</html>
```

view.md
```html
view
====
```

```js
var gulp = require('gulp'),
  fileinclude = require('gulp-file-include'),
  markdown = require('markdown');

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      filters: {
        markdown: markdown.parse
      }
    }))
    .pipe(gulp.dest('./'));
});
```

### License
MIT
