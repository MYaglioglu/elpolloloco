/**
 * Class representing the Endboss, extending from MovableObject.
 */
class Endboss extends MovableObject {
    /**
     * Height of the endboss.
     * @type {number}
     */
    height = 400;
    /**
     * Width of the endboss.
     * @type {number}
     */
    width = 250;
    /**
     * Y-coordinate of the endboss.
     * @type {number}
     */
    y = 60;

    // Arrays of image paths for different animations
    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];
    /**
     * Indicates if the endboss had first contact with the character.
     * @type {boolean}
     */
    hadFirstContact = false;

    /**
     * Constructs the Endboss object.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        // Load all animation images
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        // Set the starting position of the endboss
        this.x = 2500;
        // Create the health bar for the endboss
        this.bossHealthBar = new StatusBarBossHealth(); //  // Boss initially has 5 HP
        this.hp = 5; // Initialize boss HP
        this.speed = 15; // Speed of the boss
        this.animate();
        this.currentAttackImage = 0;
    }

    /**
     * Handles the animation of the endboss.
     */
    animate() {
        let i = 0;
        setInterval(() => {
            if (world.character.x >= 2100 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            } else if (i < 8 && this.hadFirstContact) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.hp == 0) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isColliding(world.character) && this.hp > 0) {
                this.playAttackAnimation();
            } else if (this.hadFirstContact && this.hp > 0) {
                this.playAnimation(this.IMAGES_WALK);
                this.moveLeft();
            }
            i++;
        }, 200);
    }

    /**
     * Method to decrease the HP of the endboss.
     */
    hit() {
        this.hp--;
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Method to check if the endboss is dead.
     * @returns {boolean} True if the endboss is dead, otherwise false.
     */
    isDead() {
        return this.hp == 0;
    }

    /**
     * Gets the current HP of the endboss.
     * @returns {number} The current HP.
     */
    getHP() {
        return this.hp;
    }

    /**
     * Plays the attack animation of the endboss.
     */
    playAttackAnimation() {
        if (this.currentAttackImage < 8) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.currentAttackImage++;
        } else {
            this.currentAttackImage = 0;
        }
    }
}