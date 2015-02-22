# gulp-insert-lines
A gulp plugin that will insert a given line before or after the matches of the given regex filter.

## Install

Install with [npm](https://npmjs.org/package/gulp-insert-lines)

```
npm install --save-dev gulp-insert-lines
```


## Examples

Our index.html file:

```html
<!doctype html>
<html>
<head>
  <title>Our App</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="format-detection" content="telephone=no" />
</head>
<body ng-controller="AppController">
  <div>
      markup goes here...
  </div>
  <script type="text/javascript">
    angular.bootstrap(document, ['ourApp']);
  </script>
</body>
</html>
```

### Example 1: Inserts a script tag at the end of index.html
```js
var gulp = require('gulp');
var insertLines = require('gulp-insert-lines');

gulp.task('insert-scripts-bundle', function () {
  gulp.src('./build/index.html')
  .pipe(insertLines({
       'before': /<script\s+type=["']text\/javascript["']>\s*$/i,
      'lineBefore': '<script type="text/javascript" src="bundled.min.js"></script>'
    }))
  .pipe(gulp.dest('dist'));
});
```

### Example 2: Inserts a styles tag at the beginning of index.html, Version 1 
```js
var gulp = require('gulp');
var insertLines = require('gulp-insert-lines');

gulp.task('insert-styles-bundle', function () {
  gulp.src('./build/index.html')
  .pipe(insertLines({
      'before': /<\/head>$/,
      'lineBefore': '<link rel="stylesheet" type="text/css" href="build/bundled.min.css" />'
    }))
  .pipe(gulp.dest('dist'));
});
```

### Example 3: Inserts a styles tag at the beginning of index.html, Version 2
```js
var gulp = require('gulp');
var insertLines = require('gulp-insert-lines');

gulp.task('insert-styles-bundle', function () {
  gulp.src('./build/index.html')
  .pipe(insertLines({
      'after': /<meta name=["#]format-detection["']\s+content=["']telephone=no["']\s+/>$/,
      'lineAfter': '<link rel="stylesheet" type="text/css" href="build/bundled.min.css" />'
    }))
  .pipe(gulp.dest('dist'));
});
```

## License

MIT © [Carsten Schaefer](http://www.g-tac.de)