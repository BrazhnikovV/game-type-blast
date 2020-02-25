"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FactoryMethod = (function () {
    function FactoryMethod() {
        this.ADDITIONAL = 0;
        this.INITIAL = 1;
    }
    FactoryMethod.prototype.create = function (tiles) {
        return this.createComponent(tiles);
    };
    return FactoryMethod;
}());
exports.FactoryMethod = FactoryMethod;
