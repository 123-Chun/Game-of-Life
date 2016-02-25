// grab our gulp packages
var gulp  = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', ['watch']);

gulp.task('watch', function() {

	browserSync.init({
	    proxy: "game-of-life.dev"
	});

	gulp.watch("script/*.js").on("change",reload);
	gulp.watch("index.html").on("change", reload);

});

// gulp.task('browserify', function() {

// 	browserify('script/grid.js').bundle();
// })
// 
gulp.task('browserify', function() {
    return browserify('script/gol.js' -s)
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./js/'));
});