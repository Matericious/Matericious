const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('default', function(cb) {
  return gulp.src(['pug/**/*.pug', '!pug/includes/**/*.pug'])
    .pipe(pug({
      basedir: './pug',
      doctype: 'html',
      pretty: true
    })
    .on('error', function (err) { cb(err); }))
  .pipe(gulp.dest('./'));
});
