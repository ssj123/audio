function getLyric(url) {
    //建立一个XMLHttpRequest请求
    var request = new XMLHttpRequest();
    //配置, url为歌词地址，比如：'./content/songs/foo.lrc'
    request.open('GET', url, true);
    //因为我们需要的歌词是纯文本形式的，所以设置返回类型为文本
    request.responseType = 'text';
    //一旦请求成功，但得到了想要的歌词了
    request.onload = function() {
        //这里获得歌词文件
        var lyric = request.response;
    };
    //向服务器发送请求
    request.send();
}

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

 var re = getLyric(1490700710.lrc);
 var arr = parseLyric(re);
 console.log(arr)