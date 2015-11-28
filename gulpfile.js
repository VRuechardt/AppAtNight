
var gulp = require('gulp');
var sass = require('gulp-sass');

var browserify = require('browserify');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('default', function() {
    gulp.run('styles');
    gulp.run('scripts');
});

gulp.task('styles', function() {
    gulp.src("./app/scss/app.scss")
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest("./app/"));
});

gulp.task('scripts', function() {

    return browserify({
        entries: ['./app/app.js'],
        paths: ['./app/bower_components']
    }).bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./app/dest'));

});

gulp.task('watch', function() {
    gulp.run('default');
    var scssWatcher = gulp.watch('./app/scss/**/*.scss', ['styles']);
    var jsWatcher = gulp.watch(['./app/app.js', './app/views/**/*.js', './app/shared/**/*.js'], ['scripts']);
});

