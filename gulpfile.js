const gulp = require('gulp'),
pug = require('gulp-pug'),
sass = require('gulp-sass');

gulp.task('pug', ()=>{
  return gulp.src('pug/*.pug')
  .pipe(pug({
      basedir: './pug',
     doctype: 'html',
     pretty: true
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('scss', ()=>{
   return gulp.src('scss/*.scss')
      .pipe(sass({outputStyle: 'expanded'}))
      .pipe(gulp.dest('./css'));
});