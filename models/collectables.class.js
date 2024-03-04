/**
 * Class representing collectable items, extending from MovableObject.
 */
class Collectables extends MovableObject {
    /**
     * Constructs a Collectables object.
     */
    constructor() {
        super();
    }

    /**
     * Handles the logic when a collectable item is collected.
     * Increments the coin count and updates the last collection time.
     */
    isCollecting() {
        this.coin += 1; // Increment the coin count
        if (this.coin < 0) {
            this.coin = 0; // Ensure the coin count doesn't go below zero
        } else {
            this.lastHit = new Date().getTime(); // Update the last collection time
        }
    }
}