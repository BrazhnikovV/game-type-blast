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
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        var _this = _super.call(this) || this;
        _this.colors = ['blue', 'green', 'purple', 'red', 'yellow'];
        _this.setBg();
        _super.prototype.addChild.call(_this, _this.bg);
        return _this;
    }
    Tile.prototype.setBg = function () {
        this.bg = PIXI.Sprite.fromImage('images/tiles/' + this.colors[0] + '.png');
        this.bg.width = 160;
        this.bg.height = 160;
    };
    return Tile;
}(PIXI.Container));
exports.Tile = Tile;
