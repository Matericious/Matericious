const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('compile', function () {
  return gulp.src('./scss/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('mincss', function () {
  return gulp.src('./scss/matericious.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('matericious.min.css'))
    .pipe(gulp.dest('./dist/css/'));
});
gulp.task('combinecss', function () {
  return gulp.src('./scss/matericious.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename('matericious.css'))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/*.scss', ['scss']);
});

gulp.task('minjs', function () {
  return gulp.src('dist/js/matericious.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('combinejs', function () {
  return gulp.src('./dist/js/*.js')
    .pipe(concat('matericious.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('js', ['combinejs', 'minjs']);
gulp.task('css', ['compile', 'combinecss', 'mincss']);
