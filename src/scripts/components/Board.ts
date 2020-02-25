import PIXI = require("pixi.js");
import {TilesFactory} from "./factories/TilesFactory";
import {Application} from "../core/Application";
import {RecursiveSearchHelper} from "../utils/RecursiveSearchHelper";

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
    private tiles: PIXI.Container[] = [];

    /**
     *  @access private
     *  @var tilesFactory: TilesFactory
     */
    private tilesFactory: TilesFactory = new TilesFactory();

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
            console.log(
                RecursiveSearchHelper.findNeighboringTiles(
                    data.tile.getColl(), data.tile.getRow(), [], this.tiles
                )
            );
            this.resetVisitedTiles();
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
     * setTiles
     * @return void
     */
    private setTiles(): void {
        this.tiles = this.tilesFactory.create().map( tile => {
            super.addChild( tile );
            return tile;
        });
    }

    private resetVisitedTiles(): void {
        this.tiles = this.tiles.filter( fTile => fTile.getVisited ).map( (mTile) => {
           mTile.setVisited();
           return mTile;
        });
    }
}
