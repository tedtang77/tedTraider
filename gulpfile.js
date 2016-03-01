/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');
var mocha = require('gulp-mocha');

// create a default task and just log a message
gulp.task('default', function() {
    return gutil.log('Gulp is running!')
});

// files from edx course
gulp.task('test', function() {
    gulp.src('./test/test.js')
        .pipe(mocha())
        .on('error', function(err) {
        this.emit('end');
    });
});

gulp.task('watch', function() {
    gulp.watch('./**/*.js', ['test']);
});
