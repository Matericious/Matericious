const gulp = require('gulp'),
path = require('path'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
sourcemaps = require('gulp-sourcemaps'),
header = require('gulp-header-comment'),
strip = require('gulp-strip-comments'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
include = require('gulp-include');

var autoprefixer_options={
  browsers: '> 5%, last 2 versions, Firefox ESR',
  cascade: false
};

gulp.task('compilecss',(cb)=>{
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle:'expanded'})
      .on('error',function(err){cb(err);}))
    .pipe(autoprefixer(autoprefixer_options))
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(gulp.dest('css/'));
});

gulp.task('combinecss',(cb)=>{
  return gulp.src('src/scss/**/*.scss')
    .pipe(concat('matericious.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'expanded'})
      .on('error',function(err){cb(err);}))
    .pipe(autoprefixer(autoprefixer_options))
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('mincss',(cb)=>{
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

gulp.task('sass:watch',()=>{
  gulp.watch('src/scss/**/*.scss', ['scss']);
});

gulp.task('compilejs',()=>{
  return gulp.src(['src/js/*.js','!src/js/_base.js'])
    .pipe(include()).on('error', console.log)
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(strip())
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(gulp.dest('js'));
});

gulp.task('combinejs',()=>{
  return gulp.src(['src/js/_base.js','src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('matericious.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(strip())
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('minjs',()=>{
  return gulp.src(['src/js/_base.js','src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('matericious.min.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(uglify())
    .pipe(header({file:path.join(__dirname, 'src/info.txt')}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('js', gulp.series(['compilejs', 'combinejs', 'minjs']));
gulp.task('css', gulp.series(['compile', 'combinecss', 'mincss']));
gulp.task('default', gulp.series(['css', 'js']));
