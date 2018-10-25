var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var template = require('gulp-template');
var util = require("gulp-util");

//======= gulp dev 开发环境下 ===============
function dev() {
  var appName = util.env.name || 'special';
  var Config = require('./gulpfile.config.js')(appName);

  /**
   * @description HTML处理
   */
  gulp.task('html:dev', function () {
    return gulp.src(Config.html.src)
      .pipe(gulp.dest(Config.html.dist))
      .pipe(reload({
        stream: true
      }));
  });

  /**
   * @description CSS样式处理
   */
  gulp.task('css:dev', function () {
    return gulp.src(Config.css.src)
      .pipe(gulp.dest(Config.css.dist))
      .pipe(reload({
        stream: true
      }));
  });

  /**
   * @description js处理
   */
  gulp.task('js:dev', function () {
    var env = util.env.env || 'special';
    return gulp.src(Config.js.src)
      // .pipe(jshint('.jshintrc'))
      // .pipe(jshint.reporter('default'))
      .pipe(template({
        env: env
      }))
      .pipe(gulp.dest(Config.js.dist))
      .pipe(reload({
        stream: true
      }));
  });

  /**
   * @description 图片处理
   */
  gulp.task('images:dev', function () {
    return gulp.src(Config.img.src)
      .pipe(imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(Config.img.dist))
      .pipe(reload({
        stream: true
      }));
  });

  gulp.task('dev', ['html:dev', 'css:dev', 'js:dev', 'images:dev'], function () {
    browserSync.init({
      server: {
        baseDir: Config.dist
      },
      notify: false
    });
    // Watch .html files
    gulp.watch(Config.html.src, ['html:dev']);
    // Watch .css files
    gulp.watch(Config.css.src, ['css:dev']);
    // Watch .js files
    gulp.watch(Config.js.src, ['js:dev']);
    // Watch image files
    gulp.watch(Config.img.src, ['images:dev']);
  });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;