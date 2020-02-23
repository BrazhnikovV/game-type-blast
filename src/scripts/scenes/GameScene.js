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
var Application_1 = require("../core/Application");
var Board_1 = require("../components/Board");
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
        this.bg.width = Application_1.Application.width;
        this.bg.height = Application_1.Application.height;
    };
    GameScene.prototype.setBoard = function () {
        this.board = new Board_1.Board();
        this.board.x = 35;
        this.board.y = 115;
        this.board.width = 442;
        this.board.height = 495;
    };
    return GameScene;
}(PIXI.Container));
exports.GameScene = GameScene;
