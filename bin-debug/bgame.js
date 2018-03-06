var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FK;
(function (FK) {
    var bgame = (function () {
        function bgame(main) {
            this.stageSize = {
                width: 10,
                height: 20,
                boxsize: 40
            };
            this.main = main;
            this.sprite = new egret.Sprite();
            this.sprite.x = 0;
            this.sprite.y = 0;
            this.shp = new egret.Shape();
            this.sprite.addChild(this.shp);
            this.main.addChild(this.sprite);
        }
        bgame.prototype.showStage = function () {
            this.shp.graphics.beginFill(0xd0d0d0);
            this.shp.graphics.drawRect(0, 0, this.stageSize.width * this.stageSize.boxsize, this.stageSize.height * this.stageSize.boxsize);
            this.shp.graphics.endFill();
        };
        return bgame;
    }());
    FK.bgame = bgame;
    __reflect(bgame.prototype, "FK.bgame");
})(FK || (FK = {}));
//# sourceMappingURL=bgame.js.map