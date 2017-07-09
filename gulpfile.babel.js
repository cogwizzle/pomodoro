import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';

function swallowError(error){
  console.log(error.toString());
  this.emit('end');
}

gulp.task("default", ["transpile", "watch"]);

gulp.task('transpile', () => {
  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on('error', swallowError)
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist/assets"));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['transpile']);
});
