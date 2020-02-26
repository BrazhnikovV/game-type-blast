import PIXI = require("pixi.js");
import TWEEN = require('@tweenjs/tween.js');
import {Application} from "../core/Application";
import {TilesContainer} from "./TilesContainer";
import {Config} from "../config/Config";
import {TilesSearchHelper} from "../utils/TilesSearchHelper";

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
            this.handleClickOnTiles( data );
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

    /**
     * handleClickOnTiles - обрабатываем событие клика по тайлу
     * @param data - данные переданные от тайла
     * @return void
     */
    private handleClickOnTiles( data ): void {

        let tiles    = this.tiles.getChildrens();
        let mchTiles = TilesSearchHelper.findNeighboringTiles(
            data.tile.getColl(), data.tile.getRow(), [], tiles
        );

        if ( mchTiles.length > 1 ) {
            this.tiles.clearMatchTiles( mchTiles );
            this.tiles.resetVisitedTiles();

            let mvdTiles = TilesSearchHelper.getTilesToBeMoved( mchTiles, tiles );
            let movedTilesWithDistance = TilesSearchHelper.getMovementDistance( mvdTiles, mchTiles );

            this.moveTilesToFreePlaces( movedTilesWithDistance );
        }
    }

    /**
     * moveTilesToFreePlaces - переместить оставшиеся тайлы после
     * уничтожения группы совпавших на освободившиеся места
     * @param movedDistance - набор тайлов, которые необходимо переместить
     * @return void
     */
    private moveTilesToFreePlaces(  movedDistance: any[] ): void {

        movedDistance.map( tile => {
            const offsetY  = Config.tileOffsetY * tile.rows;
            const distance = tile.mvdTile.height * tile.rows;
            const targetY  = tile.mvdTile.y + distance + offsetY;

            tile.mvdTile.setRow( tile.mvdTile.getRow() + tile.rows );

            new TWEEN.Tween( tile.mvdTile )
                .to( { y: targetY }, 500 )
                .easing( TWEEN.Easing.Quadratic.Out )
                .onComplete(() => {
                    this.handleClickOnTiles( { 'tile' : tile.mvdTile } );
                    //this.tiles.addTiles( matchTiles );
                })
            .start();
        });
    }
}
