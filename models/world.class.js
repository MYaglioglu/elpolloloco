/**
 * Class representing the game world.
 */
class World {
    /**
     * The main character of the game.
     */
    character = new Character();

    /**
     * The current level in the game.
     */
    level = level1;

    /**
     * The HTML canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The 2D rendering context for the canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard input controller.
     */
    keyboard;

    /**
     * The camera's x-coordinate offset.
     * @type {number}
     */
    camera_x = 0;

    /**
     * Status bar for displaying coins count.
     */
    statusBarCoins = new StatusBarCoins();

    /**
     * Status bar for displaying health.
     */
    statusBarHealth = new StatusBarHealth();

    /**
     * Status bar for displaying bottles count.
     */
    statusBarBottles = new StatusBarBottles();

    /**
     * Status bar for displaying the boss's health.
     */
    statusBarBossHealth = new StatusBarBossHealth();

    /**
     * Reference to the end boss.
     */
    endboss;

    COIN_SOUND = new Audio('audio/coin.mp3');
    BOTTLE_PICKUP_SOUND = new Audio('audio/bottle_pickup.mp3');
    BOTTLE_SMASH_SOUND = new Audio('audio/bottle_smash.mp3');
    CHICKEN_JUMPED_ON_SOUND = new Audio('audio/chicken_jumped_on.mp3');

    /**
     * Array of throwable objects in the game.
     */
    throwableObjects = [];

    /**
     * Constructs a World object.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.halveVolume();
    }

    /**
     * Draws all game objects on the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        // Draw background objects, coins, and bottles
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        // Reset canvas position for drawing fixed objects
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarBossHealth);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        // Reset canvas position after drawing
        this.ctx.translate(-this.camera_x, 0);

        // Continuously call draw method using requestAnimationFrame for smooth animations
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of drawable objects to the map.
     * @param {DrawableObject[]} objects - Array of drawable objects to be added.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    /**
     * Adds a drawable object to the map and handles image flipping if necessary.
     * @param {DrawableObject} mo - The drawable object to be added.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Sets up the world for the character and initializes the end boss.
     */
    setWorld() {
        this.character.world = this;
        this.endboss = new Endboss(); // Erstelle einen Endboss
    }

    /**
     * Main game loop that checks for various interactions and collisions.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithEnemy();
            this.checkCollectedBottles();
            this.checkCollectedCoins();
            this.checkCollusionBottleEnemy();
            this.checkCollusionBottleBoss();
            this.checkCollusionBoss();
        }, 50);
        setInterval(() => {
            this.checkThrowObjects();
        }, 250);
    }

    /**
     * Checks and handles the throwing of objects by the character.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.counterBottle > 0) {
            let characterDirection = this.character.otherDirection ? 'left' : 'right';
            this.checkThrowLeftOrRight(characterDirection);
            this.character.removeBottle();
            this.statusBarBottles.setCounterBottle(this.character.bottle);
            this.BOTTLE_SMASH_SOUND.play();
        }
    }

    /**
     * Handles the logic to throw a bottle either left or right.
     * @param {string} characterDirection - The direction in which the character is facing.
     */
    checkThrowLeftOrRight(characterDirection) {
        let bottleX = this.character.x + (characterDirection === 'left' ? -100 : 100);
        let bottleY = this.character.y + 100;
        let bottle = new ThrowableObject(bottleX, bottleY, this.character);
        bottle.throwLeftorRight();
        this.throwableObjects.push(bottle);
    }

    /**
     * Checks and handles the collision between the character and the boss.
     */
    checkCollusionBoss() {
        if (this.character.isColliding(this.endboss)) {
            this.endboss.playAttackAnimation();
            this.character.hit();
            this.statusBarHealth.setPercentace(this.character.energy);
        }
    }

    /**
     * Checks collisions between the character and all enemies.
     */
    checkCollisionsWithEnemy() {
        this.level.enemies.forEach((enemy) => {
            this.checkCollisionEnemy(enemy);
        })
    }

    /**
     * Checks collisions between the character and all enemies.
     */
    checkCollisionEnemy(enemy) {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0 && enemy.chickenAlive === true) {
            this.character.jump();
            enemy.chickenAlive = false;
            this.CHICKEN_JUMPED_ON_SOUND.play();
        } else if (this.character.isColliding(enemy) && enemy.chickenAlive === true) {
            this.character.hit();
            this.statusBarHealth.setPercentace(this.character.energy);
            this.character.endGame();
        }
    }

    /**
     * Checks collision between throwable objects and enemies.
     */
    checkCollusionBottleEnemy() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.chickenAlive = false;
                    if (enemy instanceof Endboss) {
                        enemy.hit();
                    }
                }
            });
        });
    }

    /**
     * Checks collision between throwable objects and the end boss.
     */
    checkCollusionBottleBoss() {
        this.throwableObjects.forEach((bottle, bottleIndex) => {
            if (this.endboss.isColliding(bottle)) {
                this.endboss.hit();
                this.statusBarBossHealth.setBossHP(this.endboss.getHP());
                this.throwableObjects.splice(bottleIndex, 1);
                if (this.endboss.getHP() <= 0) {
                    setTimeout(() => {
                        this.endGame();
                    }, 1500);
                }
            }
        });
    }

    /**
     * Ends the game and displays the victory screen.
     */
    endGame() {
        let endScreenWin = document.getElementById("endScreenWin");
        endScreenWin.classList.remove("d-none");
        this.clearAllIntervals();
    }

    /**
     * Clears all intervals in the game.
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            clearInterval(i);
        }
    }

    /**
     * Checks for collisions with collectable bottles.
     */
    checkCollectedBottles() {
        this.level.bottles.forEach((bottle, i) => {
            if (this.character.isColliding(bottle)) {
                this.character.addBottle(bottle);
                this.BOTTLE_PICKUP_SOUND.play();
                this.statusBarBottles.setCounterBottle(this.character.bottle);
                this.removeBottleFromMap(i);
            }
        })
    }

    /**
     * Removes a bottle from the game world.
     * @param {number} i - The index of the bottle to remove.
     */
    removeBottleFromMap(i) {
        this.level.bottles.splice(i, 1);
    }

    /**
     * Checks for collisions with collectable coins.
     */
    checkCollectedCoins() {
        this.level.coins.forEach((coin, i) => {
            if (this.character.isColliding(coin)) {
                this.character.addCoin(coin);
                this.COIN_SOUND.play();
                this.statusBarCoins.setCounterCoin(this.character.coin);
                this.removeCoinFromMap(i);
            }
        })
    }

    /**
     * Removes a coin from the game world.
     * @param {number} i - The index of the coin to remove.
     */
    removeCoinFromMap(i) {
        this.level.coins.splice(i, 1);
    }

    /**
     * Flips the image of a movable object.
     * @param {MovableObject} mo - The movable object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the image of a flipped movable object to its original state.
     * @param {MovableObject} mo - The movable object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Mutes all game sounds.
     */
    muteSounds() {
        this.COIN_SOUND.muted = true;
        this.BOTTLE_PICKUP_SOUND.muted = true;
        this.BOTTLE_SMASH_SOUND.muted = true;
        this.CHICKEN_JUMPED_ON_SOUND.muted = true;
        this.character.walking_sound.muted = true;
    }

    /**
     * Unmutes all game sounds.
     */
    unmuteSounds() {
        this.COIN_SOUND.muted = false;
        this.BOTTLE_PICKUP_SOUND.muted = false;
        this.BOTTLE_SMASH_SOUND.muted = false;
        this.CHICKEN_JUMPED_ON_SOUND.muted = false;
        this.character.walking_sound.muted = false;
    }

    /**
     * Halfes the sound volume.
     */
    halveVolume() {
        this.COIN_SOUND.volume = 0.1;
        this.BOTTLE_PICKUP_SOUND.volume = 0.1;
        this.BOTTLE_SMASH_SOUND.volume = 0.1;
        this.CHICKEN_JUMPED_ON_SOUND.volume = 0.1;
        if (this.character.walking_sound) {
            this.character.walking_sound.volume = 0.1;
        }
    }
}