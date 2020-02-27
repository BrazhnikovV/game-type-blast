"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FactoryMethod = (function () {
    function FactoryMethod() {
    }
    FactoryMethod.prototype.create = function (tile) {
        return this.createComponent(tile);
    };
    return FactoryMethod;
}());
exports.FactoryMethod = FactoryMethod;
