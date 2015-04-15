var gulp    = require('gulp'),
    stylus  = require('gulp-stylus'),
    eslint  = require('gulp-eslint'),
    nib     = require('nib');

gulp.task('compile-css', function(){
  gulp.src('./src/css/*.styl')
      .pipe(stylus({ use: nib(), import: ['nib']}))
      .pipe(gulp.dest('./build/css'))
});

gulp.task('compile-html', function(){
  // currently just copying over the html; can add handlebars if necc later
  gulp.src('./src/*.html')
      .pipe(gulp.dest('./build'));
});

gulp.task('copy-fetch', function(){
  // just move fetch from node-modules, so it can stay up-to-date
  gulp.src('./node_modules/whatwg-fetch/fetch.js')
      .pipe(gulp.dest('./build/js'));
})

gulp.task('lint', function(){
  gulp.src('./src/js/*.js')
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(gulp.dest('./build/js'));
});

gulp.task('automate', function(){
  gulp.watch(['./src/css/*.styl', './src/*.html'], ['compile-css', 'compile-html']);
});

gulp.task('build', ['compile-css', 'compile-html', 'copy-fetch']);