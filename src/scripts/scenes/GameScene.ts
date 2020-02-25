import PIXI = require("pixi.js");
import {Board} from "../components/Board";
import {Config} from "../config/Config";

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
    }

    /**
     * setBoard - установить
     * @return void
     */
    public setBoard(): void {
        this.board = new Board();
        this.board.init();
        this.board.x = Config.boardX;
        this.board.y = Config.boardY;
    }
}
