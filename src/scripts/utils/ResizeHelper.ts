import {Engine} from "../core/Engine";

/**
 * ResizeHelper
 * @version 1.0.1
 * @package utils
 */
export class ResizeHelper {

    /**
     * doResize
     * @param engine
     * @param width
     * @param height
     */
    public static doResize( engine: Engine, width: number, height: number ): void {

        const ratio = Math.min(window.innerWidth / width, window.innerHeight / height );
        engine.stage.scale.x = engine.stage.scale.y = ratio;
        const newWidth = Math.ceil(width * ratio );
        const newHeight = Math.ceil(height * ratio );

        engine.renderer.resize( newWidth, newHeight );
    }
}
