/***************************

    Hero Game
    Ather：Yao.Li ID201138116

****************************/

//required variate of game
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

//required variate of map
//**************************************************************
var maxWidth = window.innerWidth;
if (maxWidth<1200) {
    maxWidth = 1200;
}
//var moveW = 4/140*maxWidth;
var moveW = parseInt(4/140*maxWidth);
console.log(window.innerWidth);
console.log(moveW);
// maintainer can change the size of grid by setting this value

//**************************************************************
    width = moveW * 10,
    height = moveW * 10; //the size of the cell

//set globals
var addInput = document.getElementById("addInput"); //input field
var addx, addy; //location of addition
var clicked; //cell latest be clicked


//************************* setup stage *************************************

//set elements of page
function setup() {

    //整体居中
    var centerDiv = document.getElementById('move-center');
    centerDiv.style.marginLeft = -10.5 * moveW - 10 + "px";

    //左边栏
    var ctrl = document.getElementById("ctrl");
    ctrl.style.width = moveW * 5 + "px";
    ctrl.style.height = moveW * 15 + "px";
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
            instrs.item(i).style.fontSize = moveW * 0.3 + "px";
        }
    }
    var pics = document.getElementsByTagName("img");
    for (var i = 0; i < pics.length; i++) {
        if(pics[i].className=="pics"){
            pics[i].style.width = moveW*1.2+"px";
            pics[i].style.height = moveW*1.2+"px";
        }
    }
    //左边栏完成

    //右边栏
    var info = document.getElementById("info");
    info.style.width = moveW * 5 + "px";
    info.style.height = moveW * 15 + "px";
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
    //警告栏样式设置
    var wrongKey = document.getElementById("wrongKey");
    wrongKey.style.width = moveW * 10 + "px";
    wrongKey.style.height = moveW * 3 + "px";
    wrongKey.style.left = moveW * 6 + 10 + "px";
    wrongKey.style.top = moveW * 4 + "px";
    wrongKey.style.lineHeight = moveW * 1 + "px";

    //输入框位置重置
    addInput.style.left = moveW * 11 + "px";
    addInput.style.top = moveW * 6 + "px";
    var inpBtn = addInput.getElementsByTagName("button");
    for(var i = 0, len = inpBtn.length; i < len; i++){
        inpBtn[i].style.width = "240px";
        inpBtn[i].style.height = "40px";
        inpBtn[i].style.marginTop = "10px";
        inpBtn[i].style.marginLeft = "40px";
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
    //每个地图元素的载入并且添加点击事件
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
            lis[i * 10 + j].style.backgroundSize = "100%";
            lis[i * 10 + j].style.styleFloat = "left"; //ie
            lis[i * 10 + j].style.cssFloat = "left";
            lis[i * 10 + j].style.border = "1px solid gray";
            lis[i * 10 + j].onclick = function() { set(this) };
        }
    }

    //刷新右侧信息
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
    if (hero.element != null) {//英雄只允许设置一个
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
        enE.style.backgroundSize = "100%";
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

//add obstacle
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

//开始游戏
function start() { 
    if (hero.life == false) {//需设置英雄才能开始游戏
        warningauto("You didn't set a hero");
        return;
    }
    for (var i = 0; i < 99; i++) {//可以开始游戏则去除所有点击事件
        lis[i].onclick = null;
    }
    //切换开始结束按钮
    document.getElementById("start").style.display = "none";
    document.getElementById("end").style.display = "block";
    //如果没有杀手或者能量游戏直接结束,进行判定
    if ((!ens.length) || (!killers.length) || ens.length == 0 || killers.length == 0) {
        endGame();
        return;
    }
    //调用开始游戏函数
    startGame();
}

//开始后输入错误
function wrongInput() {
    warningauto("Wrong input!");
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
//警告窗自动隐藏函数
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



//************************* play stage and end stage *************************************



function startGame() {


    //键盘键入事件
    document.onkeydown = moveEvent;

    function moveEvent(event) {

        var e = event || window.event || arguments.callee.caller.arguments[0];
        //需要获取awdx四个键分别移动四个方向,绑定moveHero函数,传入方向参数
        if (e && e.keyCode == 65) { // 按 A 
            document.onkeydown = null;
            moveHero('left');
        } else if (e && e.keyCode == 68) { // 按 D 
            document.onkeydown = null;
            moveHero('right');
        } else if (e && e.keyCode == 87) { // 按 W
            document.onkeydown = null;
            moveHero('up');
        } else if (e && e.keyCode == 88) { // 按 X
            document.onkeydown = null;
            moveHero('down');
        } else {//键入其他参数则在消息提示处显示错误按键
            warningauto("Wrong Key");
        }
        refreshgame();
    };
    
    function moveHero(way) {//moveHero函数  传入参数:way方向
        var ifremove = false;
        //计算移动之后的top,left值
        var newX = hero.left,
            newY = hero.top;
        switch (way) {
            case 'left':
                newX -= moveW;
                break;
            case 'right':
                newX += moveW;
                break;
            case 'up':
                newY -= moveW;
                break;
            case 'down':
                newY += moveW;
                break;
            default:
                return;
        }
        //如果英雄撞墙则直接杀手回合
        if (newX >= width || newX < 0 || newY < 0 || newY >= height) {
            warningauto("You hit the wall");
            killerMove();
            return
        }
        for (var i in stones) {
            if (stones[i].left == newX && stones[i].top == newY) {
                warningauto("You hit the wall");
                killerMove();
                return
            }
        }
        //移动元素
        hero.left = newX;
        hero.top = newY;
        hero.element.style.top = hero.top + 'px';
        hero.element.style.left = hero.left + 'px';
        //遍历杀手元素,若为杀手判定英雄是否为super状态
        for (var i in killers) {
            if (killers[i].left == hero.left && killers[i].top == hero.top) {
                if (hero.super > 0) {//是super状态删除该杀手
                    killers[i].element.style.opacity = 0;
                    killers[i] = killers[killers.length - 1];
                    ifremove = true;
                    addScore(100);
                } else {//不是则英雄死亡进行结果判定
                    hero.life = false;
                    endMove();
                    return;
                }
            }
        }
        if (ifremove) {
            ifremove = false;
            killers.length -= 1;
        }
        //若为能量元素,吃掉,增加超人回合
        for (var i in ens) {
            if (ens[i].left == hero.left && ens[i].top == hero.top) {
                hero.super = parseInt(hero.super, 10) + parseInt(ens[i].value, 10);
                addScore(ens[i].value);
                ens[i].element.style.opacity = 0;
                ens[i] = ens[ens.length - 1];
                ifremove = true;
            }
        }
        if (ifremove) {
            ifremove = false;
            ens.length -= 1;
        }
        //本回合移动结束超人能量减一
        if (hero.super <= 0) {
            hero.super = 0;
            hero.element.className = 'hero';
        } else if (hero.super > 0) {
            hero.element.className = 'sHero';
            hero.super--;
        }
        //执行杀手移动
        setTimeout(killerMove, 700);
    }

    function killerMove() {
        var ifremove = false;
        var die = [];//死亡的杀手;
        for (var i in killers) {
            var need = (function() { //杀手期望移动的区块
                var arr = [];
                var map = {};
                map.x = hero.left;
                map.y = hero.top;
                arr.push(map);
                for (var i in ens) {
                    var map = {};
                    map.x = ens[i].left;
                    map.y = ens[i].top;
                    arr.push(map);
                }
                return arr;
            })();
            var inneed = (function() { //杀手不能移动的区块
                var arr = [];
                for (var i in killers) {
                    var map = {};
                    map.x = killers[i].left;
                    map.y = killers[i].top;
                    arr.push(map);
                }
                for (var i in stones) {
                    var map = {};
                    map.x = stones[i].left;
                    map.y = stones[i].top;
                    arr.push(map);
                }
                return arr;
            })();
            var moveTo = null,
                canMove = false,
                bestMove = null,
                canMoves = [];
            var eight = [ //eight directions of killer
                { x: killers[i].left + moveW, y: killers[i].top }, //right
                { x: killers[i].left - moveW, y: killers[i].top }, //left
                { x: killers[i].left, y: killers[i].top + moveW }, //up
                { x: killers[i].left, y: killers[i].top - moveW }, //down
                { x: killers[i].left + moveW, y: killers[i].top + moveW }, //right up
                { x: killers[i].left + moveW, y: killers[i].top - moveW }, //right down
                { x: killers[i].left - moveW, y: killers[i].top - moveW }, //left up
                { x: killers[i].left - moveW, y: killers[i].top + moveW } //left down
            ];
            for (var j = 0; j < 8; j++) {//move mothod of killer
                if (eight[j].x < 0 || eight[j].x >= width || eight[j].y < 0 || eight[j].y >= height) {
                    canMove = false; // if there is wall
                    continue;
                } else {
                    canMove = true;
                }
                for (var k = 0; k < inneed.length; k++) { //if there is a killer or an obstacle
                    if (inneed[k].x == eight[j].x && inneed[k].y == eight[j].y) {
                        canMove = false;
                        break;
                    } else {
                        canMove = true;
                    }
                }
                if (eight[j].x == need[0].x && eight[j].y == need[0].y) {
                    bestMove = eight[j]; //if there is a hero
                    break;
                }
                if (canMove) {
                    for (var k = 1; k < need.length; k++) { //if there is a power-up
                        if (need[k].x == eight[j].x && need[k].y == eight[j].y) {
                            bestMove = eight[j];
                        }
                    }
                    var dis;//如果向这个方向移动 , 杀手和英雄的距离变为多少
                    dis = Math.sqrt((eight[j].x - need[0].x) * (eight[j].x - need[0].x) + (eight[j].y - need[0].y) * (eight[j].y - need[0].y))
                    var tmp = {
                        dire: eight[j],
                        dis: dis
                    }
                    canMoves.push(tmp);
                }
            }
            if (canMoves.length) {
                var ai = canMoves[0];
                if (hero.element.className == 'sHero' && (killers[i].left - need[0].x) * (killers[i].left - need[0].x) + (killers[i].top - need[0].y) * (killers[i].top - need[0].y) < 18*moveW*moveW) {
                    for (var k = 0; k < canMoves.length; k++) {
                        if (canMoves[k].dis > ai.dis) {
                            ai = canMoves[k];
                        }
                    }
                } else {//如果不是超级英雄 , 或者还不够近 , 就怎么近怎么跑
                    for (var k = 0; k < canMoves.length; k++) {
                        if (canMoves[k].dis < ai.dis) {
                            ai = canMoves[k];
                        }
                    }
                }

                moveTo = ai.dire;
            }
            if (bestMove) {
            //best way to move (to the hero or power-up)
                killers[i].left = bestMove.x;
                killers[i].top = bestMove.y;
                killers[i].element.style.left = bestMove.x + 'px';
                killers[i].element.style.top = bestMove.y + 'px';
            } else if (moveTo) {
            //无最佳移动则随机向可移动方向移动,否则禁止不动
                killers[i].left = moveTo.x;
                killers[i].top = moveTo.y;
                killers[i].element.style.left = moveTo.x + 'px';
                killers[i].element.style.top = moveTo.y + 'px';
            }
            //杀手走到能量块上则删除能量块
            for (var key in ens) {
                if (ens[key].left == killers[i].left && ens[key].top == killers[i].top) {
                    ens[key].element.style.opacity = 0;
                    ens[key] = ens[ens.length - 1];
                    ifremove = true;
                }
            }
            if (ifremove) {
                ifremove = false;
                ens.length -= 1;
            }
            //杀手走到英雄身上
            if (killers[i].left == hero.left && killers[i].top == hero.top) {
                if (hero.element.className == 'sHero') {//若为超级英雄则杀手死亡
                    killers[i].element.style.opacity = 0;
                    die.push(parseInt(i));
                    addScore(100);
                } else {//若不为超级英雄英雄死亡进行结果判定
                    hero.life = false;
                    endMove();
                    return;
                }
            }
        }
        //杀手移动完毕后清除死亡的杀手对象
        for(var j = killers.length - 1; j >= 0; j--){
            if(die.indexOf(j) != -1){
                killers.splice(j,1);
            }
        }
        round++;//回合数增加
        refreshgame();
        endMove();//执行移动结束函数
    }
    //endMove函数
    //判定英雄是否活着,若是阵亡则页面上删除英雄元素,打印英雄阵亡信息,延迟执行endGame
    //判定killers和ens是否还有,若是有一个length为0了就打印英雄胜利信息,延迟执行endGame
    //游戏未结束的情况重新添加按键事件
    function endMove() {
        if (!hero.life || killers.length == 0 || ens.length == 0) {
            endGame();
            return;
        }
        document.onkeydown = moveEvent;
    }
}

function endGame() {//结束阶段 判定
    document.onkeydown = null;//清除键盘按键事件
    setTimeout(function() {//设定延迟,让动画结束后执行下面函数
        document.getElementById("end").style.display = "none";//切换按键
        document.getElementById("start").style.display = "block";
        //对不同结果进行判定输出结果字符
        if (hero.life == false) {
            warning('Killers Win!');
        } else if ((!ens.length) || (!killers.length) || ens.length == 0 || killers.length == 0) {
            warning('You Win! Your score:' + score);
        } else{
            warning("Draw!");
        }
        //为结果显示添加点击事件,点击后清除全部元素重新执行游戏载入函数.
        var wrongKey = document.getElementById("wrongKey");
        wrongKey.onclick = function(){
            //clean all objects
            hideWarning();
            wrongKey.onclick = null;
            game.innerHTML = "";
            setup();
            //reload the game
            //reload the data
            hero = {
                life: false,
                super: 0,
                left: 0,
                top: 0,
                element: null
            };
            killers = [];
            stones = [];
            ens = [];
            score = 0;
            round = 0;
            refreshgame();
        }
    }, 500);

}
