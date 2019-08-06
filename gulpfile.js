var gulp = require('gulp');
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

function defaultTask(cb) {
    // place code for your default task here

    gulp.task('sass', function () {
        return gulp.src("assets/css/app.scss")
          .pipe(sass().on('error', sass.logError))
          .pipe(gulp.dest("app.css"));
      });

    cb();
  }
  
  exports.default = defaultTask