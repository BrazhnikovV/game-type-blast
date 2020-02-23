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
var Tile_1 = require("./Tile");
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.setBg();
        _this.setTile();
        _super.prototype.addChild.call(_this, _this.bg);
        _super.prototype.addChild.call(_this, _this.tile);
        return _this;
    }
    Board.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/board.png');
    };
    Board.prototype.setTile = function () {
        this.tile = new Tile_1.Tile();
        this.tile.x = 45;
        this.tile.y = 45;
    };
    return Board;
}(PIXI.Container));
exports.Board = Board;
