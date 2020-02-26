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
var RecursiveSearchHelper_1 = require("../utils/RecursiveSearchHelper");
var TilesContainer_1 = require("./TilesContainer");
var Config_1 = require("../config/Config");
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
        var matchTiles = RecursiveSearchHelper_1.RecursiveSearchHelper.findNeighboringTiles(data.tile.getColl(), data.tile.getRow(), [], this.tiles.getChildrens());
        this.tiles.clearMatchTiles(matchTiles);
        this.tiles.resetVisitedTiles();
        var movedTiles = RecursiveSearchHelper_1.RecursiveSearchHelper.getTilesToBeMoved(matchTiles, this.tiles.getChildrens());
        var movedTilesWithDistance = RecursiveSearchHelper_1.RecursiveSearchHelper.getMovementDistance(movedTiles, matchTiles);
        this.moveTilesToFreePlaces(movedTilesWithDistance);
    };
    Board.prototype.moveTilesToFreePlaces = function (movedDistance) {
        movedDistance.map(function (tile) {
            var cntTlsMove = tile.rows;
            var toY = (tile.mvdTile.y + (tile.mvdTile.height * cntTlsMove) + (Config_1.Config.tileOffsetY * cntTlsMove));
            tile.mvdTile.setRow(tile.mvdTile.getRow() + cntTlsMove);
            new TWEEN.Tween(tile.mvdTile)
                .to({ y: toY }, 500)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onComplete(function () {
            })
                .start();
        });
    };
    return Board;
}(PIXI.Container));
exports.Board = Board;
