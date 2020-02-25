"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var Board_1 = require("../components/Board");
var Config_1 = require("../config/Config");
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.setBg();
        _this.setBoard();
        _super.prototype.addChild.call(_this, _this.bg);
        _super.prototype.addChild.call(_this, _this.board);
        return _this;
    }
    GameScene.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/bg.png');
        this.bg.interactive = true;
    };
    GameScene.prototype.setBoard = function () {
        this.board = new Board_1.Board();
        this.board.init();
        this.board.x = Config_1.Config.boardX;
        this.board.y = Config_1.Config.boardY;
    };
    return GameScene;
}(PIXI.Container));
exports.GameScene = GameScene;
