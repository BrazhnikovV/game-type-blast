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
var RecursiveSearchHelper_1 = require("../utils/RecursiveSearchHelper");
var TilesContainer_1 = require("./TilesContainer");
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.tiles = new TilesContainer_1.TilesContainer();
        return _this;
    }
    Board.prototype.init = function () {
        var _this = this;
        this.setBg();
        this.setTiles();
        Application_1.Application.ee.on('onClickTile', function (data) {
            var matchTiles = RecursiveSearchHelper_1.RecursiveSearchHelper.findNeighboringTiles(data.tile.getColl(), data.tile.getRow(), [], _this.tiles.getChildrens());
            _this.tiles.clearMatchTiles(matchTiles);
            _this.tiles.resetVisitedTiles();
        });
    };
    Board.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/board.png');
        _super.prototype.addChild.call(this, this.bg);
    };
    Board.prototype.setTiles = function () {
        _super.prototype.addChild.call(this, this.tiles);
    };
    return Board;
}(PIXI.Container));
exports.Board = Board;
