var gulp    = require('gulp'),
		nodemon = require('gulp-nodemon'),
		jshint = require('gulp-jshint');

gulp.task('start serv', function () {
	nodemon({
		script: 'server.js',
		ext   : 'js html',
		env   : { 'NODE_ENV': 'development' }
	});
});

// gulp.task('run', ['test', 'start']);