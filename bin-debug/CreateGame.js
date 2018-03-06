var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CreateGame = (function (_super) {
    __extends(CreateGame, _super);
    function CreateGame() {
        var _this = _super.call(this) || this;
        _this.stageSize = {
            width: 10,
            height: 15,
            boxsize: 50
        };
        _this.time = new egret.Timer(500, 0);
        _this.weiZhiX = 3;
        _this.weiZhiY = 0;
        _this.erwei = new Array();
        for (var i = 0; i < _this.stageSize.height; i++) {
            _this.erwei[i] = new Array();
            for (var j = 0; j < _this.stageSize.width; j++) {
                _this.erwei[i][j] = 0;
            }
        }
        return _this;
    }
    CreateGame.prototype.begin = function () {
        this.showStage();
        this.showButton();
        this.showOne();
        this.timer();
    };
    /**
     * 展示方向按钮皮肤
     */
    CreateGame.prototype.showButton = function () {
        var label1 = new egret.TextField();
        label1.text = "左";
        label1.x = 0;
        label1.y = 850;
        label1.width = 100;
        label1.height = 100;
        this.addChild(label1);
        label1.touchEnabled = true;
        label1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        var label2 = new egret.TextField();
        label2.text = "右";
        label2.x = 200;
        label2.y = 850;
        label2.width = 100;
        label2.height = 100;
        this.addChild(label2);
        label2.touchEnabled = true;
        label2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        var label3 = new egret.TextField();
        label3.text = "上";
        label3.x = 100;
        label3.y = 750;
        label3.width = 100;
        label3.height = 100;
        this.addChild(label3);
        label3.touchEnabled = true;
        label3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
        var label4 = new egret.TextField();
        label4.text = "下";
        label4.x = 100;
        label4.y = 850;
        label4.width = 100;
        label4.height = 100;
        this.addChild(label4);
        label4.touchEnabled = true;
        label4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.move, this);
    };
    /**
     * 方块移动
     */
    CreateGame.prototype.move = function (e) {
        if (e.target.text == "左") {
            if (this.canLeft() == 1 && this.canLeft2() == 1) {
                for (var i = 0; i < this.stageSize.height; i++) {
                    for (var j = 0; j < this.stageSize.width; j++) {
                        if (this.erwei[i][j] == 1) {
                            this.erwei[i][j - 1] = this.erwei[i][j];
                            this.erwei[i][j] = 0;
                        }
                    }
                }
                if (this.weiZhiX <= 0) {
                    this.weiZhiX = 0;
                }
                else {
                    this.weiZhiX--;
                }
            }
        }
        else if (e.target.text == "右") {
            if (this.canRight() == 1 && this.canRight2() == 1) {
                for (var i = 0; i < this.stageSize.height; i++) {
                    for (var j = this.stageSize.width - 1; j >= 0; j--) {
                        if (this.erwei[i][j] == 1) {
                            this.erwei[i][j + 1] = this.erwei[i][j];
                            this.erwei[i][j] = 0;
                        }
                    }
                }
                if (this.weiZhiX >= this.stageSize.width - 2) {
                    this.weiZhiX = this.stageSize.width - 3;
                }
                else {
                    this.weiZhiX++;
                }
            }
        }
        else if (e.target.text == "下") {
            if (this.oneCanDown() == 1 && this.oneCanDown2() == 1) {
                for (var m = this.stageSize.height - 1; m >= 0; m--) {
                    for (var n = 0; n < this.stageSize.width; n++) {
                        if (this.erwei[m][n] == 1) {
                            this.erwei[m + 1][n] = 1;
                            this.erwei[m][n] = 0;
                        }
                    }
                }
            }
            if (this.weiZhiY >= this.stageSize.height) {
                this.weiZhiY = this.stageSize.height;
            }
            else {
                this.weiZhiY++;
            }
        }
        else if (e.target.text == "上") {
            if (this.canChange() == 1 && this.suijishu > 0 && this.suijishu < 6) {
                this.change();
            }
            else if ((this.suijishu == 0 || this.suijishu == 7) && this.canChange1() == 1) {
                this.lineChange();
            }
        }
        this.showStage();
    };
    /**
     * 能否变形
     */
    CreateGame.prototype.canChange = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (this.weiZhiY + i > 14) {
                    return 0;
                }
                if (this.erwei[this.weiZhiY + i][this.weiZhiX + j] == 2) {
                    return 0;
                }
            }
        }
        return 1;
    };
    /**
     * 变形
     */
    CreateGame.prototype.change = function () {
        var copy = new Array();
        var er = 2;
        // console.log(this.weiZhiX);console.log(this.weiZhiY);
        // this.time.stop();
        for (var i = 0; i < 3; i++) {
            copy[i] = new Array();
            for (var j = 0; j < 3; j++) {
                copy[i][j] = this.erwei[this.weiZhiY + i][this.weiZhiX + j];
            }
        }
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.erwei[this.weiZhiY + i][this.weiZhiX + j] = copy[er][i];
                er--;
            }
            er = 2;
        }
    };
    /**
     * 直线方块能否变形
     */
    CreateGame.prototype.canChange1 = function () {
        for (var i = 0; i <= 3; i++) {
            for (var j = 0; j <= 3; j++) {
                if (this.weiZhiY + i > 14) {
                    return 0;
                }
                if (this.erwei[this.weiZhiY + i][this.weiZhiX + j] == 2) {
                    return 0;
                }
            }
        }
        return 1;
    };
    /**
     * 直线方块变形
     */
    CreateGame.prototype.lineChange = function () {
        var x = this.weiZhiX + 1;
        var y = this.weiZhiY + 1;
        if (this.erwei[y][x - 1] == 1) {
            this.erwei[y][x - 1] = 0;
            this.erwei[y][x + 1] = 0;
            this.erwei[y][x + 2] = 0;
            this.erwei[y - 1][x] = 1;
            this.erwei[y + 1][x] = 1;
            this.erwei[y + 2][x] = 1;
        }
        else {
            this.erwei[y - 1][x] = 0;
            this.erwei[y + 1][x] = 0;
            this.erwei[y + 2][x] = 0;
            this.erwei[y][x - 1] = 1;
            this.erwei[y][x + 1] = 1;
            this.erwei[y][x + 2] = 1;
        }
    };
    /**
     * 向左移动
     */
    CreateGame.prototype.canLeft = function () {
        for (var i = 0; i < this.stageSize.height; i++) {
            if (this.erwei[i][0] == 1) {
                return 0;
            }
        }
        return 1;
    };
    CreateGame.prototype.canLeft2 = function () {
        for (var i = this.stageSize.height - 1; i >= 0; i--) {
            for (var j = 0; j < this.stageSize.width; j++) {
                if (this.erwei[i][j] == 1) {
                    if (this.erwei[i][j - 1] == 2) {
                        return 0;
                    }
                }
            }
        }
        return 1;
    };
    /**
     * 向右移动
     */
    CreateGame.prototype.canRight = function () {
        for (var i = 0; i < this.stageSize.height; i++) {
            if (this.erwei[i][this.stageSize.width - 1] == 1) {
                return 0;
            }
        }
        return 1;
    };
    CreateGame.prototype.canRight2 = function () {
        for (var i = this.stageSize.height - 1; i >= 0; i--) {
            for (var j = 0; j < this.stageSize.width; j++) {
                if (this.erwei[i][j] == 1) {
                    if (this.erwei[i][j + 1] == 2) {
                        return 0;
                    }
                }
            }
        }
        return 1;
    };
    /**
     * 显示背景图
     */
    CreateGame.prototype.showStage = function () {
        for (var i = 0; i < this.stageSize.height; i++) {
            for (var j = 0; j < this.stageSize.width; j++) {
                this.shape = new egret.Shape();
                if (this.erwei[i][j] == 0) {
                    this.shape.graphics.beginFill(0xd0d0d0);
                    this.shape.graphics.drawRect(j * this.stageSize.boxsize, i * this.stageSize.boxsize, this.stageSize.boxsize, this.stageSize.boxsize);
                    this.shape.graphics.endFill();
                    this.addChild(this.shape);
                }
                else if (this.erwei[i][j] == 1 || this.erwei[i][j] == 2) {
                    this.shape.graphics.beginFill(0xDC143C);
                    this.shape.graphics.drawRect(j * this.stageSize.boxsize, i * this.stageSize.boxsize, this.stageSize.boxsize, this.stageSize.boxsize);
                    this.shape.graphics.endFill();
                    this.addChild(this.shape);
                }
            }
        }
    };
    /**
     * 初始化7种不同形状的方块
     */
    CreateGame.prototype.initSeven = function (num) {
        var initOne = new Array();
        switch (num) {
            case 1:
                initOne = [[1, 1, 0, 0], [0, 1, 1, 0]];
                break;
            // z
            case 2:
                initOne = [[0, 1, 1, 0], [1, 1, 0, 0]];
                break;
            // 反z
            case 3:
                initOne = [[0, 1, 0, 0], [1, 1, 1, 0]];
                break;
            // 山
            case 4:
                initOne = [[1, 0, 0, 0], [1, 1, 1, 0]];
                break;
            // L
            case 5:
                initOne = [[0, 0, 1, 0], [1, 1, 1, 0]];
                break;
            // 反L
            case 6:
                initOne = [[0, 1, 1, 0], [0, 1, 1, 0]];
                break;
            // O
            case 7:
                initOne = [[0, 0, 0, 0], [1, 1, 1, 1]];
                break;
        }
        return initOne;
    };
    /**
     * 产生1-7的随机数
     */
    CreateGame.prototype.suiji = function () {
        var num = Math.ceil(Math.random() * 7);
        this.suijishu = num;
        // console.log(num);
        if (num == 0) {
            num = 7;
        }
        return num;
    };
    /**
     *显示移动的方块，方块与数组一一对应
     */
    CreateGame.prototype.showOne = function () {
        var one = this.initSeven(this.suiji());
        for (var i = 0; i < 2; i++) {
            for (var j = 3; j < 7; j++) {
                this.erwei[i][j] = one[i][j - 3];
            }
        }
        this.showStage();
    };
    /**
     * 方块下落
     */
    CreateGame.prototype.oneDown = function () {
        if (this.oneCanDown() == 1 && this.oneCanDown2() == 1) {
            for (var m = this.stageSize.height - 1; m >= 0; m--) {
                for (var n = 0; n < this.stageSize.width; n++) {
                    if (this.erwei[m][n] == 1) {
                        this.erwei[m + 1][n] = 1;
                        this.erwei[m][n] = 0;
                    }
                }
            }
            this.weiZhiY++;
        }
        else {
            this.time.stop();
            this.weiZhiX = 3;
            this.weiZhiY = 0;
            this.change1to2();
            this.clear();
            if (this.ifOver() == 0) {
                this.time.stop();
                alert("game over !");
                return 0;
            }
            this.showOne();
            this.timer();
        }
        this.showStage();
    };
    /**
     * 设置定时器
     */
    CreateGame.prototype.timer = function () {
        // egret.setInterval(this.oneDown,this,1000);
        this.time.addEventListener(egret.TimerEvent.TIMER, this.oneDown, this);
        // this.time.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.begin,this);
        //开始计时
        this.time.start();
    };
    /**
     * 当方块落到底部的时候,把方块的数值1改成2
     */
    CreateGame.prototype.change1to2 = function () {
        for (var i = 0; i < this.stageSize.height; i++) {
            for (var j = 0; j < this.stageSize.width; j++) {
                if (this.erwei[i][j] == 1) {
                    this.erwei[i][j] = 2;
                }
            }
        }
    };
    /**
     * 判断方块是否可以向下移动
     */
    CreateGame.prototype.oneCanDown = function () {
        for (var i = 0; i < this.stageSize.width; i++) {
            if (this.erwei[14][i] == 1) {
                return 0;
            }
        }
        return 1;
    };
    /**
     * 方块叠加
     */
    CreateGame.prototype.oneCanDown2 = function () {
        for (var i = this.stageSize.height - 1; i >= 0; i--) {
            for (var j = 0; j < this.stageSize.width; j++) {
                if (this.erwei[i][j] == 1) {
                    if (this.erwei[i + 1][j] == 2) {
                        return 0;
                    }
                }
            }
        }
        return 1;
    };
    /**
     * 消除行
     */
    CreateGame.prototype.clear = function () {
        var sum = 0;
        for (var i = this.stageSize.height - 1; i >= 0; i--) {
            for (var j = 0; j < this.stageSize.width; j++) {
                sum += this.erwei[i][j];
                if (sum == 20) {
                    for (var m = i - 1; m > 0; m--) {
                        for (var n = 0; n < this.stageSize.width; n++) {
                            this.erwei[m + 1][n] = this.erwei[m][n];
                        }
                    }
                    i = this.stageSize.height;
                }
            }
            sum = 0;
        }
    };
    /**
     * 判断游戏是否游戏结束
     */
    CreateGame.prototype.ifOver = function () {
        for (var i = 0; i < this.stageSize.width; i++) {
            if (this.erwei[1][i] == 2) {
                return 0;
            }
        }
    };
    return CreateGame;
}(egret.Sprite));
__reflect(CreateGame.prototype, "CreateGame");
//# sourceMappingURL=CreateGame.js.map