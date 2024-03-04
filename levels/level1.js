/**
 * Global variable to store the current level.
 * @type {Level}
 */
let level1;

/**
 * Initializes the first level of the game.
 * - Sets up enemies, clouds, background objects, coins, and bottles.
 * - Creates a new `Level` instance and assigns it to `level1`.
 */
function initLevel() {
    level1 = new Level(
        // Array of enemies (Chickens and Endboss)
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
        ],
        // Array of clouds
        [
            new Cloud(),
        ],
        // Array of background objects
        [
            new BackgroundObject('img/5_background/layers/air.png', -719, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 80),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 80),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 80),

            new BackgroundObject('img/5_background/layers/air.png', 0, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 80),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 80),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 80),

            new BackgroundObject('img/5_background/layers/air.png', 719, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 80),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 80),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 80),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2, 80),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2, 80),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2, 80),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3, 80),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3, 80),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3, 80),
        ],
        // Array of coins
        [
            new Coin(),
            new Coin(),
            new Coin(),

        ],
        // Array of bottles
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
        ]
    );
}