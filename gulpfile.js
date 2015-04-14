var gulp    = require('gulp'),
    stylus  = require('gulp-stylus'),
    eslint  = require('gulp-eslint');

gulp.task('compile-css', function(){
  gulp.src('./src/css/*.styl')
      .pipe(stylus())
      .pipe(gulp.dest('./build/css'))
});

gulp.task('lint', function(){
  gulp.src(['js/**/*.js'])
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('automate', function(){
  gulp.watch('*.styl', ['compile-css'])
});