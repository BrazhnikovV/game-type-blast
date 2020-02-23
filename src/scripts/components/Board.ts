import PIXI = require("pixi.js");
import {Tile} from "./Tile";

/**
 * Board
 * @version 1.0.1
 * @package components
 */
export class Board extends PIXI.Container {

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private bg: PIXI.Sprite;

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private tile: PIXI.Container;

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.setBg();
        this.setTile();
        super.addChild( this.bg );
        super.addChild( this.tile );
    }

    /**
     * setBg - установить бэкграунд компонента
     * @return void
     */
    public setBg(): void {
        this.bg = PIXI.Sprite.fromImage( 'images/board.png' );
    }

    private setTile(): void {
        this.tile = new Tile();
        this.tile.x = 45;
        this.tile.y = 45;
    }
}
