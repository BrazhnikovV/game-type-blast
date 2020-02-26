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
var Tile_1 = require("../Tile");
var FactoryMethod_1 = require("./FactoryMethod");
var Config_1 = require("../../config/Config");
var TilesFactory = (function (_super) {
    __extends(TilesFactory, _super);
    function TilesFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TilesFactory.prototype.createComponent = function (tile) {
        switch (tile) {
            case undefined:
                return this.initTiles();
                break;
            default:
                return this.addTiles(tile);
                break;
        }
        return [];
    };
    TilesFactory.prototype.initTiles = function () {
        var coll, row = 0;
        var tiles = [];
        for (var i = 0; i < (Config_1.Config.cols * Config_1.Config.rows); ++i) {
            if (i !== 0 && (i % Config_1.Config.cols) === 0)
                row++;
            coll = i % Config_1.Config.cols;
            tiles.push(new Tile_1.Tile());
            this.setParameters(tiles[i], coll, row);
            ;
        }
        return tiles;
    };
    TilesFactory.prototype.addTiles = function (tile) {
        var tiles = new Tile_1.Tile();
        console.log(tile);
        return tiles;
    };
    TilesFactory.prototype.setParameters = function (tile, coll, row) {
        this.setTileCollRow(tile, coll, row);
        this.setTilePosition(tile, coll, row);
    };
    TilesFactory.prototype.setTilePosition = function (tile, coll, row) {
        tile['x'] = tile.getWitdh() * coll + (Config_1.Config.tileOffsetX * coll) + 90;
        tile['y'] = tile.getHeight() * row + (Config_1.Config.tileOffsetY * row) + 90;
    };
    TilesFactory.prototype.setTileCollRow = function (tile, coll, row) {
        tile.setColl(coll);
        tile.setRow(row);
    };
    return TilesFactory;
}(FactoryMethod_1.FactoryMethod));
exports.TilesFactory = TilesFactory;
