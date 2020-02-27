import PIXI = require("pixi.js");
/**
 * FactoryMethod
 * @version 1.0.1
 * @package utils
 */
export abstract class FactoryMethod {

    /**
     *  @access protected
     *  @var ADDITIONAL: number
     */
    protected ADDITIONAL: number = 0;

    /**
     *  @access protected
     *  @var INITIAL: number
     */
    protected INITIAL: number = 1;

    /**
     * createComponent
     * @param tiles - набор тайлов, которые необходимо создать
     */
    protected abstract createComponent( tile?: {} );

    /**
     * create
     * @param tiles - набор тайлов, которые необходимо создать
     * @return PIXI.Container[]
     */
    public create( tile?: {} ): PIXI.Container[] {
        return this.createComponent( tile );
    }
}