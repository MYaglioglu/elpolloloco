/**
 * Class representing a chicken, extending from MovableObject.
 */
class Chicken extends MovableObject {
    /**
     * Width of the chicken.
     * @type {number}
     */
    width = 80;

    /**
     * Height of the chicken.
     * @type {number}
     */
    height = 50;

    /**
     * Y-coordinate of the chicken.
     * @type {number}
     */
    y = 375;

    /**
     * Status to check if the chicken is alive.
     * @type {boolean}
     */
    chickenAlive = true;

    /**
     * Array of images for the chicken.
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    /**
     * Constructs a Chicken object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Handles the animation and movement of the chicken.
     */
    animate() {
        setInterval(() => {
            if (this.chickenAlive  ===  true) {
                this.moveLeft();
            } else if (this.chickenAlive  ===  false) {
                this.speed = 0;
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.chickenAlive  ===  true) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.chickenAlive  ===  false) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }
}