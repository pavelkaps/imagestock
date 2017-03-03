/**
 * Created by Паша on 03.03.2017.
 */

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('styles',function () {
     gulp.src('./sass/*.sass')
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer({
             browsers: ['last 2 versions'],
             cascade: false
         }))
         .pipe(gulp.dest('dist'));
    }
);