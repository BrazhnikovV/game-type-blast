import PIXI = require("pixi.js");
import {Tile} from "../Tile";
import {FactoryMethod} from "./FactoryMethod";
import {Config} from "../../config/Config";

/**
 * TilesFactory
 * @version 1.0.1
 * @package components
 */
export class TilesFactory extends FactoryMethod {

    /**
     * createComponent -
     * @param type - тип создаваемого набора тайлов
     * @return PIXI.Container[]
     */
    protected createComponent( tile: {} ): PIXI.Container[] {
        switch( tile ) {
            case undefined:
                return this.initTiles();
            break;
            default:
                return this.addTiles( tile );
            break;
        }
        return [];
    }

    /**
     * initTiles - перебирает колонки и запускает функцию установки значений для тайлов
     * @return PIXI.Container[]
     */
    private initTiles():  PIXI.Container[] {
        let coll, row = 0;
        let tiles: PIXI.Container[] = []
        for ( let i = 0; i < ( Config.cols * Config.rows ); ++i ) {

            if ( i !== 0 && ( i % Config.cols ) === 0 ) row++;
            coll = i % Config.cols;

            tiles.push( new Tile() );
            this.setParameters( tiles[i], coll, row );;
        }

        return tiles;
    }

    /**
     * addTiles - добавляет необходимые тайлы
     * @return void
     */
    private addTiles( tile: {} ): PIXI.Container {

        let tiles: PIXI.Container = new Tile();
        console.log(tile);

        return tiles;
    }

    /**
     * setParameters - установить необходимые параметры тайла
     * @param tile - объекта тайла
     * @param coll - номер колонки
     * @param row - номер строки
     * @return void
     */
    private setParameters( tile: Tile, coll: number, row: number ): void {
        this.setTileCollRow( tile, coll, row );
        this.setTilePosition( tile, coll, row );
    }

    /**
     * setTilePosition - установить позицию тайла
     * @param tile - объекта тайла
     * @param coll - номер колонки
     * @param row - номер строки
     * @return void
     */
    private setTilePosition( tile: Tile, coll: number, row: number ): void {
        tile['x'] = tile.getWitdh() * coll + ( Config.tileOffsetX * coll ) + 90;
        tile['y'] = tile.getHeight() * row  + ( Config.tileOffsetY * row ) + 90;
    }

    /**
     * setTilePosition - установить номер колонки и номер строки тайла
     * @param tile - объекта тайла
     * @param coll - номер колонки
     * @param row - номер строки
     * @return void
     */
    private setTileCollRow( tile: Tile, coll: number, row: number ): void {
        tile.setColl( coll );
        tile.setRow( row );
    }
}
