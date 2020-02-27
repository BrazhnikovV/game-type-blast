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
var TilesFactory_1 = require("./factories/TilesFactory");
var Config_1 = require("../config/Config");
var TilesContainer = (function (_super) {
    __extends(TilesContainer, _super);
    function TilesContainer() {
        var _this = _super.call(this) || this;
        _this.tilesFactory = new TilesFactory_1.TilesFactory();
        _this.tilesFactory.create().map(function (tile) {
            _super.prototype.addChild.call(_this, tile);
            return tile;
        });
        return _this;
    }
    TilesContainer.prototype.clearMatchTiles = function (matchTiles) {
        var _this = this;
        matchTiles.map(function (mTl) {
            _this['children']
                .filter(function (fTl) { return fTl.getColl() === mTl.getColl() && fTl.getRow() === mTl.getRow(); })
                .map(function (rTl) {
                _super.prototype.removeChild.call(_this, rTl);
            });
        });
    };
    TilesContainer.prototype.resetVisitedTiles = function () {
        this['children'].filter(function (fTile) { return fTile.getVisited; }).map(function (mTile) {
            mTile.setVisited();
            return mTile;
        });
    };
    TilesContainer.prototype.getChildrens = function () {
        return this['children'];
    };
    TilesContainer.prototype.addTiles = function () {
        var coll, row = 0;
        for (var i = 0; i < (Config_1.Config.cols * Config_1.Config.rows); ++i) {
            if (i !== 0 && (i % Config_1.Config.cols) === 0)
                row++;
            coll = i % Config_1.Config.cols;
            var arr = this['children'].filter(function (fT) { return fT.getColl() === coll && fT.getRow() === row; });
            if (arr.length === 0) {
                var tile = this.tilesFactory.create({ 'coll': coll, 'row': row });
                _super.prototype.addChild.call(this, tile);
            }
        }
    };
    return TilesContainer;
}(PIXI.Container));
exports.TilesContainer = TilesContainer;
