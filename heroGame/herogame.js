function startGame() {


    //键盘键入事件
    //需要获取awdx四个键分别移动四个方向,绑定moveHero函数,传入方向参数
    //键入其他参数则在消息提示处显示错误按键
    document.onkeydown = moveEvent;

    function moveEvent(event) {

        var e = event || window.event || arguments.callee.caller.arguments[0];
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
        } else {
            warningauto("Wrong Key");
        }
        refreshgame();
    };
    //moveHero函数  传入参数:way方向
    //计算移动之后的top,left值
    //遍历障碍元素,如果有障碍的情况下撤销移动直接进行killerMove
    //移动元素
    //遍历杀手元素,若为杀手判定英雄是否为super状态,不是则英雄生存状态改变,执行endMove函数
    //是则杀手死,删除对应杀手,页面中删除对应元素.
    //遍历能量元素,若为能量元素英雄获得对应super值,   super值减1
    //移动结束执行killerMove函数
    function moveHero(way) {
        var ifremove = false;
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
        hero.left = newX;
        hero.top = newY;
        hero.element.style.top = hero.top + 'px';
        hero.element.style.left = hero.left + 'px';
        for (var i in killers) {
            if (killers[i].left == hero.left && killers[i].top == hero.top) {
                if (hero.super > 0) {
                    killers[i].element.style.opacity = 0;
                    killers[i] = killers[killers.length - 1];
                    ifremove = true;
                    addScore(100);
                } else {
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
        if (hero.super <= 0) {
            hero.super = 0;
            hero.element.className = 'hero';
        } else if (hero.super > 0) {
            hero.element.className = 'sHero';
            hero.super--;
        }
        setTimeout(killerMove, 700);

    }
    //killerMove函数 
    //循环killers执行下列操作,没有killer则直接执行endMove()
    //
    //设置最佳方向与次级方向
    //判定八个方向分别与障碍,其他杀手进行对比,可以的方向记录对应的坐标
    //获取英雄位置,以现有位置与英雄进行对比判定获得最佳方向与次级方向
    //判定英雄是否为super状态,若是则选择次一级方向,若是没有次一级方向则不移动
    //若不是则英雄元素life为false,跳出循环执行endMove函数
    //移动该杀手元素.
    //
    //杀手全部操作完毕执行endMove判定函数
    function killerMove() {
        var ifremove = false;


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
            var eight = [ //这个杀手八个方向
                { x: killers[i].left + moveW, y: killers[i].top }, //right
                { x: killers[i].left - moveW, y: killers[i].top }, //left
                { x: killers[i].left, y: killers[i].top + moveW }, //up
                { x: killers[i].left, y: killers[i].top - moveW }, //down
                { x: killers[i].left + moveW, y: killers[i].top + moveW }, //right up
                { x: killers[i].left + moveW, y: killers[i].top - moveW }, //right down
                { x: killers[i].left - moveW, y: killers[i].top - moveW }, //left up
                { x: killers[i].left - moveW, y: killers[i].top + moveW } //left down
            ];
            for (var j = 0; j < 8; j++) {
                ///
                if (eight[j].x < 0 || eight[j].x >= width || eight[j].y < 0 || eight[j].y >= height) {
                    canMove = false; //如果这个方向是墙则取消这个方向
                    continue;
                } else {
                    canMove = true;
                }
                for (var k = 0; k < inneed.length; k++) { //判定这个方向是否有障碍或者杀手,有的话不能走这个方向
                    if (inneed[k].x == eight[j].x && inneed[k].y == eight[j].y) {
                        canMove = false;
                        break;
                    } else {
                        canMove = true;
                    }
                }
                if (eight[j].x == need[0].x && eight[j].y == need[0].y) {
                    bestMove = eight[j]; //如果是英雄就扑过去
                    break;
                }
                if (canMove) {
                    for (var k = 1; k < need.length; k++) { //如果是分数就踩上去
                        if (need[k].x == eight[j].x && need[k].y == eight[j].y) {
                            bestMove = eight[j];
                        }
                    }
                    canMoves.push(eight[j]);
                }
            }
            if (canMoves.length) {
                moveTo = canMoves[Math.floor(Math.random() * canMoves.length + 1) - 1];
            }
            if (bestMove) {
                killers[i].left = bestMove.x;
                killers[i].top = bestMove.y;
                killers[i].element.style.left = bestMove.x + 'px';
                killers[i].element.style.top = bestMove.y + 'px';
            } else if (moveTo) {
                killers[i].left = moveTo.x;
                killers[i].top = moveTo.y;
                killers[i].element.style.left = moveTo.x + 'px';
                killers[i].element.style.top = moveTo.y + 'px';
            }
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
            if (killers[i].left == hero.left && killers[i].top == hero.top) {
                if (hero.super > 0) {
                    killers[i].element.style.opacity = 0;
                    killers[i] = killers[killers.length - 1];
                    ifremove = true;
                    addScore(100);
                } else {
                    hero.life = false;
                    endMove();
                    return;
                }
            }
            if (ifremove) {
                ifremove = false;
                killers.length -= 1;
            }
        }
        round++;
        refreshgame();
        endMove();
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

function endGame() {
    setTimeout(function() {
        document.getElementById("end").style.display = "none";
        document.getElementById("start").style.display = "block";
        if (hero.life == false) {
            warning('Killers Win!');
        } else if ((!ens.length) || (!killers.length) || ens.length == 0 || killers.length == 0) {
            warning('You Win! Your score:' + score);
        } else
            warning("Draw!");
        //清理全部元素
        game.innerHTML = "";
        setup();
        //重新预定义第一部分
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
    }, 500);

}
