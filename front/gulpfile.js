var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlToJs = require('gulp-html-to-js');
var jspm = require('gulp-jspm');

var vendorFiles = [
	'app/vendor/vue.min.js',
	'app/vendor/vue-router.min.js',
	'app/vendor/vue-resource.min.js',
	'app/vendor/lodash.min.js',
    'app/vendor/backbone.js'
];

gulp.task('vendor', function() {
	gulp.src(vendorFiles)
		.pipe(concat('vendor.min.js'))
		.pipe(gulp.dest('./app/vendor/'))
});




gulp.task('jspm', function() {
    gulp.src('app/index.js')
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(gulp.dest('app/build/'));
});

// TODO: MOVE CUSTOM GULP TASK TO A LIB FOLDER
gulp.task('templates', function() {
  return gulp.src('app/**/*.html')
    .pipe(htmlToJs({concat: 'views.js'}))
    .pipe(gulp.dest('app/'));
});

gulp.task('watch', ['jspm'], function () {
    gulp.watch('./app/**/*.js', ['jspm']);
    gulp.watch('./app/**/*.html', ['templates', 'jspm']);
});

gulp.task('default', ['vendor', 'templates', 'jspm', 'watch']);