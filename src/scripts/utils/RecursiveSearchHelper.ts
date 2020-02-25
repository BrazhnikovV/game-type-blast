import PIXI = require("pixi.js");
import in_array = require('in_array');

/**
 * RecursiveSearchHelper
 * @version 1.0.1
 * @package utils
 */
export class RecursiveSearchHelper {

    /**
     * findNeighboringTiles - найти все прилегающие тайлы
     * по номеру колонки и строки выбранного тайла
     * @param coll - номер колонки
     * @param row - номер строки
     * @param matchTiles - массив совпадений тайлов
     * @param tiles - весь набор тайло на доске
     * @return  PIXI.Container[]
     */
    public static findNeighboringTiles( coll: number, row: number, matchTiles: PIXI.Container[] = [], tiles: PIXI.Container[] ): PIXI.Container[] {

        if ( matchTiles.length === 0 ) {
            matchTiles.push( tiles[coll][row] );
        }

        let matchColls       = this.findMatchingTilesByCollRow( coll, row, tiles );
        let uniqMatchColls   = matchColls.filter( tile => !in_array( tile, matchTiles ) );
        let concatMatchTiles = matchTiles.concat( uniqMatchColls );
        let nonVisitedTiles  = concatMatchTiles.filter( tile => !tile.getVisited() );

        if ( nonVisitedTiles.length ) {
            let newMatchTiles = concatMatchTiles.map( ( tile ) => {
                if ( nonVisitedTiles[0].getColl() === tile.getColl()
                     && nonVisitedTiles[0].getRow() === tile.getRow() ) {
                     tile.setVisited( true );
                }
                return tile;
            });
            return this.findNeighboringTiles( nonVisitedTiles[0].getColl(), nonVisitedTiles[0].getRow(), newMatchTiles, tiles );
        } else {
            return concatMatchTiles;
        }
    }

    /**
     * findMatchingTilesByCollRow - найти прилегающие тайлы одного цвета
     * по номеру колонки и строки проверяемого тайла
     * @param c - номер колонки
     * @param r - номер строки
     * @param tiles - весь набор тайло на доске
     * @return PIXI.Container[]
     */
    private static findMatchingTilesByCollRow( c: number, r: number, tiles: PIXI.Container[] ): PIXI.Container[] {
        let arr: PIXI.Container[] = [];
        arr.push( tiles[c][r-1], tiles[c][r+1], tiles[c-1][r], tiles[c+1][r] );
        return arr.filter(
            tile => tile.getColor() === tiles[c][r].getColor()
        );
    }
}
