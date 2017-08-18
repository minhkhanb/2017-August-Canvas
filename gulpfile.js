var gulp = require ('gulp');
//Require the gulp-sass plugin
var sass = require ('gulp-sass');

var browserSync = require ('browser-sync').create ();

var useref = require ('gulp-useref');

var uglify = require ('gulp-uglify');
var gulpIf = require ('gulp-if');

var cssnano = require ('gulp-cssnano');

gulp.task ('default',function () {
    // place code for your default task here
});

var src = {
    sass:'app/sass/**/*.+(scss|sass)',
    html:'app/*.html',
    js:'app/js/**/*.js'
};
var distination = {
    js:'*.js',
    css: '*.css'
};

gulp.task ('sass',function () {
    return gulp.src (src.sass)    //accept scss and sass in root and sub folder
    .pipe (sass ())   //Using gulp-sass
    .pipe (gulp.dest ('app/css'))
    .pipe (browserSync.reload ({
        stream:true
    }))
});

gulp.task ('browserSync',function () {
    browserSync.init ({
        server:{
            baseDir:'app'
        }
    });
});

gulp.task ('useref',function () {
    return gulp.src (src.html)
    .pipe (useref ())     //Use for js file at difference folder
    .pipe (gulpIf (distination.js,uglify ()))
    //Minifies only if it's a CSS file
    .pipe (gulpIf(distination.css, cssnano()))
    .pipe (gulp.dest ('dist'))
});

gulp.task ('watch',['browserSync','sass'],function () {
    gulp.watch (src.sass,['sass']);
    //Reloads the browser whenever HTML or JS files change
    gulp.watch (src.html,browserSync.reload);
    gulp.watch (src.js,browserSync.reload);
});

