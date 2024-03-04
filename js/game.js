/**
 * Global variables for the game.
 */
let canvas;

/**
 * Represents the game world.
 */
let world;

/**
 * Instance of Keyboard to manage keyboard events.
 */
let keyboard = new Keyboard();

/**
 * Initializes the game.
 * - Initializes the game level.
 * - Retrieves and sets up the canvas and world objects.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

/**
 * Starts the game by initializing and hiding/showing relevant DOM elements.
 */
function startGame() {
    init();
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    document.getElementById('endScreenWin').classList.add('d-none');
    canvas.classList.remove('d-none');
}

/**
 * fullscreens the game and updates button visibility.
 */
function fullscreen() { 
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    document.getElementById('fullscreenButton').classList.add('d-none');
    document.getElementById('exitFullscreenButton').classList.remove('d-none');
}

function closeFullscreen() {
    exitFullscreen();
    document.getElementById('fullscreenButton').classList.remove('d-none');
    document.getElementById('exitFullscreenButton').classList.add('d-none');
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

/**
 * Mutes the game sounds and updates button visibility.
 */
function mute() {
    if (world && world.character) {
        world.muteSounds();
    }
    document.getElementById('muteButton').classList.add('d-none');
    document.getElementById('unmuteButton').classList.remove('d-none');
}


/**
 * Unmutes the game sounds and updates button visibility.
 */
function unmute() {
    if (world && world.character) {
        world.unmuteSounds();
    }
    document.getElementById('muteButton').classList.remove('d-none');
    document.getElementById('unmuteButton').classList.add('d-none');
}

/**
 * Toggles the fullscreen mode for the game canvas.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        /* IE11 */
        element.msRequestFullscreen();
    }
}

/**
 * Sets up touch and mouse control events.
 */
document.addEventListener('DOMContentLoaded', () => {
    eventsControleTouch();
    eventsControleMouse();
});

/**
 * Adds touch event listeners to control buttons (right, left, jump, throw).
 */
function eventsControleTouch() {
    document.getElementById('rightButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('rightButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('leftButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('leftButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('jumpButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('jumpButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('throwButton').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('throwButton').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.D = false;
    });
}


/**
 * Adds mouse event listeners to control buttons (right, left, jump, throw).
 */
function eventsControleMouse() {
    document.getElementById('rightButton').addEventListener('mousedown', () => {
        keyboard.RIGHT = true;
    });

    document.getElementById('rightButton').addEventListener('mouseup', () => {
        keyboard.RIGHT = false;
    });

    document.getElementById('leftButton').addEventListener('mousedown', () => {
        keyboard.LEFT = true;
    });

    document.getElementById('leftButton').addEventListener('mouseup', () => {
        keyboard.LEFT = false;
    });
    
    document.getElementById('jumpButton').addEventListener('mousedown', () => {
        keyboard.SPACE = true;
    });

    document.getElementById('jumpButton').addEventListener('mouseup', () => {
        keyboard.SPACE = false;
    });

    document.getElementById('throwButton').addEventListener('mousedown', () => {
        keyboard.D = true;
    });

    document.getElementById('throwButton').addEventListener('mouseup', () => {
        keyboard.D = false;
    });
}

/**
 * Keyboard event listener to set game control keys.
 */
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Keyboard event listener to reset game control keys.
 */
document.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});