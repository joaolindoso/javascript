const gulp = require('gulp')
const { src, dest, watch, series, parallel } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')(require('sass'))
const notify = require('gulp-notify')
const rename = require('gulp-rename')
const terser = require('gulp-terser')
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const replace = require('gulp-replace')
const del = require('del')
const copy = require('gulp-copy')
/* const imagemin = require('gulp-imagemin') */

// All paths
const paths = {
    html: {
      src: ['./src/*.html'],
      dest: './dist/',
    },
    images: {
      src: ['./src/assets/image/**/*'],
      dest: './dist/assets/image/',
    },
    videos: {
      src: ['./src/assets/video/**/*'],
      dest: './dist/assets/video/',
    },
    styles: {
      src: ['./src/assets/scss/**/*.scss'],
      dest: './dist/assets/css/',
    },
    scripts: {
      src: ['./src/assets/js/**/*.js'],
      dest: './dist/assets/js/',
    },
    cachebust: {
      src: ['./dist/**/*.html'],
      dest: './dist/',
    },
}

function minifyHtml() {
    return src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest(paths.html.dest));
}

/* function minifyImage() {
    return src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
} */

function compileStyles() {
    return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
}

function minifyScripts() {
    return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(terser().on('error', (error) => console.log(error)))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest))
}

function cacheBust() {
    return src(paths.cachebust.src)
    .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
    .pipe(dest(paths.cachebust.dest));
}

function watcher() {
    /* watch(paths.html.src, series(cacheBust)); */
    watch(paths.html.src, series(minifyHtml, cacheBust))
    /* watch(paths.images.src, parallel(minifyImage, cacheBust)) */
    watch(paths.styles.src, parallel(compileStyles, cacheBust))
    watch(paths.scripts.src, parallel(minifyScripts, cacheBust))
}

function clean() {
    return del(paths.images.dest)
}

function copyVideo() {
  return src(paths.videos.src)
  .pipe(dest(paths.videos.dest))
}

function copyImage() {
  return src(paths.images.src)
  .pipe(dest(paths.images.dest))
}

// Export tasks to make them public
exports.minifyHtml = minifyHtml
/* exports.imagemin = imagemin
exports.minifyImage = minifyImage  */
exports.compileStyles = compileStyles
exports.minifyScripts = minifyScripts
exports.copyVideo = copyVideo
exports.copyImage = copyImage
exports.cacheBust = cacheBust
exports.watcher = watcher
exports.default = series(
    clean,
    parallel(minifyHtml, compileStyles, minifyScripts, copyVideo, copyImage),
    cacheBust,
    watcher
)