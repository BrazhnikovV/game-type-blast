import PIXI = require("pixi.js");
import {TilesFactory} from "./factories/TilesFactory";
import {Config} from "../config/Config";

/**
 * TilesContainer
 * @version 1.0.1
 * @package components
 */
export class TilesContainer extends PIXI.Container {

    /**
     *  @access private
     *  @var tilesFactory: TilesFactory
     */
    private tilesFactory: TilesFactory = new TilesFactory();

    /**
     * constructor - конструктор
     */
    constructor() {
        super();
        this.tilesFactory.create().map( tile => {
            super.addChild( tile );
            return tile;
        });
    }

    /**
     * clearMatchTiles - очистить группу прилегающих тайлов
     * @param matchTiles
     * @return void
     */
    public clearMatchTiles( matchTiles: PIXI.Container[] ): void {

        matchTiles.map( ( mTl ) => {
            this['children']
                .filter( ( fTl) => fTl.getColl() === mTl.getColl() && fTl.getRow() === mTl.getRow() )
                .map( ( rTl) => {
                    super.removeChild( rTl );
                });
        });
    }

    /**
     * resetVisitedTiles - сбросить флаг посещения
     * @return void
     */
    public resetVisitedTiles(): void {
        this['children'].filter( fTile => fTile.getVisited ).map( (mTile) => {
            mTile.setVisited();
            return mTile;
        });
    }

    /**
     * getChildrens
     * @return PIXI.Container[]
     */
    public getChildrens(): PIXI.Container[] {
        return this['children'];
    }

    /**
     * addTiles - добавить тайлы в количестве уничтоженных
     * @param tiles - уничтоженные тайлы
     * @return void
     */
    // Fixme разобратья с solid относительно функции initTiles в TilesFactory
    // ======================================================================
    public addTiles( ): void {
        let coll, row = 0;
        for ( let i = 0; i < ( Config.cols * Config.rows ); ++i ) {
            if ( i !== 0 && ( i % Config.cols ) === 0 ) row++;
            coll = i % Config.cols;
            let arr = this['children'].filter( fT => fT.getColl() === coll && fT.getRow() === row )
            if ( arr.length === 0 ) {
                let tile = this.tilesFactory.create({ 'coll': coll, 'row': row });
                super.addChild( tile );
                //return tile;
            }
        }
    }
}
