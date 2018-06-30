var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('default', function() {
	nodemon({
		script: 'app.js',
		ext: 'js',
		env: {
			PORT: 3000
		},
		ignore: ['./node_modules/**']
	})
	.on('restart', function() {
		console.log('Restarting');
		return gulp.src(['test.js'], { read: false })
			.pipe(mocha({
				reporter: 'spec',
				globals: {
					should: require('should')
				}
			}));
	});
	return gulp.src(['test.js'], { read: false }) // gulp.src(['test/test-*.js'], { read: false })
		.pipe(mocha({
			reporter: 'spec',
			globals: {
				should: require('should')
			}
		}));
});
