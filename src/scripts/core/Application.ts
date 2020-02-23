import {Engine} from "./Engine";
import {ResizeHelper} from "../utils/ResizeHelper";
import {LoadScene} from "../scenes/LoadScene";
import {GameScene} from "../scenes/GameScene";

/**
 * Application
 * @version 1.0.1
 * @package core
 */
export class Application {

    /**
     *  @access private
     *  @var static width: number
     */
    public static width = 946;

    /**
     *  @access private
     *  @var static height: number
     */
    public static height = 669;

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
        window.addEventListener('resize', Application.resize );
        this.engine = new Engine( this.width, this.height, "game" );
        ResizeHelper.doResize( Application.engine, Application.width, Application.height );

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
        ResizeHelper.doResize( Application.engine, Application.width, Application.height );
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
