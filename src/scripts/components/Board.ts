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
    private gp: PIXI.Container;

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
     *  @access private
     *  @var isDisabled: boolean
     */
    private isDisabled: boolean = false;

    /**
     * constructor - конструктор
     */
    constructor( gp: PIXI.Container ) {
        super();
        this.gp = gp;
        this.gp.startTime();
    }

    public init(): void {
        this.setBg();
        this.setTiles();
        Application.ee.on('onClickTile', ( data ) => {
            if ( !this.isDisabled ) {
                this.handleClickOnTiles( data );
            }
        });
        Application.ee.on('onEndTime', () => {
            alert('Game over!');
            let isBegin = confirm("Назать заново?");
            if ( isBegin ) {
                this.gp.resetGame();
            } else {
                window.close();
            }
        });
        Application.ee.on('onWinGame', () => {
            alert('You Win!!!');
            let isBegin = confirm("Назать заново?");
            if ( isBegin ) {
                this.gp.resetGame();
            } else {
                window.close();
            }
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

        this.isDisabled = true;

        let tiles    = this.tiles.getChildrens();
        let mchTiles = TilesSearchHelper.findNeighboringTiles(
            data.tile.getColl(), data.tile.getRow(), [], tiles
        );

        this.tiles.clearMatchTiles( mchTiles );
        this.tiles.resetVisitedTiles();

        let mvdTiles = TilesSearchHelper.getTilesToBeMoved( mchTiles, tiles );
        let movedTilesWithDistance = TilesSearchHelper.getMovementDistance( mvdTiles, mchTiles );

        if ( mvdTiles.length === 0 ) {
            this.isDisabled = false;
        }

        this.moveTilesToFreePlaces( movedTilesWithDistance );
        this.gp.decrementNumberMoves();
        this.gp.addScore( mchTiles[0].getScore() * mchTiles.length );
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
                .to( { y: targetY }, 1000 )
                .easing( TWEEN.Easing.Quadratic.Out )
                .onComplete(() => {
                    this.tiles.addTiles();
                    this.isDisabled = false;
                }).start();
        });
    }
}
