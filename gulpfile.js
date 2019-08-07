'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');

sass.compiler = require('node-sass');

//GULP SASS + MINIFY CSS
gulp.task('sass', function () {
  return gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

//INJECT HTML

gulp.task("html", function(){
  return gulp.src("src/index.html")
  .pipe(gulp.dest("dist"))

})

//INJECT FONTS

gulp.task("fonts", function (){
  return gulp.src("src/fonts/*")
  .pipe(gulp.dest("dist/fonts"))
})

//INJECT IMAGES

gulp.task("images", function(){
  return gulp.src("src/img/*")
  .pipe(imagemin())
  .pipe(gulp.dest("dist/img"))
})

//GULP WATCH
gulp.task('watch', function () {

  browserSync.init({
    server: {
        baseDir: "dist"
    }
});

  gulp.watch("src/css/*.scss", gulp.series('sass', 'html', 'fonts', 'images', 'watch'));
  gulp.watch("src/*.html", gulp.series('sass', 'html', 'fonts', 'images', 'watch')).on('change', browserSync.reload);
  gulp.watch("src/fonts/*", gulp.series('sass', 'html', 'fonts', 'images', 'watch')).on('change', browserSync.reload);
  gulp.watch("src/img/*", gulp.series('sass', 'html', 'fonts', 'images', 'watch')).on('change', browserSync.reload);
});


gulp.task('default', gulp.series('sass', 'html', 'fonts', 'images', 'watch'));
