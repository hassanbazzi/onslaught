// Initialize Gulp
var gulp = require('gulp'),
// Add SASS support
sass = require('gulp-ruby-sass'),
// Add Autoprefixer for CSS prefixes
autoprefixer = require('gulp-autoprefixer'),
// Add CSS Minifier
minifycss = require('gulp-minify-css'),
// Add Gulp Services
rename = require('gulp-rename'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
// Add LiveReload to preview changes immediately in the browser on compile
livereload = require('gulp-livereload'),
lr = require('tiny-lr'),
server = lr();
// Initialize the styles task
gulp.task('styles', function() {
// GET the app.scss file
return gulp.src('_resources/scss/app.scss')
// Run the SASS compiler and autoprefixer
.pipe(sass({ style: 'compact', 'sourcemap=none': true}))
.on('error', function (error) {
            console.error(error);
            this.emit('end');
        })
.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4'))
// Place it in the css directory
.pipe(gulp.dest('_resources/css'))
.pipe(notify({ message: 'Outputted compiled CSS file' }))
// Minify it and output it
.pipe(rename({ suffix: '.min' }))
.pipe(minifycss())
.pipe(gulp.dest('_resources/css'))
.pipe(notify({ message: 'Outputted Minified CSS.' }))
// Run livereload when done
.pipe(livereload(server))
.pipe(notify({ message: 'Style task completed.' }));
});
// Initialize the Watch Task
gulp.task('watch', function() {
server.listen(35729, function (e) {
if (e) {
return console.log(e)
};

var watcher = gulp.watch(['_resources/scss/*.scss'], ['styles']);

watcher.on('change', function(event) {
console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});
});
});
