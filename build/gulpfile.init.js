var gulp = require('gulp');
var util = require("gulp-util");
var mkdirp = require('mkdirp');

//======= gulp init 初始化项目结构 ===============
function init() {
	/**
	 * @description 初始化项目结构
	 */
	gulp.task('initdir', function() {
		var appName = util.env.name || 'special';
		var Config = require('./gulpfile.config.js')(appName);
		var dirs = [Config.html.dir, Config.css.dir, Config.js.dir, Config.img.dir];
		dirs.forEach(dir => {
			mkdirp.sync(dir);
		});
	});
	gulp.task('ctp', ['initdir'], function() {
		var appName = util.env.name || 'special';
		var Config = require('./gulpfile.config.js')(appName);
		gulp.src(Config.common.src)
			.pipe(gulp.dest(Config.common.dist));
		gulp.src(Config.common.tp_src)
			.pipe(gulp.dest(Config.common.tp_dist));
		gulp.src(Config.common.css_src)
			.pipe(gulp.dest(Config.common.css_dist));
	})
	gulp.task('init', ['ctp']);
}
module.exports = init;
