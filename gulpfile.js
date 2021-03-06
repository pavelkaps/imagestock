/**
 * Created by Паша on 03.03.2017.
 */

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    runSequence = require('run-sequence'),
    del = require("del");

gulp.task('styles',function () {
     gulp.src('app/assets/styles/*.scss')
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
         .pipe(gulp.dest('app/assets/styles'));
    }
);

gulp.task('js', function () {
    return gulp.src('app/**/*.es6')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-object-rest-spread']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('bundle'));
});

gulp.task('bundle', function() {
    return browserify('bundle/app.js')
        .transform(babelify.configure({
            presets : ["es2015"]
        }))
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('bundle'));
});

gulp.task('clean', function(cb) {
    return del(["bundle"], cb);
});

gulp.task("build:js", function (callback) {
    runSequence('clean', 'js', 'bundle');
});

gulp.task("build:client", function (callback) {
    runSequence('clean', 'js', 'bundle', 'styles');
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.es6', ['build:js']);
    gulp.watch('app/**/*.scss', ['styles']);
});


