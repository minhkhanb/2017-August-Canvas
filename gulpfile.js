var gulp = require('gulp');
//Require the gulp-sass plugin
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

gulp.task('default', function () {
    // place code for your default task here
});

var src = {
  sass: 'app/sass/**/*.+(scss|sass)'
};

gulp.task('sass', function () {
   return gulp.src(src.sass)    //accept scss and sass in root and sub folder
    .pipe(sass())   //Using gulp-sass
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('browserSync', function () {
   browserSync.init({
      server: {
          baseDir: 'app'
      }
   });
});

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch(src.sass, ['sass']);
});

