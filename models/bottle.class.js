/**
 * Class representing a collectable bottle, extending from Collectables.
 */
class Bottle extends Collectables {
    /**
     * Width of the bottle.
     * @type {number}
     */
    width = 100;

    /**
     * Height of the bottle.
     * @type {number}
     */
    height = 70;

    /**
     * Y-coordinate of the bottle.
     * @type {number}
     */
    y = 360;

    /**
     * Images for the bottle animation.
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    /**
     * Constructs a Bottle object.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = Math.random() * 2000; // Randomly sets the X-coordinate
        this.animate();
    }
    
    /**
     * Handles the animation of the bottle.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 300);
    }
}