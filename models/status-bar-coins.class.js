/**
 * Class representing the status bar for coins, extending from DrawableObject.
 */
class StatusBarCoins extends DrawableObject {
    /**
     * X-coordinate of the status bar.
     * @type {number}
     */
    x = 20;

    /**
     * Y-coordinate of the status bar.
     * @type {number}
     */
    y = 40;

    /**
     * Width of the status bar.
     * @type {number}
     */
    width = 200;

    /**
     * Height of the status bar.
     * @type {number}
     */
    height = 60;

    /**
     * Images for different coin counter states.
     */
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    /**
     * Constructs a StatusBarCoins object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.setCounterCoin(0)
    }

    /**
     * Sets the coin counter and updates the status bar image accordingly.
     * @param {number} counterCoin - The current coin counter.
     */
    setCounterCoin(counterCoin) {
        this.counterCoin = counterCoin;
        let path = this.IMAGES_COINS[this.countCoins()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines the index of the image to display based on the current coin counter.
     * @returns {number} The index of the image in the IMAGES_COINS array.
     */
    countCoins() {
        if (this.counterCoin == 5) {
            return 5;
        } else if (this.counterCoin == 4) {
            return 4;
        } else if (this.counterCoin == 3) {
            return 3;
        } else if (this.counterCoin == 2) {
            return 2;
        } else if (this.counterCoin == 1) {
            return 1;
        } else if (this.counterCoin == 0) {
            return 0;
        }  else {
            return 5;
        }
    }
}