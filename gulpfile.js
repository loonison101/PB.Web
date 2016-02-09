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
var rimraf = require('rimraf');

gulp.task('default-prod', ['usemin', 'angularTemplates', 'moveFonts', 'copyImages', 'copyHtmlFiles', 'copyJsFiles']);
//gulp.task('default', ['usemin', 'angularTemplates']);

// Clean up dist folder
gulp.task('clean-dist', function (cb) {
    rimraf('./dist', cb);
});

// First gulp task
gulp.task('usemin', function() {
    var min = gulp.src('./src/*.html')
        .pipe(replace('<script src="config/local/config.js"></script>', '<script src="config/prod/config.js"></script>'))
        .pipe(usemin({
            css: [ minifyCss(),replace("url(../fonts", "url(fonts"),  rev() ],//
            html: [ minifyHtml({ empty: true }) ],
            //js: [ sourcemaps.init(), 'concat', uglify(), rev(), sourcemaps.write('.') ],
            js: [uglify({mangle:false}),rev()],
            angular: [ uglify(), rev() ]
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

// Second gulp task
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

// Third gulp task
gulp.task('moveFonts', function () {


    var firstFontTransfer = gulp.src('./src/content/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));

    var secondFontTransfer = gulp.src('./src/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));

    return merge(firstFontTransfer, secondFontTransfer);
});

// Fourth gulp task
gulp.task('copyImages', function () {
    return gulp.src('./src/content/Images/*.*')
        .pipe(gulp.dest('./dist/Content/Images'));
});

// Fifth gulp task
gulp.task('copyHtmlFiles', function () {
    var firstHtml = gulp.src('./src/js/views/oidccallback.html')
        .pipe(replace('../../config/local/config.js', '../../config/prod/config.js'))
        .pipe(replace('../../bower_components/oidc-token-manager/dist/oidc-token-manager.min.js', '../oidc-token-manager.min.js'))
        .pipe(gulp.dest('./dist/js/views'));

    return firstHtml;
});

// Need to copy some files that standalone html files will reference
gulp.task('copyJsFiles', function () {
    var js1 = gulp.src('./src/bower_components/oidc-token-manager/dist/oidc-token-manager.min.js')
        .pipe(gulp.dest('./dist/js'));

    var js2 = gulp.src('./src/config/prod/config.js')
        .pipe(gulp.dest('./dist/config/prod'));

    return merge(js1, js2);
});







//gulp.task('css', function () {
//    return gulp.src('./src/*.html')
//        .pipe(usemin({
//            css: [minifyCss(), rev() ]
//        }))
//        .pipe(gulp.dest('dist/content/'))
//});



//gulp.task('moveCss', ['usemin'], function () {
//    return gulp.src('dist/*.css')
//        .pipe(gulp.dest('dist/content'));
//});

//gulp.task('ang', function () {
//    return gulp.src('./src/js/**/*.html')
//        .pipe(templateCache({
//            module: 'pb'
//        }))
//        .pipe(gulp.dest('dist/'));
//});