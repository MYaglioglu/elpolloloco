/**
 * Class representing a coin, extending from Collectables.
 */
class Coin extends Collectables {
    /**
     * Width of the coin.
     * @type {number}
     */
    width = 100;

    /**
     * Height of the coin.
     * @type {number}
     */
    height = 70;

    /**
     * Images for the coin animation.
     */
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    /**
     * Constructs a Coin object.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.y = Math.floor(Math.random() * (100 + 1) + 150); // Random Y-coordinate
        this.x = Math.random() * 2000; // Random X-coordinate
        this.animate();
    }

    /**
     * Handles the animation of the coin.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}
