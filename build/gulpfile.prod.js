var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var template = require('gulp-template');
var util = require("gulp-util")

//======= gulp build 打包资源 ===============

function prod() {
	var appName = util.env.name || 'special';
	var Config = require('./gulpfile.config.js')(appName);

	/**
	 * @description HTML处理
	 */
	gulp.task('html', function() {
		return gulp.src(Config.html.src)
			.pipe(gulp.dest(Config.html.dist));
	});

	/**
	 * @description CSS样式处理
	 */
	gulp.task('css', function() {
		return gulp.src(Config.css.src)
			.pipe(autoprefixer('last 2 version'))
			// .pipe(gulp.dest(Config.css.dist))
			// .pipe(rename({
			// 	suffix: '.min'
			// }))
			.pipe(cssnano()) //执行压缩
			.pipe(gulp.dest(Config.css.dist));
	});

	/**
	 * @description js处理
	 */
	gulp.task('js', function() {
		var env = util.env.env || 'special';
		return gulp.src(Config.js.src)
			// .pipe(jshint('.jshintrc'))
			// .pipe(jshint.reporter('default'))
			.pipe(template({ env: env }))
			// .pipe(gulp.dest(Config.js.dist))
			// .pipe(rename({
			// 	suffix: '.min'
			// }))
			.pipe(uglify())
			.pipe(gulp.dest(Config.js.dist));
	});

	/**
	 * @description 合并所有js文件并做压缩处理
	 */
	gulp.task('js-concat', function() {
		return gulp.src(Config.js.src)
			.pipe(jshint('.jshintrc'))
			.pipe(jshint.reporter('default'))
			.pipe(concat(Config.js.build_name))
			// .pipe(gulp.dest(Config.js.dist))
			// .pipe(rename({
			// 	suffix: '.min'
			// }))
			.pipe(uglify())
			.pipe(gulp.dest(Config.js.dist));
	});

	/**
	 * @description 图片处理
	 */
	gulp.task('images', function() {
		return gulp.src(Config.img.src)
			.pipe(imagemin({
				optimizationLevel: 3,
				progressive: true,
				interlaced: true
			}))
			.pipe(gulp.dest(Config.img.dist));
	});
	gulp.task('build', ['html', 'css', 'js', 'images']);
}
module.exports = prod;
