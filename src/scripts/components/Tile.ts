import PIXI = require("pixi.js");

/**
 * Tile
 * @version 1.0.1
 * @package components
 */
export class Tile extends PIXI.Container {

    /**
     *  @access private
     *  @var preloader: PIXI.Sprite
     */
    private bg: PIXI.Sprite;

    /**
     *  @access private
     *  @var colors: string[]
     */
    private colors: string[] = ['blue','green','purple','red','yellow'];

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.setBg();
        super.addChild( this.bg );
    }

    /**
     * setBg - установить бэкграунд компонента
     * @return void
     */
    public setBg(): void {
        this.bg = PIXI.Sprite.fromImage( 'images/tiles/' + this.colors[0] + '.png' );
        this.bg.width  = 160;
        this.bg.height = 160;
    }
}
