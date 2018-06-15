const gulp = require('gulp'),
    pug = require('gulp-pug'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    del = require('del'),
    browserSync = require('browser-sync').create(),
    gulpCopy = require('gulp-copy'),
    ghPages = require('gulp-gh-pages');

const $gp = require("gulp-load-plugins")();

const paths = {
    root: './build',
    templates: {
        pages: './src/views/pages/*.pug',
        styles: './src/assets/styles/**/*.scss',
        dest: './build'
    },
    styles: {
        main: './src/assets/styles/main.scss',
        styles: './src/assets/styles/**/**.scss',
        dest: './build/assets/styles'
    },
    img: {
        main: './src/assets/images/*',
        dest: './build/assets/images'
    },
    fonts: {
        main: './src/assets/fonts/*',
        dest: './build/assets/fonts'
    }
}

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, sprite, fonts),
    gulp.parallel(watch, server)
));

function watch() {
    gulp.watch(paths.styles.styles, styles);
    gulp.watch(paths.templates.pages, templates);
}

//compile pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.templates.dest));
}

//copy images
function images() {
    return gulp
        .src(paths.img.main)
        .pipe(gulp.dest(paths.img.dest));
}

//compile css
function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(require("./postcss.config")))
        .pipe(sourcemaps.write())
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest(paths.styles.dest));
}

//rmdir
function clean() {
    return del(paths.root);
}

// следим за build и релоадим браузер
function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

// спрайт иконок
function sprite() {
    return gulp.src('./src/assets/images/icons/*.svg')
        .pipe(
            $gp.svgmin({
                js2svg: {
                    pretty: true
                }
            })
        )
        .pipe(
            $gp.cheerio({
                run($) {
                    $("[fill], [stroke], [style], [width], [height]")
                        .removeAttr("fill")
                        .removeAttr("stroke")
                        .removeAttr("style")
                        .removeAttr("width")
                        .removeAttr("height");
                },
                parserOptions: { xmlMode: true }
            })
        )
        .pipe($gp.replace("&gt;", ">"))
        .pipe(
            $gp.svgSprite({
                mode: {
                    symbol: {
                        sprite: "../sprite.svg"
                    }
                }
            })
        )
        .pipe(gulp.dest('./build/assets/images/icons'));
}


function fonts() {
    return gulp.src(paths.fonts.main)
        .pipe(gulp.dest(paths.fonts.dest));
}


function deploy() {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
}


exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;
exports.sprite = sprite;
exports.fonts = fonts
exports.deploy = deploy;