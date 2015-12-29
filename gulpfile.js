var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

   
gulp.task('build', function () {
    return browserify({entries: './front/js/index.jsx', extensions: ['.jsx', '.js']})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('front/dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('/front/js/**/*.jsx', ['build']);
});

gulp.task('default', ['watch']);