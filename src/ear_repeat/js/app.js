define(['zepto', 'index', 'request', 'map', 'preload', 'common'], function(zepto, index, request, map, preload, common) {
    // 地图
    // map.map()

    var staticState = [
        "https://s0.babyfs.cn/op/arch/1/256e2a824f1a4229a2911cb432507bc0/Cpp.mp3",
        "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/pp.mp3",
        "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3",
        "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/bubble.mp3",
        "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/hengping.png",
        "https://s0.babyfs.cn/op/arch/1/3133320aae864dbb815b744e5e98057f/game/bg.png",
        "https://s0.babyfs.cn/op/arch/48/6bbe78428e34402f90c610601752f52b/pp/li1.png",
        "https://s0.babyfs.cn/op/arch/48/6bbe78428e34402f90c610601752f52b/pp/li2.png",
        "https://s0.babyfs.cn/op/arch/48/6bbe78428e34402f90c610601752f52b/pp/li3.png"
    ];
    //自定义数据流
    var MEDcountDownData = {
        "1": {
            "clickedAudioSrc": {
                "element01": "http://live.babyfs.cn/web/H5/xl/template/2017/9/MED1/audio/baby.mp3",
                "element02": "http://live.babyfs.cn/web/H5/xl/template/2017/9/MED1/audio/peekaboo.mp3",
                "element03": "http://live.babyfs.cn/web/H5/xl/template/2017/9/MED1/audio/see.mp3"
            },
            "afterClickedImgSrc": {
                "element01": "https://s0.babyfs.cn/op/arch/48/8571b2cf912a4af18ac0b51cef12f13d/pp/baby.png",
                "element02": "https://s0.babyfs.cn/op/arch/48/8571b2cf912a4af18ac0b51cef12f13d/pp/peekaboo.png",
                "element03": "https://s0.babyfs.cn/op/arch/48/8571b2cf912a4af18ac0b51cef12f13d/pp/see.png"
            }
        },
        "public": {
            "gameTimes": 1
        }
    };
    var RESPONSEDATA = MEDcountDownData;

    preload.mainGame(RESPONSEDATA, '', function(num2, theImages) {
        //调用 图片预加载 的方法。
        theImages.concat(staticState)
        common.preload(theImages, function() {
            document.getElementById('loading').style.display = 'none';
            index.countDownStart(RESPONSEDATA, '')
        })
    })

    /**
     * 根据不同的环境变量请求数据
     */
    var a = <%=env%>
 	var baseUrl
    var reg = /\?tem_ins_id=/
    var str = String(window.location)
 	if (a == 1) {
 		baseUrl = 'http://192.168.0.5/api/evaluation/get_tem_ins'
 	} else {
 		baseUrl = 'https://m.babyfs.cn/api/evaluation/get_tem_ins'
 	}
    if (reg.test(str)) {
        var index = str.match(reg).index
        var _getUrl = baseUrl + str.slice(index, str.length)
        console.log(_getUrl);
        request.fetchData(_getUrl, callback)
    }

    /**
     * @func callback 接收到数据后的回调方法
     */
    var callback = function(res) {
        // 模板id 模板实例id
        window.tem_id = res.data.entity.templateId
        window.tem_ins_id = res.data.entity.id
        preload.mainGame(event.data, res.data.entity.type, function(num2, theImages) {
            theImages.concat(staticState)
            common.preload(theImages, function() {
                document.getElementById('loading').style.display = 'none';
                index.countDownStart(res.data.parsed.data, res.data.entity.type)
            })
        })
    }

    /**
     * @description iframe通信得到的数据
     */
    window.addEventListener('message', function(event) {
        if (event.data) {
            preload.mainGame(event.data, '', function(num2, theImages) {
                //调用 图片预加载 的方法。
                theImages.concat(staticState)
                common.preload(theImages, function() {
                    document.getElementById('loading').style.display = 'none';
                    index.countDownStart(event.data)
                })
            })
        } else {
            console.log('event.data 不存在')
        }
    });
});
