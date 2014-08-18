var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var source = require('vinyl-source-stream');
var browserify = require('browserify');
var partialify = require('partialify');

var jsPath = './app/**/*';
var cssPath = './app/css/**/*.scss';
var sniffPath = '../sniffer/build/forNW/Release/*';

gulp.task('browserify', function() {
  var bundleStream = browserify('./app/main.js')
    .transform(partialify)
    .bundle();

  bundleStream
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('css', function() {
  gulp.src(cssPath)
    .pipe(concat('main.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('sniffer', function() {
  gulp.src(sniffPath)
    .pipe(gulp.dest('./public/sniffer/'));
});


gulp.task('watch', function() {
  gulp.watch(jsPath, ['browserify']);
  gulp.watch(cssPath, ['css']);
  gulp.watch(sniffPath, ['sniffer']);
});

gulp.task('default', ['sniffer','css', 'browserify', 'watch']);
