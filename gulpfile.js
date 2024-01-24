const {src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


function css(done){
    //compilar sass
    //pasos: 1- Indentificar archivo, 2 - Compilarlo, 3 Guardar el .css
    
    src('src/scss/app.scss')
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('build/css'));
    done();
}

function dev(){
    watch('src/scss/**/*.scss', css);
}

function tareaDefault(){
    console.log('soy la tarea def');
}

exports.css = css;
exports.dev = dev;
exports.default = series(css, dev);

//series - Se inicia una tarea y hasta que finaliza se inicia la siguiente (Dejar a tarea con watch hasta el final)
//parallel - Todas inician al mismo tiempo