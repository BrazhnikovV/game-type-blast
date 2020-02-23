import PIXI = require("pixi.js");
import {Application} from "../core/Application";


/**
 * LoadScene - класс сцена загрузки ресурсов игры
 * @version 1.0.1
 * @package scenes
 */
export class LoadScene extends PIXI.Container implements IScene {

    /**
     *  @access private
     *  @var ticker: PIXI.ticker.shared
     */
    private ticker: PIXI.ticker.shared;

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private preloader: PIXI.Sprite;

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.setBg();
        this.setTicker();
        super.addChild( this.preloader );
    }

    /**
     * setBg - установить бэкграунд сцены
     * @return void
     */
    public setBg(): void {
        this.preloader   = PIXI.Sprite.fromImage( 'images/preloader.gif' );
        this.preloader.x = Application.width / 2;
        this.preloader.y = Application.height / 2;
        this.preloader.anchor.set( 0.5 );
    }

    /**
     * setTicker - установить тикер сцены
     * @return void
     */
    private setTicker(): void {
        this.ticker = PIXI.ticker.shared;
        this.ticker.add( ( delta ) => {
            this.preloader.rotation -= 0.11 * delta;
        });
    }
}
