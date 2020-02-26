"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var in_array = require("in_array");
var RecursiveSearchHelper = (function () {
    function RecursiveSearchHelper() {
    }
    RecursiveSearchHelper.findNeighboringTiles = function (coll, row, matchTiles, tiles) {
        if (matchTiles === void 0) { matchTiles = []; }
        if (matchTiles.length === 0) {
            matchTiles.push(tiles[this.getIndex(coll, row, tiles)]);
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
    RecursiveSearchHelper.getIndex = function (c, r, tiles) {
        var index = 0;
        tiles.map(function (tile, tIndex) {
            if (tile.getColl() === c && tile.getRow() === r) {
                index = tIndex;
            }
            return tile;
        });
        return index;
    };
    RecursiveSearchHelper.findMatchingTilesByCollRow = function (c, r, tiles) {
        var index = this.getIndex(c, r, tiles);
        var arr = this.getNonDiagonalMatches(c, r, tiles);
        return arr.filter(function (tile) { return tile.getColor() === tiles[index].getColor(); });
    };
    RecursiveSearchHelper.getNonDiagonalMatches = function (c, r, tiles) {
        var arr = [];
        arr.push.apply(arr, tiles.filter((function (fTile) { return fTile.getColl() === c && fTile.getRow() === r + 1; })));
        arr.push.apply(arr, tiles.filter((function (fTile) { return fTile.getColl() === c && fTile.getRow() === r - 1; })));
        arr.push.apply(arr, tiles.filter((function (fTile) { return fTile.getColl() === c + 1 && fTile.getRow() === r; })));
        arr.push.apply(arr, tiles.filter((function (fTile) { return fTile.getColl() === c - 1 && fTile.getRow() === r; })));
        return arr;
    };
    return RecursiveSearchHelper;
}());
exports.RecursiveSearchHelper = RecursiveSearchHelper;
