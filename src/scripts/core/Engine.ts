import PIXI = require("pixi.js");

/**
 * Engine
 * @version 1.0.1
 * @package core
 */
export class Engine {

    /**
     *  @access public
     *  @var container: HTMLElement
     */
    public container: HTMLElement;

    /**
     *  @access public
     *  @var loader: PIXI.loaders.Loader
     */
    public loader: PIXI.loaders.Loader;

    /**
     *  @access public
     *  @var renderer: PIXI.SystemRenderer
     */
    public renderer: PIXI.SystemRenderer;

    /**
     *  @access public
     *  @var stage: PIXI.Container
     */
    public stage: PIXI.Container;

    /**
     *  @access public
     *  @var graphics: PIXI.Graphics
     */
    public graphics: PIXI.Graphics;

    /**
     *  @access public
     *  @var fps: int
     */
    public fps: int;

    /**
     *  @access public
     *  @var elapsed: double
     */
    public elapsed: double;

    /**
     * constructor - конструктор
     * @param width
     * @param height
     * @param containerId
     * @param fps
     */
    constructor( width: int, height: int, containerId?: string, fps = 60 ) {

        this.loader    = PIXI.loader;
        this.renderer  = PIXI.autoDetectRenderer( width, height, { "antialias": true, transparent: true } );
        this.stage     = new PIXI.Container();
        this.graphics  = new PIXI.Graphics();
        this.elapsed   = performance.now();
        this.fps       = fps;
        this.container = containerId ? document.getElementById( containerId ) || document.body : document.body;
        this.container.appendChild( this.renderer.view );
    }
}
