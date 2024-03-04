/**
 * Class representing a game level.
 */
class Level {
    /**
     * Array of enemies in the level.
     */
    enemies;

    /**
     * Array of clouds in the level.
     */
    clouds;

    /**
     * Array of coins in the level.
     */
    coins;

    /**
     * Array of bottles in the level.
     */
    bottles;

    /**
     * Array of background objects in the level.
     */
    backgroundObjects;

    /**
     * The X-coordinate marking the end of the level.
     * @type {number}
     */
    level_end_x = 2200;

    /**
     * Constructs a Level object.
     * @param {MovableObject[]} enemies - Array of enemies.
     * @param {Cloud[]} clouds - Array of clouds.
     * @param {BackgroundObject[]} backgroundObjects - Array of background objects.
     * @param {Coin[]} coins - Array of coins.
     * @param {Bottle[]} bottles - Array of bottles.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}
