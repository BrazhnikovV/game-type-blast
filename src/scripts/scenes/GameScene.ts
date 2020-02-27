import PIXI = require("pixi.js");
import {Board} from "../components/Board";
import {Config} from "../config/Config";
import {GameProcess} from "../components/GameProcess";

export class GameScene extends PIXI.Container implements IScene {

    /**
     *  @access public
     *  @var gameProcess: PIXI.Container
     */
    private gameProcess: PIXI.Container;

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
    }

    /**
     * setBg - установить бэкграунд сцены
     * @return void
     */
    public setBg(): void {
        this.bg = PIXI.Sprite.fromImage('images/bg.png');
        this.bg.interactive = true;
        super.addChild( this.bg );
    }

    /**
     * setBoard - установить
     * @return void
     */
    public setBoard(): void {
        this.setGameProcess();

        this.board = new Board( this.gameProcess );
        this.board.init();
        this.board.x = Config.boardX;
        this.board.y = Config.boardY;

        super.addChild( this.board );
    }

    private setGameProcess(): void {
        this.gameProcess = new GameProcess();
        super.addChild( this.gameProcess );
    }
}
