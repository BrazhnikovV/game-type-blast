import PIXI = require('pixi.js');
import TWEEN = require('@tweenjs/tween.js');
import {Engine} from "./Engine";
import {ResizeHelper} from "../utils/ResizeHelper";
import {LoadScene} from "../scenes/LoadScene";
import {GameScene} from "../scenes/GameScene";
import {Config} from "../config/Config";

/**
 * Application
 * @version 1.0.1
 * @package core
 */
export class Application {

    /**
     *  @access public
     *  @var ee: PIXI.utils.EventEmitter
     */
    public static ee: PIXI.utils.EventEmitter;

    /**
     *  @access private
     *  @var static engine: Engine
     */
    private static engine: Engine;

    /**
     *  @access private
     *  @var static loadScene: LoadScene
     */
    private static loadScene: LoadScene;

    /**
     * init
     * @return void
     */
    public static init(): void {

        this.ee = new PIXI.utils.EventEmitter();

        window.addEventListener('resize', Application.resize );
        this.engine = new Engine( Config.screenWidth, Config.screenHeight, "game" );
        ResizeHelper.doResize( Application.engine, Config.screenWidth, Config.screenHeight );

        this.loadScene = new LoadScene();
        Application.engine.stage.addChild( this.loadScene );
        Application.render();
        this.load();
    }

    /**
     * load
     * @return void
     */
    private static load(): void {

        Application.engine.loader
            .add( "images/bg.png" )
            .add( "images/board.png" )
            .add( "images/tiles/blue.png" )
            .add( "images/tiles/green.png" )
            .add( "images/tiles/purple.png" )
            .add( "images/tiles/red.png" )
            .add( "images/tiles/yellow.png" )
            .load( () => {
                this.onLoadResources();
            });
    }

    /**
     * resize
     * @return void
     */
    private static resize(): void {
        ResizeHelper.doResize( Application.engine, Config.screenWidth, Config.screenHeight );
    }

    /**
     * render
     * @return void
     */
    private static render(): void {
        requestAnimationFrame( Application.render );
        Application.engine.renderer.render( Application.engine.stage );
        TWEEN.update();
    }

    /**
     * onLoadResources
     * @return void
     */
    private static onLoadResources(): void {
        Application.engine.stage.removeChild( this.loadScene );
        Application.engine.stage.addChild( new GameScene() );
    }
}
