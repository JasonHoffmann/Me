var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var htmlToJs = require('gulp-html-to-js');

// TODO: MOVE CUSTOM GULP TASK TO A LIB FOLDER
gulp.task('templates', function() {
	return gulp.src('app/js/**/*.html')
	  .pipe(htmlToJs({concat: 'views.js'}))
	  .pipe(gulp.dest('app/js'));
});
   
gulp.task('build', function () {
    return browserify({
                entries: ['./app/js/index.js'],
                paths: ['./node_modules','./app/js/']
            })
        .transform('babelify', {presets: ['es2015'], plugins: [['resolver', { 'resolveDirs': ['app/js']}]]})
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('app/dist'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./app/js/**/*.js', ['build']);
    gulp.watch('./app/js/**/*.html', ['templates', 'build']);
});

gulp.task('default', ['templates', 'watch']);