//游戏 所需要的变量
var hero = {
        life: false,
        super: 0,
        left: 0,
        top: 0,
        element: null
    },
    killers = [],
    stones = [],
    ens = [],
    score = 0,
    round = 0;

//地图 所需的变量
var moveW = 60,
    width = moveW * 10,
    height = moveW * 10; //格子的宽度

//设置环节用到的全局变量
var addInput = document.getElementById("addInput"); //输入框
var addx, addy; //添加的位置
var clicked; //最近一次被点击到的格子

function setup() {

    //左边栏
    var ctrl = document.getElementById("ctrl");
    ctrl.style.width = moveW * 5 + "px";
    ctrl.style.height = moveW * 13 + "px";
    ctrl.style.backgroundColor = "#eee";
    ctrl.style.left = moveW * 0.5 + "px";
    ctrl.style.top = moveW * 0.5 + "px";

    //左边栏的三个按钮样式设置
    var btn = document.getElementsByTagName("button");
    for (var i = 0; i < btn.length; i++) {
        btn[i].style.width = moveW * 4 + "px";
        btn[i].style.height = moveW * 0.8 + "px";
        btn[i].style.marginLeft = moveW * 0.5 + "px";
        btn[i].style.marginTop = moveW * 0.2 + "px";
    }

    //图鉴样式设置
    var instrDiv = document.getElementById("instr");
    var instrs = instrDiv.childNodes;
    for (var i = 0; i < instrs.length; i++) {
        if (instrs.item(i).tagName == "DIV") {
            instrs.item(i).style.position = "relative";
            instrs.item(i).style.width = moveW * 4 + "px";
            instrs.item(i).style.marginLeft = moveW * 0.5 + "px";
            instrs.item(i).style.marginTop = moveW * 0.2 + "px";
            instrs.item(i).style.textAlign = "center";

        }
    }

    //左边栏完成

    //右边栏
    var info = document.getElementById("info");
    info.style.width = moveW * 5 + "px";
    info.style.height = moveW * 13 + "px";
    info.style.backgroundColor = "#eee";
    info.style.left = moveW * 16.5+20 + "px";
    info.style.top = moveW * 0.5 + "px";

    var infos = info.childNodes;
    for (var i = 0; i < infos.length; i++) {
        if (infos.item(i).tagName == "DIV") {
            infos.item(i).style.position = "relative";
            infos.item(i).style.width = moveW * 4 + "px";
            infos.item(i).style.marginLeft = moveW * 0.5 + "px";
            infos.item(i).style.marginTop = moveW * 2 + "px";
            infos.item(i).style.textAlign = "center";
            infos.item(i).style.fontSize = "20px";

        }
    }


    //游戏主体
    //地图绘制
    game = document.getElementById("game");
    game.style.width = moveW * 10 + "px";
    game.style.height = moveW * 10 + "px";
    game.style.backgroundColor = "#eee";
    game.style.left = moveW * 6 + "px";
    game.style.top = moveW * 0.5 + "px";
    game.style.border = "10px solid #CEA98C";

    //网格绘制
    uls = new Array();
    lis = new Array();
    for (var i = 0; i < 10; i++) {
        uls[i] = document.createElement("ul");
        game.appendChild(uls[i]);
        for (var j = 0; j < 10; j++) {
            lis[i * 10 + j] = document.createElement("li");
            uls[i].appendChild(lis[i * 10 + j]);
        }
    }

    for (var i = 0; i < 10; i++) {
        uls[i].style.width = moveW * 10 + 20 + "px";
        uls[i].style.height = moveW + "px";
        uls[i].style.margin = "0";
        uls[i].style.padding = "0";
        uls[i].style.listStyleType = "none";

        for (var j = 0; j < 10; j++) {
            lis[i * 10 + j].style.width = moveW - 2 + "px";
            lis[i * 10 + j].style.height = moveW - 2 + "px";
            lis[i * 10 + j].style.margin = "0";
            lis[i * 10 + j].style.background = "url('img/floor.png') no-repeat";
            lis[i * 10 + j].style.styleFloat = "left"; //ie
            lis[i * 10 + j].style.cssFloat = "left";
            lis[i * 10 + j].style.border = "1px solid gray";
            lis[i * 10 + j].onclick = function() { set(this) };
        }
    }


    refreshgame();

}


//游戏信息
function refreshgame() {
    document.getElementById("score").innerHTML = score;
    document.getElementById("rd").innerHTML = round;
    document.getElementById("nos").innerHTML = hero.super;
}


//点击格子,设置元素
function set(e) {
    addx = e.offsetLeft;
    addy = e.offsetTop;
    addInput.style.display = "block";
    clicked = e;
}

//隐藏输入框
function hideAdd() {
    addInput.style.display = "none";
}

//确定输入
function confirm() {
    var addI = document.getElementById("addI");
    var ans = addI.value;
    if (ans == 'h' || ans == 'H') {
        //添加英雄
        if (addH()) clicked.onclick = null;
        hideAdd();
    } else if (ans >= 1 && ans <= 9) {
        addE(ans);
        clicked.onclick = null;
        hideAdd();
    } else if (ans == 'o' || ans == 'O') {
        addS();
        clicked.onclick = null;
        hideAdd();
    } else if (ans == 'k' || ans == 'K') {
        addK();
        clicked.onclick = null;
        hideAdd();
    } else {
        wrongInput();
    }
}

//添加英雄
function addH() {
    if (hero.element != null) {
        warningauto("You have already set a hero!");
        return false;
    }
    heroE = document.createElement("div");
    heroE.setAttribute('class', 'hero');
    heroE.style.width = moveW - 2 + "px";
    heroE.style.height = moveW - 2 + "px";
    heroE.style.left = addx + "px";
    heroE.style.top = addy + "px";
    game.appendChild(heroE);
    hero = {
        life: true,
        super: 0,
        left: addx,
        top: addy,
        element: heroE
    }
    return true;
}


//添加能量
var addE = (function() {
    return function(num) {
        enE = document.createElement("div");
        enE.setAttribute('class', 'en');
        enE.style.width = moveW - 2 + "px";
        enE.style.height = moveW - 2 + "px";
        enE.style.left = addx + "px";
        enE.style.top = addy + "px";
        enE.style.background = "url('img/en" + num + ".png') no-repeat";
        game.appendChild(enE);
        ens[ens.length] = {
            value: num,
            left: addx,
            top: addy,
            element: enE
        }
    }
})();

//添加杀手
var addK = (function() {
    return function() {
        killerE = document.createElement("div");
        killerE.setAttribute('class', 'killer');
        killerE.style.width = moveW - 2 + "px";
        killerE.style.height = moveW - 2 + "px";
        killerE.style.left = addx + "px";
        killerE.style.top = addy + "px";
        game.appendChild(killerE);
        killers[killers.length] = {
            left: addx,
            top: addy,
            element: killerE
        }
    }
})();

//添加障碍物
var addS = (function() {
    return function() {
        stoneE = document.createElement("div");
        stoneE.setAttribute('class', 'stone');
        stoneE.style.width = moveW - 2 + "px";
        stoneE.style.height = moveW - 2 + "px";
        stoneE.style.left = addx + "px";
        stoneE.style.top = addy + "px";
        game.appendChild(stoneE);
        stones[stones.length] = {
            left: addx,
            top: addy,
            element: stoneE
        }
    }
})();

//输入错误
function wrongInput() {
    warningauto("Wrong input!");
}

//开始游戏
function start() { 
    if (hero.life == false) {
        warningauto("You didn't set a hero");
        return;
    }
    else if ((!ens.length) || (!killers.length) || ens.length == 0 || killers.length == 0) {
        endGame();
        return;
    }    
    for (var i = 0; i < 99; i++) {
        lis[i].onclick = null;
    }
    document.getElementById("start").style.display = "none";
    document.getElementById("end").style.display = "block";
    startGame();

}

//添加分数
function addScore(s) {
    score = parseInt(score, 10) + parseInt(s, 10);
    refreshgame();
}

//弹出警告框
function warning(s) {
    var wrongKey = document.getElementById("wrongKey");
    wrongKey.innerHTML = s + "<br />Click to continue";
    wrongKey.style.display = "block";
}

function warningauto(s) {
    var wrongKey = document.getElementById("wrongKey");
    wrongKey.innerHTML = s;
    wrongKey.style.display = "block";
    setTimeout(function() {
        wrongKey.style.display = "none";
    }, 1000);

}

//隐藏警告框
function hideWarning() {
    var wrongKey = document.getElementById("wrongKey");
    wrongKey.style.display = "none";
}
