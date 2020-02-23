"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResizeHelper = (function () {
    function ResizeHelper() {
    }
    ResizeHelper.doResize = function (engine, width, height) {
        var ratio = Math.min(window.innerWidth / width, window.innerHeight / height);
        engine.stage.scale.x = engine.stage.scale.y = ratio;
        var newWidth = Math.ceil(width * ratio);
        var newHeight = Math.ceil(height * ratio);
        engine.renderer.resize(newWidth, newHeight);
    };
    return ResizeHelper;
}());
exports.ResizeHelper = ResizeHelper;
