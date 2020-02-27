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
    function Board(gp) {
        var _this = _super.call(this) || this;
        _this.tiles = new TilesContainer_1.TilesContainer();
        _this.isDisabled = false;
        _this.gp = gp;
        _this.gp.startTime();
        return _this;
    }
    Board.prototype.init = function () {
        this.setBg();
        this.setTiles();
        this.listenToEvents();
    };
    Board.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/board.png');
        _super.prototype.addChild.call(this, this.bg);
    };
    Board.prototype.setTiles = function () {
        _super.prototype.addChild.call(this, this.tiles);
    };
    Board.prototype.handleClickOnTiles = function (data) {
        this.isDisabled = true;
        var tiles = this.tiles.getChildrens();
        var mchTiles = TilesSearchHelper_1.TilesSearchHelper.findNeighboringTiles(data.tile.getColl(), data.tile.getRow(), [], tiles);
        this.tiles.clearMatchTiles(mchTiles);
        this.tiles.resetVisitedTiles();
        var mvdTiles = TilesSearchHelper_1.TilesSearchHelper.getTilesToBeMoved(mchTiles, tiles);
        var movedTilesWithDistance = TilesSearchHelper_1.TilesSearchHelper.getMovementDistance(mvdTiles, mchTiles);
        if (mvdTiles.length === 0) {
            this.isDisabled = false;
        }
        this.moveTilesToFreePlaces(movedTilesWithDistance);
        this.gp.decrementNumberMoves();
        this.gp.addScore(mchTiles[0].getScore() * mchTiles.length);
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
                _this.isDisabled = false;
            }).start();
        });
    };
    Board.prototype.listenToEvents = function () {
        var _this = this;
        Application_1.Application.ee.on('onClickTile', function (data) {
            if (!_this.isDisabled) {
                _this.handleClickOnTiles(data);
            }
        });
        Application_1.Application.ee.on('onEndTime', function () {
            alert('Game over!');
            _this.resetOrCloseGame(confirm("Назать заново?"));
        });
        Application_1.Application.ee.on('onWinGame', function () {
            alert('You Win!!!');
            _this.resetOrCloseGame(confirm("Назать заново?"));
        });
    };
    Board.prototype.resetOrCloseGame = function (isBegin) {
        if (isBegin) {
            this.gp.resetGame();
        }
        else {
            window.close();
        }
    };
    return Board;
}(PIXI.Container));
exports.Board = Board;
