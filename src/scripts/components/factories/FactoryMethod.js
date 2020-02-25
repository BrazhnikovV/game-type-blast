"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FactoryMethod = (function () {
    function FactoryMethod() {
    }
    FactoryMethod.prototype.create = function () {
        return this.createComponent();
    };
    return FactoryMethod;
}());
exports.FactoryMethod = FactoryMethod;
