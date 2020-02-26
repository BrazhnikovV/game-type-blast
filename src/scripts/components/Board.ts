import PIXI = require("pixi.js");
import TWEEN = require('@tweenjs/tween.js');
import {Application} from "../core/Application";
import {RecursiveSearchHelper} from "../utils/RecursiveSearchHelper";
import {TilesContainer} from "./TilesContainer";
import {Config} from "../config/Config";

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

        let matchTiles = RecursiveSearchHelper.findNeighboringTiles(
            data.tile.getColl(), data.tile.getRow(), [], this.tiles.getChildrens()
        );
        this.tiles.clearMatchTiles( matchTiles );
        this.tiles.resetVisitedTiles();

        let movedTiles = RecursiveSearchHelper.getTilesToBeMoved( matchTiles, this.tiles.getChildrens() );
        let movedTilesWithDistance = RecursiveSearchHelper.getMovementDistance( movedTiles, matchTiles );

        this.moveTilesToFreePlaces( movedTilesWithDistance );
    }

    /**
     * moveTilesToFreePlaces - переместить оставшиеся тайлы после
     * уничтожения группы совпавших на освободившиеся места
     * @param moveTiles - набор тайлов, которые необходимо переместить
     * @param matchTiles - группа совпавших тайлов
     * @return void
     */
    private moveTilesToFreePlaces(  movedDistance: any[] ): void {

        movedDistance.map( tile => {
            const cntTlsMove = tile.rows;
            const toY = ( tile.mvdTile.y + ( tile.mvdTile.height * cntTlsMove ) + ( Config.tileOffsetY * cntTlsMove ) );
            tile.mvdTile.setRow( tile.mvdTile.getRow() + cntTlsMove );
            new TWEEN.Tween( tile.mvdTile )
                .to( { y: toY }, 500 )
                .easing( TWEEN.Easing.Quadratic.Out )
                .onComplete(() => {
                    //this.tiles.addTiles( matchTiles );
                })
            .start();
        });
    }
}
