[![NPM version][npm-img]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]
[![Dependency status][david-img]][david-url]
[![Gitter][gitter-img]][gitter-url]

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
  - suffix: `string`, default `''`
  - basepath: `string`, default `@file`, it could be `@root`, `@file`, `your-basepath`
  - filters: `object`, filters of include content
  - context: `object`, context of `if` statement
  - indent: `boolean`, default `false`

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
    "age": 12345,
    "socials": {
      "fb": "facebook.com/include",
      "tw": "twitter.com/include"
    }
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
<strong>@@socials.fb</strong>
<strong>@@socials.tw</strong>
```

gulpfile.js
```js
var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');

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
<strong>facebook.com/include</strong>
<strong>twitter.com/include</strong>
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
var fileinclude = require('gulp-file-include'),
  markdown = require('markdown'),
  gulp = require('gulp');

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

### `if` statement

```js
fileinclude({
  context: {
    name: 'test'
  }
});
```

```
@@include('some.html', { "nav": true })

@@if (name === 'test' && nav === true) {
  @@include('test.html')
}
```

### License
MIT

[npm-img]: https://img.shields.io/npm/v/gulp-file-include.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gulp-file-include
[travis-img]: https://img.shields.io/travis/coderhaoxin/gulp-file-include.svg?style=flat-square
[travis-url]: https://travis-ci.org/coderhaoxin/gulp-file-include
[coveralls-img]: https://img.shields.io/coveralls/coderhaoxin/gulp-file-include.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/coderhaoxin/gulp-file-include?branch=master
[license-img]: http://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[david-img]: https://img.shields.io/david/coderhaoxin/gulp-file-include.svg?style=flat-square
[david-url]: https://david-dm.org/coderhaoxin/gulp-file-include
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/coderhaoxin/gulp-file-include?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge
