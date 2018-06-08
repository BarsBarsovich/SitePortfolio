const gulp = require('gulp'),
      pug = require('gulp-pug'), 
      postcss = require('gulp-postcss'),
      sourcemaps = require('gulp-sourcemaps'), 
      rename = require('gulp-rename'), 
      del = require('del'), 
      browserSync = require('browser-sync').create(), 
      gulpCopy = require('gulp-copy');

const paths = {
    root :'./dist',
    templates:{
        pages : './src/views/pages/*.pug',
        styles : './src/assets/styles/**/*.scss',
        dest: './dist'
    }, 
    styles:{
        main: './src/assets/styles/main.scss',
        styles: './src/assets/styles/**/**.scss',
        dest: './dist/assets/styles'
    },
    img:{
        main: './src/assets/images/*',
        dest: './dist/assets/images' 
    }
}      

gulp.task('default', gulp.series(
    clean, 
    gulp.parallel(styles,templates, images), 
    gulp.parallel(watch, server)
));

function watch() {
    gulp.watch(paths.styles.styles, styles);
    gulp.watch(paths.templates.pages, templates);
}

//compile pug
function templates(){
    return gulp.src(paths.templates.pages)
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(paths.templates.dest));
}

//copy images
function images(){
    console.log(paths.img.main);
    return  gulp
    .src(paths.img.main)
    .pipe(gulp.dest(paths.img.dest));   
}

//compile css
function styles(){
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(require("./postcss.config")))
        .pipe(sourcemaps.write())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest(paths.styles.dest));
}

//rmdir
function clean(){
    return del(paths.root);
}

// следим за build и релоадим браузер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;