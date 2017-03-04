/**
 * Created by Паша on 03.03.2017.
 */

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel');

gulp.task('styles',function () {
     gulp.src('./assets/styles/*.sass')
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
         .pipe(gulp.dest('dist'));
    }
);

gulp.task('js', function () {
    return gulp.src('app/**/*.es6')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});