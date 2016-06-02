var unknown = [];
var str;

// 获取之前存入的未记住的单词
str = localStorage.unknown;
//unknown = eval(str);
if (unknown) {
    i = unknown.length;
} else {
    i = 0;
}
recolor();


// 读取上次阅读到的地方
location.href = "#" + localStorage.last;
$("#" + localStorage.last).css('color', 'blue');

// 显示中文并记录最后一次点击位置
$(".en").click(function() {
    $(this).parent().next().children().slideToggle("fast");
    localStorage.last = $(this).attr('id');
});
// 点击"哦豁"后进行标记并记录
$(".ohuo").click(function() {
    var tmp = $(this).next().attr('id');
    var loaded = 0;
    for (var j = 0; j < i; j++) {
        if (unknown[j] == null) {
            unknown[j] = tmp;
            loaded = 1;
            break;
        }
        if (unknown[j] == tmp) {
            loaded = 1;
            break;
        }
    }
    if (!loaded) {
        unknown[i++] = tmp;
        loaded = 1
    }
    str = JSON.stringify(unknown);
    //存入 
    localStorage.unknown = str;
    loaded = 0;
    recolor();
});


// 点击get后清除标记
$(".get").click(function() {
    var tmp = $(this).next().next().attr('id');
    var loaded = 0;
    for (var j = 0; j < i; j++) {
        if (unknown[j] == tmp) {
            unknown[j] = null;
            $(this).next().next().css('color', '#5f3811');
            break;
        }
    }

    str = JSON.stringify(unknown);
    //存入 
    localStorage.unknown = str;
    loaded = 0;
});

function recolor() {
    var str = localStorage.unknown;
    unknown = eval(str);
    for (var j = 0; j < i; j++) {
        if (unknown[j] != null) {
            $("#" + unknown[j]).css('color', 'red');
        }
    }
}
