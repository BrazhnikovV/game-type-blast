"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RandomHelper = (function () {
    function RandomHelper() {
    }
    RandomHelper.getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    return RandomHelper;
}());
exports.RandomHelper = RandomHelper;
