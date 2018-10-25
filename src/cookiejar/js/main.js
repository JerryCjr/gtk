require.config({
	baseUrl: './js',
	paths: {
		jquery: 'https://s0.babyfs.cn/m/template/common/jquery.min',
		imgpreload: 'https://s0.babyfs.cn/m/template/common/jquery.imgpreload.min',
		useImgPreload: 'https://s0.babyfs.cn/op/arch/1/8302c4bb3a7a401e8cf066f6e88d02a6/useImgPreload',
		setScreenHoriz: 'https://s0.babyfs.cn/m/template/common/setScreenHoriz',
		request: 'https://s0.babyfs.cn/op/arch/1/20f10b632d634a7fb5114e44e2b64992/RequestData',
		common: 'https://s0.babyfs.cn/op/arch/1/90a794a07b8947c097be240796bc0166/_commonjs/common',
		starts: 'https://s0.babyfs.cn/op/arch/48/16aec8d000d8498cb4177299561b5262/STARTS/starts',
		map: 'https://s0.babyfs.cn/op/arch/48/bc73ebc4a9d6435e8dbc360e1cb2313c/map/map',
		preload: 'https://s0.babyfs.cn/op/arch/1/e1bf340167224d9eb025aa0105c22f79/preload',
		gameCountDown: 'gameCountDown',
		myApp: 'app',
	},
	shim: {
		'imgpreload': {
			deps: ['jquery'],
			exports: 'imgpreload'
		}
	}
})

require(['myApp'])
