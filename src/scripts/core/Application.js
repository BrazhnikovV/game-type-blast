"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var Engine_1 = require("./Engine");
var ResizeHelper_1 = require("../utils/ResizeHelper");
var LoadScene_1 = require("../scenes/LoadScene");
var GameScene_1 = require("../scenes/GameScene");
var Config_1 = require("../config/Config");
var Application = (function () {
    function Application() {
    }
    Application.init = function () {
        this.ee = new PIXI.utils.EventEmitter();
        window.addEventListener('resize', Application.resize);
        this.engine = new Engine_1.Engine(Config_1.Config.screenWidth, Config_1.Config.screenHeight, "game");
        ResizeHelper_1.ResizeHelper.doResize(Application.engine, Config_1.Config.screenWidth, Config_1.Config.screenHeight);
        this.loadScene = new LoadScene_1.LoadScene();
        Application.engine.stage.addChild(this.loadScene);
        Application.render();
        this.load();
    };
    Application.load = function () {
        var _this = this;
        Application.engine.loader
            .add("images/bg.png")
            .add("images/bg1.png")
            .add("images/bg2.png")
            .add("images/bg3.png")
            .add("images/bg4.png")
            .add("images/board.png")
            .add("images/tiles/blue.png")
            .add("images/tiles/green.png")
            .add("images/tiles/purple.png")
            .add("images/tiles/red.png")
            .add("images/tiles/yellow.png")
            .load(function () {
            _this.onLoadResources();
        });
    };
    Application.resize = function () {
        ResizeHelper_1.ResizeHelper.doResize(Application.engine, Config_1.Config.screenWidth, Config_1.Config.screenHeight);
    };
    Application.render = function () {
        requestAnimationFrame(Application.render);
        Application.engine.renderer.render(Application.engine.stage);
    };
    Application.onLoadResources = function () {
        Application.engine.stage.removeChild(this.loadScene);
        Application.engine.stage.addChild(new GameScene_1.GameScene());
    };
    return Application;
}());
exports.Application = Application;
