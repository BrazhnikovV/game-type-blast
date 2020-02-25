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
var Config_1 = require("../config/Config");
var RecursiveSearchHelper_1 = require("../utils/RecursiveSearchHelper");
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.tiles = [];
        _this.setBg();
        _this.setTiles();
        _this.setMask();
        console.log(RecursiveSearchHelper_1.RecursiveSearchHelper.findNeighboringTiles(4, 4, [], _this.tiles));
        return _this;
    }
    Board.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/board.png');
        _super.prototype.addChild.call(this, this.bg);
    };
    Board.prototype.setTiles = function () {
        for (var i = 0; i < Config_1.Config.cols; ++i) {
            this.setTile(i);
        }
    };
    Board.prototype.setTile = function (coll) {
        this.tiles[coll] = [];
        for (var i = 0; i < Config_1.Config.rows; ++i) {
            this.tiles[coll][i] = new Tile_1.Tile();
            this.tiles[coll][i].setColl(coll);
            this.tiles[coll][i].setRow(i);
            this.setTilePosition(this.tiles[coll][i], coll, i);
            _super.prototype.addChild.call(this, this.tiles[coll][i]);
        }
    };
    Board.prototype.setTilePosition = function (tile, coll, row) {
        tile['x'] = tile.getWitdh() * coll + (Config_1.Config.tileOffsetX * coll) + 90;
        tile['y'] = tile.getHeight() * row + (Config_1.Config.tileOffsetY * row) + 90;
    };
    Board.prototype.setMask = function () {
        this.mask = new PIXI.Graphics();
        this.mask.drawRect(0, 0, this.bg.width, this.bg.height);
        this.mask.endFill();
        _super.prototype.addChild.call(this, this.mask);
    };
    return Board;
}(PIXI.Container));
exports.Board = Board;
