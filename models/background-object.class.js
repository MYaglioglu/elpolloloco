/**
 * Class representing a background object, extending from MovableObject.
 */
class BackgroundObject extends MovableObject {
    /**
     * Width of the background object.
     * @type {number}
     */
    width = 720;

    /**
     * Height of the background object.
     * @type {number}
     */
    height = 480;

    /**
     * Creates a BackgroundObject.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - The X-coordinate of the background object.
     * @param {number} y - The Y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Adjusts the Y-coordinate based on the height
    }
}