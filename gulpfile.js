const gulp = require('gulp'),
path = require('path'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
sourcemaps = require('gulp-sourcemaps'),
rename = require('gulp-rename'),
header = require('gulp-header-comment'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
include = require('gulp-include');

var autoprefixer_options = {
  browsers: '> 5%, last 2 versions, Firefox ESR',
  cascade: false
};

gulp.task('compile',(cb) => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' })
      .on('error', function (err) { cb(err); }))
    .pipe(autoprefixer(autoprefixer_options))
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));
});

gulp.task('combinecss',(cb) => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(concat('matericious.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' })
      .on('error', function (err) { cb(err); }))
    .pipe(autoprefixer(autoprefixer_options))
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('mincss',(cb) => {
  return gulp.src('src/scss/**/*.scss')
    .pipe(concat('matericious.min.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' })
      .on('error', function (err) { cb(err); }))
    .pipe(autoprefixer(autoprefixer_options))
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('sass:watch',() => {
  gulp.watch('src/scss/**/*.scss', ['scss']);
});

gulp.task('compilejs', () => {
  return gulp.src('dist/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('add_base',() => {
  return gulp.src('src/js/*.js')
    .pipe(include())
       .on('error', console.log)
    .pipe(gulp.dest("dist/js"));
});

gulp.task('combinejs',() => {
  return gulp.src([
  	'babel/_base.js',
  	'babel/*.js'])
    .pipe(concat('matericious.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('minjs',() => {
  return gulp.src('dist/js/matericious.js')
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('js', gulp.series(['add_base', 'compilejs', 'combinejs', 'minjs']));
gulp.task('css', gulp.series(['compile', 'combinecss', 'mincss']));
