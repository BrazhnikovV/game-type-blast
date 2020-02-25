"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var in_array = require("in_array");
var RecursiveSearchHelper = (function () {
    function RecursiveSearchHelper() {
    }
    RecursiveSearchHelper.findNeighboringTiles = function (coll, row, matchTiles, tiles) {
        if (matchTiles === void 0) { matchTiles = []; }
        if (matchTiles.length === 0) {
            matchTiles.push(tiles[coll][row]);
        }
        var matchColls = this.findMatchingTilesByCollRow(coll, row, tiles);
        var uniqMatchColls = matchColls.filter(function (tile) { return !in_array(tile, matchTiles); });
        var concatMatchTiles = matchTiles.concat(uniqMatchColls);
        var nonVisitedTiles = concatMatchTiles.filter(function (tile) { return !tile.getVisited(); });
        if (nonVisitedTiles.length) {
            var newMatchTiles = concatMatchTiles.map(function (tile) {
                if (nonVisitedTiles[0].getColl() === tile.getColl()
                    && nonVisitedTiles[0].getRow() === tile.getRow()) {
                    tile.setVisited(true);
                }
                return tile;
            });
            return this.findNeighboringTiles(nonVisitedTiles[0].getColl(), nonVisitedTiles[0].getRow(), newMatchTiles, tiles);
        }
        else {
            return concatMatchTiles;
        }
    };
    RecursiveSearchHelper.findMatchingTilesByCollRow = function (c, r, tiles) {
        var arr = [];
        arr.push(tiles[c][r - 1], tiles[c][r + 1], tiles[c - 1][r], tiles[c + 1][r]);
        return arr.filter(function (tile) { return tile.getColor() === tiles[c][r].getColor(); });
    };
    return RecursiveSearchHelper;
}());
exports.RecursiveSearchHelper = RecursiveSearchHelper;
