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

    protected createComponent() {
        this.setTiles();
        return this.tiles;
    }

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private tiles: PIXI.Container[] = [];

    /**
     * setTiles - перебирает колонки и запускает функцию установки значений для тайлов
     * @return void
     */
    private setTiles(): void {
        let coll, row = 0;
        for ( let i = 0; i < ( Config.cols * Config.rows ); ++i ) {

            if ( i !== 0 && ( i % Config.cols ) === 0 ) row++;
            coll = i % Config.cols;

            this.tiles.push( new Tile() );
            this.setTileCollRow( this.tiles[i], coll, row );
            this.setTilePosition( this.tiles[i], coll, row );
        }
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
