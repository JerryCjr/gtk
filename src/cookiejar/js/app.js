define(['useImgPreload', 'preload', 'gameCountDown', 'request', 'map'], function(useImgPreload, preload, gameCountDown, request, map) {
	// 地图
	// map.map()

	var staticState = [
		"https://s0.babyfs.cn/op/arch/52/b16fad474da540a3b2238897da7d73c0/bgm03.mp3",
		"https://s0.babyfs.cn/op/arch/1/65da6abc28f04c4195a166b017588243/music/right2.mp3",
		"https://s0.babyfs.cn/op/arch/1/65da6abc28f04c4195a166b017588243/music/wrong0.mp3",
		"https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3",
		"https://s0.babyfs.cn/op/arch/1/65da6abc28f04c4195a166b017588243/music/openAudio02.mp3",
		"https://s0.babyfs.cn/op/arch/47/2e11d313709345b68ee7203b0f7a8787/eitheror01/bg.jpg",
		"http://i.s.babyfs.cn/op/47/51a884d184274252a8d37e986bb7eecd.png"
	];

	//自定义数据流
	// var MEDcountDownData = {
	// 	"1": {
	// 		"frontText": "peach",
	// 		"correctImg": "http://i.s.babyfs.cn/19926cef40dd4bd8a1b61bd82f6511a5.png",
	// 		"wrongImg": "http://i.s.babyfs.cn/56004a2a189b4c39bfecab205fa52c73.png",
	// 		'frontAudio': 'https://a.s.babyfs.cn/3da79323a9b134f38687c63dda8c89c3e3127ef8.mp3'
	// 	},
	// 	"2": {
	// 		"frontText": "peekaboo",
	// 		"correctImg": "http://i.s.babyfs.cn/19926cef40dd4bd8a1b61bd82f6511a5.png",
	// 		"wrongImg": "http://i.s.babyfs.cn/56004a2a189b4c39bfecab205fa52c73.png",
	// 		'frontAudio': 'http://live.babyfs.cn/web/H5/ck/2017/09/templateTool/audio/wordPeekaboo.mp3'
	// 	},
	// 	"public": {
	// 		"gameTimes": 2
	// 	}
	// };
	// var RESPONSEDATA = MEDcountDownData;
	// preload.mainGame(RESPONSEDATA, '', function(num2, theImages) {
	// 	//调用 图片预加载 的方法。
	// 	theImages.concat(staticState)
	// 	useImgPreload.preload(num2, theImages, function() {
	// 		gameCountDown.countDownStart(RESPONSEDATA, '')
	// 	})
	// })

	/**
	 * iframe通信得到的数据
	 */
	window.addEventListener('message', function(event) {
		if (event.data) {
			preload.mainGame(event.data, '', function(num2, theImages) {
				//调用 图片预加载 的方法。
				theImages.concat(staticState)
				useImgPreload.preload(num2, theImages, function() {
					gameCountDown.countDownStart(event.data, '')
				})
			})
		} else {
			console.log('event.data 不存在')
		}
	});

	/**
	 * callback
	 */
	var callback = function(res) {
		// 模板id 模板实例id
		window.tem_id = res.data.entity.templateId
		window.tem_ins_id = res.data.entity.id
		preload.mainGame(res.data.parsed.data, res.data.entity.type, function(num2, theImages) {
			//调用 图片预加载 的方法。
			theImages.concat(staticState)
			useImgPreload.preload(num2, theImages, function() {
				gameCountDown.countDownStart(res.data.parsed.data, res.data.entity.type)
			})
		})
	}

	/**
	 *
	 */
	var a = <%=env%>
	var baseUrl
	if (a == 1) {
		baseUrl = 'http://192.168.0.5/api/evaluation/get_tem_ins'
	} else {
		baseUrl = 'https://m.babyfs.cn/api/evaluation/get_tem_ins'
	}
	var reg = /\?tem_ins_id=/
	var str = String(window.location)
	if (reg.test(str)) {
		var index = str.match(reg).index
		var _getUrl = baseUrl + str.slice(index, str.length)
		request.fetchData(_getUrl, callback)
	}
});
