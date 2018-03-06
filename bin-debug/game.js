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
var FK;
(function (FK) {
    var game = (function (_super) {
        __extends(game, _super);
        function game(main) {
            var _this = _super.call(this, main) || this;
            _this.showStage();
            return _this;
        }
        game.prototype.begin = function () {
        };
        return game;
    }(FK.bgame));
    FK.game = game;
    __reflect(game.prototype, "FK.game");
})(FK || (FK = {}));
//# sourceMappingURL=game.js.map