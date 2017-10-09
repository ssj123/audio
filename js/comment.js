var re = "[00:01.02]动物世界[00:01.89][00:02.71]作词:薛之谦[00:03.67]作曲:郭顶[00:04.54]演唱:薛之谦[00:05.34][00:11.06]东打一下西戳一下[00:13.67]动物未必需要尖牙[00:16.04]示爱的方法有礼貌或是我管它[00:21.47]要将情人一口吞下[00:23.88]还要显得温文尔雅[00:26.59]螳螂委屈的展示旧伤疤[00:31.16][00:31.61]求偶时候一惊一乍[00:34.33]因为害怕时常倒挂[00:36.83]走投无路的情况下舍弃了尾巴[00:42.14]如果不能将它同化就寄生于它 大不了一同腐化[00:50.94][00:51.20]努力进化 笑动物世界都太假[00:57.16]祖先 已磨去爪牙[01:01.36]相爱相杀 一定有更好的办法[01:07.41]攀比一下 谁先跪下[01:11.36][01:11.84]不再进化 动物世界里都太傻[01:17.92]为情表现到浮夸[01:22.99]得到了你就该丢下 人性来不及粉刷[01:27.99]所以啊 人总患孤寡[01:32.40][01:54.75]麋鹿本来约在树下[01:57.14]说好一起浪迹天涯[01:59.70]系上铃铛还在往那个方向挣扎[02:04.92]如果有只豺狼它英勇披上婚纱 同伴笑他读过童话[02:14.02][02:23.05]别再进化 别让动物世界太假[02:28.96]我们 该露出爪牙[02:32.96]相爱相杀 别再想更好的办法[02:38.96]优胜劣汰 自舔伤疤[02:42.89][02:43.16]假装进化 拼命想和动物有差[02:48.75]玩一出高贵优雅[02:54.13]在人们腐烂的欲望下 兽性来不及抹杀[02:58.56]算了吧 懒得去挣扎[03:04.60][03:04.88]人类用沙 想捏出梦里通天塔[03:10.28]为贪念不惜代价[03:15.78]驾驭着昂贵的木马 巢穴一层层叠加[03:20.16]最后啊 却一丝不挂　　别害怕 我们都孤寡[03:33.80][03:34.19]制作人：郭顶[03:34.39]编曲/钢琴/贝斯：陈迪[03:34.58]鼓：王斌[03:34.76]弦乐：国际首席爱乐乐团[03:34.96]第一小提琴：李朋 王大毛庞阔 张浩 杨爽 李曦 刘潇 高言 杨思宇 倪冰雪[03:35.15]第二小提琴：简蓓 阎红 张晨迪 唐昕 侯宇红 张雷 徐文超[03:35.32]中提琴：何辉 毕芳 武文豪 陈欣欣 王羽沛[03:35.50]大提琴：张平 郎莹 陈俊杰 孙艺 邵鑫[03:35.88]低音提琴：周旭 段然[03:36.05]录音：汝文博 （Big J Studio. beijing.)[03:36.25]混音：赵靖（Big J Studio. beijing.）[03:36.48]母带：Tom Coyne （Sterlingsound NYC.）[03:36.69]"

 function parseLyric(text) {
        //将文本分隔成一行一行，存入数组
        var lines = text.split('\n'),
        //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
                pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
        //保存最终结果的数组
                result = [];
        //去掉不含时间的行
        while (!pattern.test(lines[0])) {
            lines = lines.slice(1);
        };
        //上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
        lines[lines.length - 1].length === 0 && lines.pop();
        lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
            //提取出时间[xx:xx.xx]
            var time = v.match(pattern),
            //提取歌词
                    value = v.replace(pattern, '');
            //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
            time.forEach(function(v1, i1, a1) {
                //去掉时间里的中括号得到xx:xx.xx
                var t = v1.slice(1, -1).split(':');
                //将结果压入最终数组
                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
            });
        });
        //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
        result.sort(function(a, b) {
            return a[0] - b[0];
        });
        return result;
    }

    var lyric = parseLyric(re);

    //获取页面上的audio标签
	var audio = document.getElementsByTagName('audio')[0];
    //显示歌词的元素
   var lyricContainer = document.getElementById('lyricContainer');

//监听ontimeupdate事件
// audio.ontimeupdate = function(e) {
//     //遍历所有歌词，看哪句歌词的时间与当然时间吻合
//     for (var i = 0, l = lyric.length; i < l; i++) {
//         if (this.currentTime /*当前播放的时间*/ > lyric[i][0]) {
//             //显示到页面
//             lyricContainer.textContent = that.lyric[i][1];
//         };
//     };
// };

	audio.ontimeupdate = function () {
		
		for (var i = 0; i < lyric.length; i++) {
			lyricContainer.textContent = "";
        	if (this.currentTime /*当前播放的时间*/ > lyric[i][0]){
        		console.log(lyric)
            	//显示到页面
            	lyricContainer.textContent = lyric[i][1];
        	};
    	};
	}