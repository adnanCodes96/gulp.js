const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');

// Create functions

//Compile css
function compileScss(){
    return src('src/css/*.scss')
    .pipe(sass())
    .pipe(prefix('last 2 versions'))
    .pipe(minify())
    .pipe(dest('dist/css'))
}

//Minify js
function minifyJs(){
    return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('dist/js/'))
}

//Optimize images
function optimizeImg(){
    return src('src/images/*.{jpg,png}')
    .pipe(imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 })
    ]))
    .pipe(dest('dist/images'))
}

//Convert jpg, png images to webp
function webpImage(){
    return src('dist/images/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
}

function fonts() {
    return src('src/fonts/*.woff2')
    .pipe(dest('dist/fonts/'))
}

// Create Watch Task
function watchTask(){
    watch('src/css/*.scss', compileScss);
    watch('src/js/*.js', minifyJs);
    watch('src/images/*.{jpg,png}', optimizeImg);
    watch('dist/images/*.{jpg,png}', webpImage);
    watch('src/fonts/*.woff2', fonts);
}



// Default gulp
exports.default = series(
    compileScss,
    minifyJs,
    optimizeImg,
    webpImage,
    fonts,
    watchTask
);