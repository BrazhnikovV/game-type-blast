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
var TWEEN = require("@tweenjs/tween.js");
var Application_1 = require("../core/Application");
var TilesContainer_1 = require("./TilesContainer");
var Config_1 = require("../config/Config");
var TilesSearchHelper_1 = require("../utils/TilesSearchHelper");
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
            _this.handleClickOnTiles(data);
        });
    };
    Board.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/board.png');
        _super.prototype.addChild.call(this, this.bg);
    };
    Board.prototype.setTiles = function () {
        _super.prototype.addChild.call(this, this.tiles);
    };
    Board.prototype.handleClickOnTiles = function (data) {
        var tiles = this.tiles.getChildrens();
        var mchTiles = TilesSearchHelper_1.TilesSearchHelper.findNeighboringTiles(data.tile.getColl(), data.tile.getRow(), [], tiles);
        this.tiles.clearMatchTiles(mchTiles);
        this.tiles.resetVisitedTiles();
        var mvdTiles = TilesSearchHelper_1.TilesSearchHelper.getTilesToBeMoved(mchTiles, tiles);
        var movedTilesWithDistance = TilesSearchHelper_1.TilesSearchHelper.getMovementDistance(mvdTiles, mchTiles);
        this.moveTilesToFreePlaces(movedTilesWithDistance);
    };
    Board.prototype.moveTilesToFreePlaces = function (movedDistance) {
        var _this = this;
        movedDistance.map(function (tile) {
            var offsetY = Config_1.Config.tileOffsetY * tile.rows;
            var distance = tile.mvdTile.height * tile.rows;
            var targetY = tile.mvdTile.y + distance + offsetY;
            tile.mvdTile.setRow(tile.mvdTile.getRow() + tile.rows);
            new TWEEN.Tween(tile.mvdTile)
                .to({ y: targetY }, 1000)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(function () {
                _this.tiles.addTiles();
            }).start();
        });
    };
    return Board;
}(PIXI.Container));
exports.Board = Board;
