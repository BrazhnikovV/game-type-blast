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
var LoadScene = (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        var _this = _super.call(this) || this;
        _this.setBg();
        _this.setTicker();
        _super.prototype.addChild.call(_this, _this.preloader);
        return _this;
    }
    LoadScene.prototype.setBg = function () {
        this.preloader = PIXI.Sprite.fromImage('images/preloader.gif');
        this.preloader.x = Config_1.Config.screenWidth / 2;
        this.preloader.y = Config_1.Config.screenHeight / 2;
        this.preloader.anchor.set(0.5);
    };
    LoadScene.prototype.setTicker = function () {
        var _this = this;
        this.ticker = PIXI.ticker.shared;
        this.ticker.add(function (delta) {
            _this.preloader.rotation -= 0.11 * delta;
        });
    };
    return LoadScene;
}(PIXI.Container));
exports.LoadScene = LoadScene;
