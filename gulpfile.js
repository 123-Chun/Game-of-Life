// grab our gulp packages
var gulp  = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var browserify = require('browserify');

gulp.task('default', ['watch']);

gulp.task('watch', function() {

	browserSync.init({
	    proxy: "game-of-life.dev"
	});

	gulp.watch("script/*.js").on("change",reload);
	gulp.watch("index.html").on("change", reload);

});

gulp.task('browserify', function() {

	browserify('script/grid.js','js/');
})