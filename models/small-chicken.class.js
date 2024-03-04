
/**
 * Class representing a small chicken, extending from MovableObject.
 */
class SmallChicken extends MovableObject {
    /**
     * Width of the small chicken.
     * @type {number}
     */
    width = 50;

    /**
     * Height of the small chicken.
     * @type {number}
     */
    height = 30;

    /**
     * Y-coordinate of the small chicken.
     * @type {number}
     */
    y = 395;

    /**
     * Status to check if the small chicken is alive.
     * @type {boolean}
     */
    chickenAlive = true;

    /**
     * Images for the walking animation of the small chicken.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];
    
    /**
     * Images for the dead animation of the small chicken.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];
        
    /**
     * Constructs a SmallChicken object.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 200 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }

    /**
     * Handles the animation and movement of the small chicken.
     */  
    animate() {
        setInterval(() => {
            if (this.chickenAlive === true) {
                this.moveLeft();
            } else if (this.chickenAlive === false) {
                this.speed = 0;
            }
        }, 1000 / 60);
        setInterval(() => {
            if (this.chickenAlive === true) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.chickenAlive === false) {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 200);
    }
}