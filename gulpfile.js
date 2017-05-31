const gulp = require('gulp');
const babel = require('gulp-babel');
var concat = require('gulp-concat');
var order = require("gulp-order");

gulp.task('js', () => {
    return gulp.src(['./node_modules/babel-polyfill/dist/polyfill.js', 'src/js/**/*.js'])
        .pipe(order([
            'vendor/**',
            'event-module.js',
        ]))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('js'));
});

function defaultTask(){
	gulp.watch('./src/js/**', ['js']);
}

gulp.task('default', ['js'], defaultTask);