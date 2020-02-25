import PIXI = require("pixi.js");
import {RandomHelper} from "../utils/RandomHelper";

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
     *  @access private
     *  @var color: string
     */
    private color: string = '';

    /**
     *  @access private
     *  @var visited: boolean
     */
    private visited: boolean = false;

    /**
     *  @access private
     *  @var coll: number
     */
    private coll: number = 0;

    /**
     *  @access private
     *  @var row: number
     */
    private row: number = 0;

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.setBg();
    }

    /**
     * setBg - установить бэкграунд компонента
     * @return void
     */
    public setBg(): void {
        this.color = this.colors[RandomHelper.getRandomInt(4)];
        this.bg = PIXI.Sprite.fromImage( 'images/tiles/' + this.color + '.png' );
        this.bg.width  = 160;
        this.bg.height = 160;
        super.addChild( this.bg );
    }

    /**
     * setRow
     * @param num
     * @return void
     */
    public setRow( num: number ): void {
        this.row = num;
    }

    /**
     * getRow
     * @return number
     */
    public getRow(): number {
        return this.row;
    }

    /**
     * setColl
     * @param num
     * @return void
     */
    public setColl( num: number ): void {
        this.coll = num;
    }

    /**
     * getColl
     * @return number
     */
    public getColl(): number {
        return this.coll;
    }

    /**
     * setVisited
     * @param status
     * @return void
     */
    public setVisited( status: boolean ): void {
        this.visited = status;
    }

    /**
     * getVisited
     * @return boolean
     */
    public getVisited(): boolean {
        return  this.visited;
    }

    /**
     * getColor
     * @return string
     */
    public getColor(): string {
        return this.color;
    }

    /**
     * getWitdh
     * @return number
     */
    public getWitdh(): number {
        return this.bg.width;
    }

    /**
     * getHeight
     * @return number
     */
    public getHeight(): number {
        return this.bg.height;
    }
}
