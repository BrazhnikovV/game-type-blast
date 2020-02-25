import PIXI = require("pixi.js");
import {Tile} from "./Tile";
import {Config} from "../config/Config";
import {RecursiveSearchHelper} from "../utils/RecursiveSearchHelper";

/**
 * Board
 * @version 1.0.1
 * @package components
 */
export class Board extends PIXI.Container {

    /**
     *  @access private
     *  @var mask: PIXI.Graphics
     */
    private mask: PIXI.Graphics;

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private bg: PIXI.Sprite;

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private tiles: PIXI.Container[] = [];

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.setBg();
        this.setTiles();
        this.setMask();
        console.log( RecursiveSearchHelper.findNeighboringTiles(4,4, [], this.tiles ) );
    }

    /**
     * setBg - установить бэкграунд компонента
     * @return void
     */
    public setBg(): void {
        this.bg = PIXI.Sprite.fromImage( 'images/board.png' );
        super.addChild( this.bg );
    }

    /**
     * setTiles - перебирает колонки и запускает функцию установки значений для тайлов
     * @return void
     */
    private setTiles(): void {
        for ( let i = 0; i < Config.cols; ++i ) {
            this.setTile( i );
        }
    }

    /**
     * setTile - перебирает строки и устанавливает значение
     * для тайла с учетом колонки и номера строки
     * @param coll
     */
    private setTile( coll: number ): void {
        this.tiles[coll] = [];
        for ( let i = 0; i < Config.rows; ++i ) {
            this.tiles[coll][i] = new Tile();
            this.tiles[coll][i].setColl( coll );
            this.tiles[coll][i].setRow( i );
            this.setTilePosition( this.tiles[coll][i], coll, i );
            super.addChild( this.tiles[coll][i] );
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
     * setMask - установить маску для доски
     * @return void
     */
    private setMask(): void {
        this.mask = new PIXI.Graphics();
        this.mask.drawRect( 0,0, this.bg.width, this.bg.height );
        this.mask.endFill();
        super.addChild( this.mask );
    }
}
