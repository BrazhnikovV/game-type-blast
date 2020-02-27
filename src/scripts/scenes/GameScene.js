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
var GameProcess_1 = require("../components/GameProcess");
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.setBg();
        _this.setBoard();
        return _this;
    }
    GameScene.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/bg.png');
        this.bg.interactive = true;
        _super.prototype.addChild.call(this, this.bg);
    };
    GameScene.prototype.setBoard = function () {
        this.setGameProcess();
        this.board = new Board_1.Board(this.gameProcess);
        this.board.init();
        this.board.x = Config_1.Config.boardX;
        this.board.y = Config_1.Config.boardY;
        _super.prototype.addChild.call(this, this.board);
    };
    GameScene.prototype.setGameProcess = function () {
        this.gameProcess = new GameProcess_1.GameProcess();
        _super.prototype.addChild.call(this, this.gameProcess);
    };
    return GameScene;
}(PIXI.Container));
exports.GameScene = GameScene;
