/**
 * Class representing a throwable object, extending from MovableObject.
 */
class ThrowableObject extends MovableObject {
    /**
     * Images for the rotation animation of the thrown bottle.
     */
    IMAGES_BOTTLE_THROWN = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];
    /**
     * Images for the splash animation when the bottle hits the ground.
     */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    ];

    /**
     * Creates a ThrowableObject.
     * @param {number} x - The X-coordinate of the throwable object.
     * @param {number} y - The Y-coordinate of the throwable object.
     * @param {Character} character - The character throwing the object.
     */
    constructor(x, y, character) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_THROWN);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.character = character; // Store the character object
        this.throwLeftorRight();
        this.animate();
    }

    /**
     * Handles the animation of the throwable object.
     */
    animate() {
        let animationInterval = setInterval(() => {
            if (this.y > 370) {
                clearInterval(animationInterval); 
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                setTimeout(() => {
                    this.y = -1000; 
                }, this.IMAGES_BOTTLE_SPLASH.length * 50); 
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_THROWN);
            }
        }, 50);
    }

    /**
     * Determines the direction of the throw based on the character's orientation.
     */
    throwLeftorRight() {
        if (this.character.otherDirection === true) {    
            this.speedX = -10; 
            this.applyGravity();
            setInterval(() => {
                this.x -= 10;
            }, 35);
        }   
        else if (this.character.otherDirection === false) {
            this.speedX = 10; 
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
            }, 35);
        }
    }
}