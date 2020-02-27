import PIXI = require("pixi.js");
/**
 * FactoryMethod
 * @version 1.0.1
 * @package utils
 */
export abstract class FactoryMethod {

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
