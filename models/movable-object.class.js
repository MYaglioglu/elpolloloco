/**
 * Class representing a movable object, extending from DrawableObject.
 */
class MovableObject extends DrawableObject {
    /**
     * Movement speed of the object.
     * @type {number}
     */
    speed = 0.15;

    /**
     * Flag to indicate if the object is moving in the opposite direction.
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Vertical speed of the object.
     * @type {number}
     */
    speedY = 5;

    /**
     * Acceleration affecting the vertical movement.
     * @type {number}
     */
    acceleration = 1;

    /**
     * Energy level of the object.
     * @type {number}
     */
    energy = 100;

    /**
     * Coin count of the object.
     * @type {number}
     */
    coin = 1;

    /**
     * Timestamp of the last hit.
     * @type {number}
     */
    lastHit = 0;

    /**
     * Bottle count of the object.
     * @type {number}
     */
    bottle = 1;

    /**
     * Collision offset for the object.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity effect to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground.
     */
    isAboveGround() {
        if ((this instanceof ThrowableObject)) { //Throwable objects should always fall
            return true;
        } else {
            return this.y < 220;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} True if colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the energy of the object and updates last hit time.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Decreases the bottle count of the object.
     */
    removeBottle() {
        this.bottle -= 1;
    }

    /**
     * Increases the bottle count of the object.
     */
    addBottle() {
        this.bottle += 1;
    }

    /**
     * Increases the coin count of the object.
     */
    addCoin() {
        this.coin += 1;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} True if the object is hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; //difference in ms
        timepassed = timepassed / 1000; // differance in s
        return timepassed < 1;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.walking_sound.play();
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation sequence.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Checks if the object is idle (not moving).
     * @returns {boolean} True if the object is idle.
     */
    isIdle() {
        return this.world.keyboard.RIGHT == false & this.world.keyboard.LEFT == false & this.world.keyboard.SPACE == false & this.world.keyboard.D == false
    }

    /**
     * Ends the game and displays the end screen.
     */
    endGame() {
        if (this.energy <= 0 || this.HP <= 0) {
            let endScreen = document.getElementById("endScreen");
            endScreen.classList.remove("d-none");
            this.clearAllIntervals();
        }
    }
    
    /**
     * Clears all set intervals for the object.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            clearInterval(i);
        }
    }
}