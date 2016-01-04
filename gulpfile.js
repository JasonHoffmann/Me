var gulp = require('gulp');
var htmlToJs = require('gulp-html-to-js');
var jspm = require('gulp-jspm');

gulp.task('jspm', function() {
    gulp.src('js/index.js')
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(gulp.dest('app/build/'));
});

// TODO: MOVE CUSTOM GULP TASK TO A LIB FOLDER
gulp.task('templates', function() {
  return gulp.src('app/js/**/*.html')
    .pipe(htmlToJs({concat: 'views.js'}))
    .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['jspm'], function () {
    gulp.watch('./app/js/**/*.js', ['jspm']);
    gulp.watch('./app/js/**/*.html', ['templates', 'jspm']);
});

gulp.task('default', ['templates', 'watch']);