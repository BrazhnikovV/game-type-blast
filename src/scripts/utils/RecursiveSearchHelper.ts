import PIXI = require("pixi.js");
import in_array = require('in_array');
//import {Config} from "../config/Config";

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
             matchTiles.push( tiles[this.getIndex( coll, row, tiles )] );
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
     * getIndex -
     * @param c - номер колонки
     * @param r - номер строки
     * @param tiles - весь набор тайло на доске
     */
    public static getIndex( c: number, r: number, tiles: PIXI.Container[] ): number {

        let index = 0;
        tiles.map( ( tile, tIndex) => {
            if ( tile.getColl() === c && tile.getRow() === r ) {
                index = tIndex;
            }
            return tile;
        });

        return index;
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

        let index = this.getIndex( c, r, tiles );
        let arr   = this.getNonDiagonalMatches( c, r, tiles )
        return arr.filter(
            tile => tile.getColor() === tiles[index].getColor()
        );
    }

    /**
     * getNonDiagonalMatches -
     * @param index -
     * @param c - номер колонки
     * @param tiles - весь набор тайло на доске
     */
    private static getNonDiagonalMatches( c: number, r: number, tiles: PIXI.Container[] ): PIXI.Container[] {

        let arr: PIXI.Container[] = [];

        arr.push(...tiles.filter( ( fTile  => fTile.getColl() === c && fTile.getRow() === r + 1 ) ) );
        arr.push(...tiles.filter( ( fTile  => fTile.getColl() === c && fTile.getRow() === r - 1 ) ) );
        arr.push(...tiles.filter( ( fTile  => fTile.getColl() === c + 1 && fTile.getRow() === r ) ) );
        arr.push(...tiles.filter( ( fTile  => fTile.getColl() === c - 1 && fTile.getRow() === r ) ) );

        return arr;
    }
}
