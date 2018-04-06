/* jshint strict: false */
/* globals require, console */
var gulp = require('gulp');
var exit = require('gulp-exit');

var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


function compile(watch) {
	var bundler = watchify(browserify('./index.js', {
		debug: true,
		standalone : 'deparam'
	}).transform(babelify, {
		// Use all of the ES2015 spec
		presets: ["env"],
		plugins: ['add-module-exports'],
		sourceMaps: true
	}));

	function rebundle() {
		return bundler
			.bundle()
			.on('error', function (err) {
				console.error(err);
				this.emit('end');
			})
			.pipe(source('deparam.js'))
			.pipe(buffer())
			.pipe(rename('deparam.min.js'))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest('./build'));
	}

	if (watch) {
		bundler.on('update', function () {
			console.log('-> bundling...');
			rebundle();
		});

		rebundle();
	} else {
		rebundle().pipe(exit());
	}
}

function watch() {
	return compile(true);
}

gulp.task('build', function () {
	return compile();
});
gulp.task('watch', function () {
	return watch();
});

gulp.task('default', ['watch']);