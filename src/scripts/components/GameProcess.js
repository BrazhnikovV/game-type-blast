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
var Config_1 = require("../config/Config");
var Application_1 = require("../core/Application");
var GameProcess = (function (_super) {
    __extends(GameProcess, _super);
    function GameProcess() {
        var _this = _super.call(this) || this;
        _this.style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 96,
            fontWeight: 'bold',
            fill: ['#ffffff'],
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        _this.setTime();
        _this.setScores();
        _this.setMinScore();
        _this.setNumberMoves();
        return _this;
    }
    GameProcess.prototype.resetGame = function () {
        this.score.text = 0;
        this.time.text = Config_1.Config.gameTimeCount;
        this.numberMoves.text = Config_1.Config.gameNumberMoves;
        this.startTime();
    };
    GameProcess.prototype.addScore = function (score) {
        this.score.text = (parseInt(this.score.text) + score) + '';
        if (parseInt(this.score.text) > parseInt(this.minScore.text)) {
            Application_1.Application.ee.emit('onWinGame', {});
        }
    };
    GameProcess.prototype.decrementNumberMoves = function () {
        this.numberMoves.text = (parseInt(this.numberMoves.text) - 1) + '';
        if (parseInt(this.numberMoves.text) === 0) {
            Application_1.Application.ee.emit('onEndTime', {});
        }
    };
    GameProcess.prototype.startTime = function () {
        var _this = this;
        var tId = setInterval(function () {
            if (parseInt(_this.time.text) === 1) {
                Application_1.Application.ee.emit('onEndTime', {});
                clearInterval(tId);
            }
            _this.time.text = (parseInt(_this.time.text) - 1) + '';
        }, 1000);
    };
    GameProcess.prototype.setScores = function () {
        this.score = new PIXI.Text('0', this.style);
        this.score.x = Config_1.Config.gameScoreX;
        this.score.y = Config_1.Config.gameScoreY;
        this.score.anchor.set(0.5, 0.5);
        _super.prototype.addChild.call(this, this.score);
    };
    GameProcess.prototype.setMinScore = function () {
        this.minScore = new PIXI.Text(Config_1.Config.gameMinScore, this.style);
        this.minScore.x = Config_1.Config.gameMinScoreX;
        this.minScore.y = Config_1.Config.gameMinScoreY;
        this.minScore.anchor.set(0.5, 0.5);
        _super.prototype.addChild.call(this, this.minScore);
    };
    GameProcess.prototype.setNumberMoves = function () {
        this.numberMoves = new PIXI.Text(Config_1.Config.gameNumberMoves, this.style);
        this.numberMoves.x = Config_1.Config.gameNumberMovesX;
        this.numberMoves.y = Config_1.Config.gameNumberMovesY;
        this.numberMoves.anchor.set(0.5, 0.5);
        _super.prototype.addChild.call(this, this.numberMoves);
    };
    GameProcess.prototype.setTime = function () {
        this.time = new PIXI.Text(Config_1.Config.gameTimeCount, this.style);
        this.time.x = Config_1.Config.gameTimeX;
        this.time.y = Config_1.Config.gameTimeY;
        this.time.scale.x = 1.8;
        this.time.scale.y = 1.8;
        this.time.anchor.set(0.5, 0.5);
        _super.prototype.addChild.call(this, this.time);
    };
    return GameProcess;
}(PIXI.Container));
exports.GameProcess = GameProcess;
