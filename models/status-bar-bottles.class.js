/**
 * Class representing the status bar for bottles, extending from DrawableObject.
 */
class StatusBarBottles extends DrawableObject {
    /**
     * X-coordinate of the status bar.
     * @type {number}
     */
    x = 20;

    /**
     * Y-coordinate of the status bar.
     * @type {number}
     */
    y = 80;

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
     * Images for different bottle counter states.
     */
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    /**
     * Constructs a StatusBarBottles object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.setCounterBottle(0) // Set initial bottle counter
    }

    /**
     * Sets the bottle counter and updates the status bar image accordingly.
     * @param {number} counterBottle - The current bottle counter.
     */
    setCounterBottle(counterBottle) {
        this.counterBottle = counterBottle;
        let path = this.IMAGES_BOTTLES[this.countBottle()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Determines the index of the image to display based on the current bottle counter.
     * @returns {number} The index of the image in the IMAGES_BOTTLES array.
     */
    countBottle() {
        if (this.counterBottle == 5) {
            return 5;
        } else if (this.counterBottle == 4) {
            return 4;
        } else if (this.counterBottle == 3) {
            return 3;
        } else if (this.counterBottle == 2) {
            return 2;
        } else if (this.counterBottle == 1) {
            return 1;
        } else if (this.counterBottle == 0) {
            return 0;
        }  else {
            return 5;
        }
    }
}