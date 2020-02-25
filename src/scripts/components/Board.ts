import PIXI = require("pixi.js");
import {Application} from "../core/Application";
import {RecursiveSearchHelper} from "../utils/RecursiveSearchHelper";
import {TilesContainer} from "./TilesContainer";

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
     *  @var tiles: TilesContainer
     */
    private tiles: TilesContainer = new TilesContainer();

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
    }

    public init(): void {
        this.setBg();
        this.setTiles();
        Application.ee.on('onClickTile', ( data ) => {
            let matchTiles = RecursiveSearchHelper.findNeighboringTiles(
                data.tile.getColl(), data.tile.getRow(), [], this.tiles.getChildrens()
            );
            this.tiles.clearMatchTiles( matchTiles );
            this.tiles.resetVisitedTiles();
            this.tiles.addTiles( matchTiles );
        });
    }

    /**
     * setBg - установить бэкграунд компонента
     * @return void
     */
    private setBg(): void {
        this.bg = PIXI.Sprite.fromImage( 'images/board.png' );
        super.addChild( this.bg );
    }

    /**
     * setTiles - установить тайлы
     * @return void
     */
    private setTiles(): void {
        super.addChild( this.tiles );
    }
}
