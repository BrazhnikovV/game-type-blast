import PIXI = require("pixi.js");
import {Config} from "../config/Config";
import {Application} from "../core/Application";

/**
 * GameTime
 * @version 1.0.1
 * @package components
 */
export class GameProcess extends PIXI.Container {

    /**
     *  @access private
     *  @var score: PIXI.Text
     */
    private score: PIXI.Text;

    /**
     *  @access private
     *  @var minScore: PIXI.Text
     */
    private minScore: PIXI.Text;

    /**
     *  @access private
     *  @var time: PIXI.Text
     */
    private time: PIXI.Text;

    /**
     *  @access private
     *  @var numberMoves: PIXI.Text
     */
    private numberMoves: PIXI.Text;

    /**
     *  @access private
     *  @var tId: number
     */
    private tId: number = 0;

    /**
     *  @access private
     *  @var style: PIXI.TextStyle
     */
    private style: PIXI.TextStyle = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 96,
        fontWeight: 'bold',
        fill: ['#ffffff'],
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440
    });

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.setTime();
        this.setScores();
        this.setMinScore();
        this.setNumberMoves();
    }

    /**
     * decrementNumberMoves - установить время игрового процесса
     * @param score - игровые очки
     * @return void
     */
    public resetGame(): void {
        this.score.text = 0;
        this.time.text = Config.gameTimeCount;
        this.numberMoves.text = Config.gameNumberMoves;
        this.startTime();
    }

    /**
     * decrementNumberMoves - установить время игрового процесса
     * @param score - игровые очки
     * @return void
     */
    public addScore( score: number ): void {
        this.score.text = ( parseInt( this.score.text ) + score ) + '';
        if ( parseInt( this.score.text ) > parseInt( this.minScore.text ) ) {
            Application.ee.emit('onWinGame', {} );
        }
    }

    /**
     * decrementNumberMoves - установить время игрового процесса
     * @return void
     */
    public decrementNumberMoves(): void {
        this.numberMoves.text = ( parseInt( this.numberMoves.text ) - 1) + '';
        if ( parseInt( this.numberMoves.text ) === 0 ) {
            Application.ee.emit('onEndTime', {} );
        }
    }

    /**
     * setTime - запустить время игрового процесса
     * @return void
     */
    public startTime(): void {
        this.tId = setInterval( () => {
            if ( parseInt( this.time.text ) === 1 ) {
                Application.ee.emit('onEndTime', {} );
                clearInterval( this.tId );
            }
            this.time.text = ( parseInt( this.time.text ) - 1) + '';
        },1000 );
    }

    /**
     * stopTime - остановить время игрового процесса
     * @return void
     */
    public stopTime(): void {
        clearInterval( this.tId );
    }

    /**
     * setScores - установить игровые очки
     * @return void
     */
    private setScores(): void {

        this.score = new PIXI.Text( '0', this.style );
        this.score.x = Config.gameScoreX;
        this.score.y = Config.gameScoreY;
        this.score.anchor.set(0.5, 0.5 );

        super.addChild( this.score );
    }

    /**
     * setMinScore - установить количество игровых очков
     * необходимых для победы
     * @return void
     */
    private setMinScore(): void {

        this.minScore = new PIXI.Text( Config.gameMinScore, this.style );
        this.minScore.x = Config.gameMinScoreX;
        this.minScore.y = Config.gameMinScoreY;
        this.minScore.anchor.set(0.5, 0.5 );

        super.addChild( this.minScore );
    }

    /**
     * setNumberMoves - установить количество шагов
     * @return void
     */
    private setNumberMoves(): void {

        this.numberMoves = new PIXI.Text( Config.gameNumberMoves, this.style );
        this.numberMoves.x = Config.gameNumberMovesX;
        this.numberMoves.y = Config.gameNumberMovesY;
        this.numberMoves.anchor.set(0.5, 0.5 );
        super.addChild( this.numberMoves );
    }

    /**
     * setTime - установить время игрового процесса
     * @return void
     */
    private setTime(): void {

        this.time   = new PIXI.Text( Config.gameTimeCount, this.style );
        this.time.x = Config.gameTimeX;
        this.time.y = Config.gameTimeY;
        this.time.scale.x = 1.8;
        this.time.scale.y = 1.8;
        this.time.anchor.set(0.5, 0.5 );
        super.addChild( this.time );
    }
}
