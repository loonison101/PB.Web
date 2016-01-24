var gulp = require('gulp');

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');
var replace = require('gulp-replace');

gulp.task('default', ['usemin', 'angularTemplates', 'moveFonts']);

gulp.task('moveFonts', function () {
    return gulp.src('./src/content/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('angularTemplates', function () {
    return gulp.src('./src/js/**/*.html')
        .pipe(templateCache({
            standalone: true,
            transformUrl: function (url) {
                return 'js/' + url;
            }
        }))
        .pipe(gulp.dest('dist/js/views/'));
});

//gulp.task('css', function () {
//    return gulp.src('./src/*.html')
//        .pipe(usemin({
//            css: [minifyCss(), rev() ]
//        }))
//        .pipe(gulp.dest('dist/content/'))
//});

gulp.task('usemin', function() {
    var min = gulp.src('./src/*.html')
        .pipe(usemin({
            css: [ minifyCss(),replace("url(../fonts", "url(fonts"),  rev() ],//
            html: [ minifyHtml({ empty: true }) ],
            //js: [ sourcemaps.init(), 'concat', uglify(), rev(), sourcemaps.write('.') ],
            js: [uglify({mangle:false}),rev()],
            angular: [ uglify(), rev() ],
            //inlinecss: [ minifyCss(), 'concat' ]
        }))
        .pipe(gulp.dest('dist/'));

    // Minfiy angularjs templates
    //var a = gulp.src('./src/js/**/*.html')
    //    //.pipe(templateCache({
    //    //    module: 'pb'//,
    //    //    //transformUrl: function (url) {
    //    //    //    return 'js/' + url;
    //    //    //}
    //    //}))
    //    .pipe(templateCache())
    //    //.pipe(gulp.dest('dist/'));
    //    .pipe(gulp.dest('dist/js/views/'));

    return merge(min);
});

//gulp.task('moveCss', ['usemin'], function () {
//    return gulp.src('dist/*.css')
//        .pipe(gulp.dest('dist/content'));
//});

gulp.task('ang', function () {
    return gulp.src('./src/js/**/*.html')
        .pipe(templateCache({
            module: 'pb'
        }))
        .pipe(gulp.dest('dist/'));
});