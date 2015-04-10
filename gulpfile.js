var gulp = require('gulp'),

    // live reload and sync across browsers
    browserSync = require('browser-sync'),
    reload = browserSync.reload,

    // inline CSS
    inlineCss = require('gulp-inline-css'),

    // rename files
    rename = require('gulp-rename'),

    // notifications
    notify = require('gulp-notify'),
    
    // scss compiler
    sass = require('gulp-ruby-sass'),

    // minify css
    minifycss = require('gulp-minify-css'),

    // autoprefix css
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer-core');




// Run browser sync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            // your project's build folder
            baseDir: "build/"
        }
    })
});




/*
// inline css
gulp.task('inline', function() {
    return gulp.src('build/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('build/'));
});
*/
 



// Compile SASS
gulp.task('styles', function() {
  return sass('development/scss/main.scss', {
    // we use susy, feel free to remove this
    require: "susy",
    style: "expanded"
  })
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream:true}))
    .pipe(notify({ message: 'Styles done.' }));
});



// Watch for changes
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('development/scss/**/*.scss', ['styles']);

    // Watch .html files or .md files
    gulp.watch('build/*.html', [browserSync.reload]);
});
 
 


// Run gulp in terminal to start all of the following processes
gulp.task('default', ['styles', 'browser-sync', 'watch']);






