/**
 * Class representing the status bar for the boss's health, extending from DrawableObject.
 */
class StatusBarBossHealth extends DrawableObject {
    /**
     * Images for different health states of the boss.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    /**
     * Constructs a StatusBarBossHealth object.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setBossHP(5);// Initial HP of the boss (set to 5 here)
    }

    /**
     * Sets the boss's HP and updates the status bar image accordingly.
     * @param {number} bossHP - The current HP of the boss.
     */
    setBossHP(bossHP) {
        this.percentage = (bossHP / 5) * 100; // Aktualisiere den Prozentsatz basierend auf der aktuellen HP des Endbosses
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
     * Resolves the index of the image to display based on the current HP percentage.
     * @returns {number} The index of the image in the IMAGES_HEALTH array.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}