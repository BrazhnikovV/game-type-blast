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
var RandomHelper_1 = require("../utils/RandomHelper");
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        var _this = _super.call(this) || this;
        _this.colors = ['blue', 'green', 'purple', 'red', 'yellow'];
        _this.color = '';
        _this.visited = false;
        _this.coll = 0;
        _this.row = 0;
        _this.setBg();
        return _this;
    }
    Tile.prototype.setBg = function () {
        this.color = this.colors[RandomHelper_1.RandomHelper.getRandomInt(4)];
        this.bg = PIXI.Sprite.fromImage('images/tiles/' + this.color + '.png');
        this.bg.width = 160;
        this.bg.height = 160;
        _super.prototype.addChild.call(this, this.bg);
    };
    Tile.prototype.setRow = function (num) {
        this.row = num;
    };
    Tile.prototype.getRow = function () {
        return this.row;
    };
    Tile.prototype.setColl = function (num) {
        this.coll = num;
    };
    Tile.prototype.getColl = function () {
        return this.coll;
    };
    Tile.prototype.setVisited = function (status) {
        this.visited = status;
    };
    Tile.prototype.getVisited = function () {
        return this.visited;
    };
    Tile.prototype.getColor = function () {
        return this.color;
    };
    Tile.prototype.getWitdh = function () {
        return this.bg.width;
    };
    Tile.prototype.getHeight = function () {
        return this.bg.height;
    };
    return Tile;
}(PIXI.Container));
exports.Tile = Tile;
