/**
 * Class representing a drawable object.
 */
class DrawableObject {
    /**
     * The current image of the object.
     * @type {Image}
     */
    img;

    /**
     * The index of the current image.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Cache of loaded images.
     * @type {Object.<string, Image>}
     */
    imageCache = [];

    /**
     * X-coordinate of the object.
     * @type {number}
     */
    x = 120;

    /**
     * Y-coordinate of the object.
     * @type {number}
     */
    y = 280;

    /**
     * Height of the object.
     * @type {number}
     */
    height = 150;

    /**
     * Width of the object.
     * @type {number}
     */
    width = 100;

    /**
     * Loads an image into the object.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the given context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a frame around the object if it's a Character, Chicken, or Coin.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
