"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = require("pixi.js");
var Engine = (function () {
    function Engine(width, height, containerId, fps) {
        if (fps === void 0) { fps = 60; }
        this.loader = PIXI.loader;
        this.renderer = PIXI.autoDetectRenderer(width, height, { "antialias": true, transparent: true });
        this.stage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();
        this.elapsed = performance.now();
        this.fps = fps;
        this.container = containerId ? document.getElementById(containerId) || document.body : document.body;
        this.container.appendChild(this.renderer.view);
    }
    return Engine;
}());
exports.Engine = Engine;
