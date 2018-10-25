module.exports = function(appName) {
	// 源文件目录
	var src_dir = './src/' + appName + '/';
	// 文件处理后存放的目录
	var dist_dir = './dist/' + appName + '/';
	// 目标路径下的所有文件
	var dist_files = dist_dir + '**';
	// 公共文件目录
	var com_dir = './_tp/';

	return {
		src: src_dir,
		dist: dist_dir,
		dist_files: dist_files,

		html: {
			dir: src_dir,
			src: src_dir + '*.html',
			dist: dist_dir
		},

		css: {
			dir: src_dir + 'css',
			src: src_dir + 'css/**/*.css',
			dist: dist_dir + 'css'
		},

		js: {
			dir: src_dir + 'js',
			src: src_dir + 'js/**/*.js',
			dist: dist_dir + 'js',
			build_name: 'build.js'
		},

		img: {
			dir: src_dir + 'images',
			src: src_dir + 'images/**/*',
			dist: dist_dir + 'images'
		},

		common: {
			src: com_dir + '/*.js',
			dist: src_dir + 'js',
			tp_src: com_dir + '/*.html',
			tp_dist: src_dir,
			css_src: com_dir + '/*.css',
			css_dist: src_dir + 'css',
		}
	}
}
