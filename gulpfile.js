var gulp  = require('gulp'),
	run = require('gulp-run');

gulp.task('default', function() {
	gulp.watch(
		['*.js', 'front-end/*'],
		gulp.series('run tests', 'build vue', 'restart node server', function(done) {
			console.log('\n\nbuild chain done!');
			done();
		})
	);
});

gulp.task('run tests', function() {
	console.log('started run test');
  return run('npm test').exec()
  .pipe(gulp.dest('output'));
});

gulp.task('build vue', function() {
  return run('node front-end/build/build.js').exec()
  .pipe(gulp.dest('output'));
});

gulp.task('restart node server', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
  .pipe(gulp.dest('output'));
});
