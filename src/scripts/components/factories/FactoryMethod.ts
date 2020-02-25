/**
 * FactoryMethod
 * @version 1.0.1
 * @package utils
 */
export abstract class FactoryMethod {

    /**
     * createComponent
     */
    protected abstract createComponent();

    /**
     * create
     */
    public create() {
        return this.createComponent();
    }
}
