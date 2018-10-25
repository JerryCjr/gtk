define(['setScreenHoriz', 'jquery', 'common', 'starts'], function(setScreenHoriz, jquery, common, starts) {
	//
	common.noScale()

	var countDownStart = function(responseData, type) {
		var MEDnumber = 0;
		var MEDCountDownData = null;
		//获取dom元素
		var bgAudio = document.getElementById('bgAudio');
		var A1 = document.getElementById("audio01");
		var A2 = document.getElementById("audio02");
		var clickLimit = false;

		//实例化公用的方法--交互相关
		var utils = new common.Utils('home-page', responseData);

		//地图相关获取 qid type totalPage
		window.qid = utils.mapInterception();
		window.type = type;
		window.totalPage = responseData.public.gameTimes;

		//调用点击游戏封面，封面消失函数
		utils.cover()

		//调用检测用户横竖屏函数
		utils.detectionScreen(function() {
			setTimeout(function() {
				common.autoPlayAudio(bgAudio, 'https://s0.babyfs.cn/op/arch/52/b16fad474da540a3b2238897da7d73c0/bgm03.mp3')
				Initialization()
				optionClickEvent()
			}, 0)
		})

		//获取每一页数据的下标,并且提取数字
		var key = utils.pageIndex().join('').replace(/[^0-9]/g, '').split('');

		//截取路径字符串,判断当前是第几个游戏
		var xIndex = utils.urlSplice().xIndex;
		var xTotal = utils.urlSplice().xTotal;
		setTimeout(function() {
			$('.rule').attr("src", "https://s0.babyfs.cn/op/arch/1/3133320aae864dbb815b744e5e98057f/game/rule.png").show();
		}, 50)
		$('.rule').click(function() {
			if (window.qid) {
				try {
					MtaH5.clickStat('gameTemp', {
						'map': window.tem_id + ',' + window.tem_ins_id
					})
				} catch (e) {
					console.log(e);
				}
			} else {
				try {
					MtaH5.clickStat('gameTemp', {
						'single': window.tem_id + ',' + window.tem_ins_id
					})
				} catch (e) {
					console.log(e);
				}
			}
			$('.mack1').hide()
			$('.rule').hide()
			bgAudio.src = 'https://s0.babyfs.cn/op/arch/52/b16fad474da540a3b2238897da7d73c0/bgm03.mp3'
			bgAudio.play();
			A1.src = 'https://s0.babyfs.cn/op/arch/1/65da6abc28f04c4195a166b017588243/music/openAudio02.mp3';
			A1.play();
			// click事件
			$("#audio01").bind("ended", function() {
				$("#audio01").unbind("ended");
				clickLimit = true;
				optionClickEvent();
				A1.play();
			})
		})

		// Initialization
		function Initialization(obj) {
			window.rightCount = 0;
			var strHtml = '<div class="text" id="text"><h2><span></span><em></em></h2></div>\
          	<span class="option optionL" data-num=""><img src=""></span>\
          	<span class="option optionR" data-num=""><img src=""></span>\
          	<p class="imgBig"><img src=""></p>';
			$("#content").html(strHtml);
			$('.content').css("background-image", "url(https://s0.babyfs.cn/op/arch/47/2e11d313709345b68ee7203b0f7a8787/eitheror01/bg.jpg)");
			MEDCountDownData = responseData[key[MEDnumber]];

			// 调取数据
			dataObtain();

			// 暂存游戏规则相关 不同页数不同的自定义分数值
			mapScore(window.type, MEDCountDownData)
			// 暂存游戏规则相关 不同页数不同的自定义分数值
		}

		// 调取数据
		function dataObtain() {
			$("#text span").html(MEDCountDownData.frontText);

			var optionNum = Math.floor(Math.random() * 10);
			if (optionNum > 5) {
				$(".optionL").attr("data-num", 1);
				$(".optionR").attr("data-num", 0);
				$(".optionL img").attr("src", MEDCountDownData.correctImg);
				$(".optionR img").attr("src", MEDCountDownData.wrongImg);
			} else {
				$(".optionL").attr("data-num", 0);
				$(".optionR").attr("data-num", 1);
				$(".optionL img").attr("src", MEDCountDownData.wrongImg);
				$(".optionR img").attr("src", MEDCountDownData.correctImg);
			}
			var leftImgNum = $(".optionL").attr("data-num");
			if (leftImgNum == 1) {
				$(".imgBig img").attr("src", $(".optionL img").attr("src")).show();
			} else {
				$(".imgBig img").attr("src", $(".optionR img").attr("src")).show();
			}

			$('.mack').hide()
		}

		// optionClickEvent
		function optionClickEvent() {
			A1.src = MEDCountDownData.frontAudio;
			// A1.play()
			$("#text span").click(function() {
				A1.play();
			})

			if (clickLimit) {
				$(".option").unbind("click").click(function() {
					var dataNum = $(this).attr("data-num");
					if (dataNum == 1) {
						$(".option").unbind("click");
						$("#text span").unbind("click");
						A2.src = "https://s0.babyfs.cn/op/arch/1/65da6abc28f04c4195a166b017588243/music/right2.mp3";
						A2.play();
						$(".option").fadeOut();
						$(".imgBig").addClass("imgBig-animate").css("opacity",1);
						rightCount = 1;
						$("#audio02").bind("ended",function(){
							$("#audio02").unbind("ended");
							manyPage();
						});
					} else {
						A2.src = "https://s0.babyfs.cn/op/arch/1/65da6abc28f04c4195a166b017588243/music/wrong0.mp3";
						A2.play();
						$(this).addClass("wrong-aniamte");
						setTimeout(function() {
							$(".option").removeClass("wrong-aniamte");
						}, 1000);
						rightCount = 0;
					}
				})
			}
		}

		// repeat
		function manyPage() {
			setTimeout(function() {
				var gameTimes = responseData.public.gameTimes;
				// 地图相关判断总页数是不是只有一页
				if (gameTimes == 1) {
					window.page = 1
				} else {
					window.page = MEDnumber + 1
				}
				// 正确计数的赋值
				window.correctCount = 1;
				console.log(window.correctCount)
				// 地图相关判断总页数是不是只有一页

				if (MEDnumber < gameTimes - 1) {
					// $(".shadePage").show();
					MEDnumber++;

					// 判断如果是来自地图 游戏结束后传分
					if (window.qid) {
						submitScore(window.qid, window.type, window.page, window.totalPage, window.perScore, window.correctCount, window.totalScore)
					}
					// 判断如果是来自地图 游戏结束后传分
					Initialization();
					optionClickEvent();
					A1.play();
				} else {
					$('.modalBox,.mack1').show()
					if (xIndex == xTotal) {
						A1.src = "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3";
						A1.play();
						bgAudio.src='';
						// 判断如果是来自地图 游戏结束后传分
						if (window.qid) {
							submitScore(window.qid, window.type, window.page, window.totalPage, window.perScore, window.correctCount, window.totalScore)
						}else{
							//判断如果是来自地图 游戏结束后传分
							var num = 2; //0代表一个星星、1代表两个星星、2代表三个星星
							var gamePage = true; //true代表最后一页并且是最后一个游戏，false代表是最后一页但不是最后一个游戏。
							var checkPoint = false;  //true代表最后一个关卡，false代表不是最后一个关卡
							setTimeout(function() {
								A1.src = "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3";
								A1.play();
								bgAudio.src='';
								window.starRating('modalBox', num, gamePage, checkPoint)
								window.buttonClick(1)
							}, 500)
						}

					} else {
						var num = 2; //0代表一个星星、1代表两个星星、2代表三个星星
						var gamePage = false; //true代表最后一页并且是最后一个游戏，false代表是最后一页但不是最后一个游戏。
						var checkPoint = false; //true代表最后一个关卡，false代表不是最后一个关卡
						setTimeout(function() {
							A1.src = "https://s0.babyfs.cn/op/arch/1/1a11e45e0cb9410482cd6d7c76dbe693/paopao/finish0.mp3";
							A1.play();
							bgAudio.src='';
							window.starRating('modalBox', num, gamePage, checkPoint)
							window.buttonClick(0)
						}, 500)
					}
				}
			}, 2000);
		}

		window.buttonClick = function(checkPoint) {
			//onceMore
			$('.again').click(function() {
				// 判断如果是来自地图 且是最后一道题
				if (window.qid && xIndex == xTotal) {
					parent.replayAll()
				} else {
					window.location.reload();
					parent.replayThis()
				}
				// 判断如果是来自地图 且是最后一道题
			})
			//下一页
			$('.next').click(function() {
				if (checkPoint) {
					if (window.qid) {
						// 跳到下一个关卡
						goNextTask()
					}
				} else {
					if (window.qid) {
						// 判断如果是来自地图 游戏结束后传分
						submitScore(window.qid, window.type, window.page, window.totalPage, window.perScore, window.correctCount, window.totalScore)
					} else {
						// 是来自集训营课程 游戏结束后调用父方法进行下个游戏
						parent.handleGoing(xIndex)
					}
				}

			})
			//返回主页
			$('.home').click(function() {
				parent.location.reload()
			})
		}

	}

	return {
		countDownStart: countDownStart
	}
})
