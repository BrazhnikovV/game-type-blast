import PIXI = require("pixi.js");
import {Application} from "../core/Application";
import {Board} from "../components/Board";

export class GameScene extends PIXI.Container implements IScene {

    /**
     *  @access public
     *  @var stage: PIXI.Container
     */
    public container: PIXI.Container;

    /**
     *  @access private
     *  @var bg: PIXI.Sprite
     */
    private bg: PIXI.Sprite;

    /**
     *  @access private
     *  @var bg: PIXI.Sprite
     */
    private board: PIXI.Container;

    /**
     * constructor - конструктор
     */
    constructor() {

        super();
        this.setBg();
        this.setBoard();
        super.addChild( this.bg );
        super.addChild( this.board );
    }

    /**
     * setBg - установить бэкграунд сцены
     * @return void
     */
    public setBg(): void {
        this.bg = PIXI.Sprite.fromImage('images/bg.png');
        this.bg.interactive = true;
        this.bg.width = Application.width;
        this.bg.height = Application.height;
    }

    /**
     * setBoard - установить
     * @return void
     */
    public setBoard(): void {
        this.board = new Board();
        this.board.x = 35;
        this.board.y = 115;
        this.board.width  = 442;
        this.board.height = 495;
    }
}
