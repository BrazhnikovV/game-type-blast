import PIXI = require("pixi.js");
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
     *  @access private
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

    private static load() {
        Application.engine.loader
            .add( "images/bg.png" )
            .add( "images/bg1.png" )
            .add( "images/bg2.png" )
            .add( "images/bg3.png" )
            .add( "images/bg4.png" )
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

    private static resize() {
        // Resize the renderer
        ResizeHelper.doResize( Application.engine, Config.screenWidth, Config.screenHeight );
    }

    private static render() {
        requestAnimationFrame( Application.render );
        Application.engine.renderer.render( Application.engine.stage );
    }

    private static onLoadResources() {
        Application.engine.stage.removeChild( this.loadScene );
        Application.engine.stage.addChild( new GameScene() );
    }
}
