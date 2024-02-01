const {src, dest, watch, series, parallel } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css(done){
    //compilar sass
    //pasos: 1- Indentificar archivo, 2 - Compilarlo, 3 Guardar el .css
    
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
    done();
}

function imagenes(){
    return src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'));
    
}

function versionWebp(){
    return src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('build/img'));
}

function versionAvif(){
    return src('src/img/**/*.{png,jpg}')
    .pipe(avif())
    .pipe(dest('build/img'));
}

function dev(){
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes); //por si se agregan nuevas imagenes
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(css, dev);

//series - Se inicia una tarea y hasta que finaliza se inicia la siguiente (Dejar a tarea con watch hasta el final)
//parallel - Todas inician al mismo tiempo