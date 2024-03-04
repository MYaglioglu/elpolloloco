/**
 * Class representing a cloud, extending from MovableObject.
 */
class Cloud extends MovableObject {
    /**
     * Y-coordinate of the cloud.
     * @type {number}
     */
    y = 20;

    /**
     * Width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * Height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * Movement speed of the cloud.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Constructs a Cloud object.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png')

        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Handles the animation of the cloud.
     */
    animate() {
        this.moveLeft();
    }

    /**
     * Moves the cloud to the left based on its speed.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}