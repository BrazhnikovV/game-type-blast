/**
 * RandomHelper
 * @version 1.0.1
 * @package utils
 */
export class RandomHelper {

    /**
     * getRandomInt - получить случайное число
     * в диапазоне от 0 до указанного числа
     * @param max - максимально значение диапазона
     * @return number
     */
    public static getRandomInt( max ): number {
        return Math.floor( Math.random() * Math.floor( max ) );
    }
}
