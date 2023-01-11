const server = require('browser-sync').create();
const { src, dest, watch, series } = require('gulp');
const concat = require('gulp-concat');
const cssMinify = require('gulp-css-minify');
const jsUglify = require('gulp-uglify');

function htmlTask(){
    return src([
        './template-parts/head/head.html',
        './template-parts/form/form.html',
        './template-parts/footer/footer.html'
    ])
        .pipe(concat('index.html'))
        .pipe(dest('./'));
}

function cssTask(){
    return src([
        './template-parts/head/head.css',
        './template-parts/form/form.css',
        './template-parts/footer/footer.css'
    ])
        .pipe(concat('style.css'))
        .pipe(cssMinify())
        .pipe(dest('./assets/css/'));
}

function jsTask(){
    return src([
        './template-parts/form/form.js'
    ])
        .pipe(concat('script.js'))
        // .pipe(jsUglify())
        .pipe(dest('./assets/scripts/js/'))
}

function serverLaunch(done){
    server.init({
      server: {
        baseDir: '.'
      }    
    });
    done();
}

function serverReload(done){
    server.reload();
    done();
}

function watchTask(){
    watch('./template-parts/**/*.html', series(htmlTask, serverReload));
    watch('./template-parts/**/*.css', series(cssTask, serverReload));
    watch('./template-parts/**/*.js', series(jsTask, serverReload));
}

exports.default = series(
    htmlTask,
    cssTask,
    jsTask,
    serverLaunch,
    watchTask
);