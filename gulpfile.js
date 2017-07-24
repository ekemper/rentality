var gulp  = require('gulp'),
	run = require('gulp-run');

gulp.task('default', function() {
	gulp.watch('*/**.js', ['run tests']);
});
 
gulp.task('run tests', function() {
  return run('npm test').exec();
})