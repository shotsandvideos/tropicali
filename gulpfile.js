'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
let cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var sourcemaps = require("gulp-sourcemaps");
var ghPages = require('gulp-gh-pages');

var concat = require('gulp-concat');

//GULP POSTCSS + MINIFY CSS
gulp.task('css', function () {
  return gulp.src([
    "src/css/reset.css",
    "src/css/typography.css",
    "src/css/app.css"
  ])
    .pipe(
      postcss([
        require("autoprefixer"),
        require("postcss-preset-env")({
          stage: 1,
          browsers: ["IE 11", "last 2 versions"]
        })
      ]
    ))
    .pipe(concat("app.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))

    .pipe(sourcemaps.write())
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

  gulp.watch("src/css/*.css", gulp.series('css', 'html', 'fonts', 'images', 'watch'));
  gulp.watch("src/*.html", gulp.series('css', 'html', 'fonts', 'images', 'watch')).on('change', browserSync.reload);
  gulp.watch("src/fonts/*", gulp.series('css', 'html', 'fonts', 'images', 'watch')).on('change', browserSync.reload);
  gulp.watch("src/img/*", gulp.series('css', 'html', 'fonts', 'images', 'watch')).on('change', browserSync.reload);
});

gulp.task('deploy', function() {
  return gulp.src('dist/*')
    .pipe(ghPages());
});

gulp.task('default', gulp.series('css', 'html', 'fonts', 'images', 'watch'));
