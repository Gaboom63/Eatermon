const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let inBattle = false;

var character = document.querySelector(".character");
var map = document.querySelector(".map");

var x = 0;
var y = 0;

var held_directions = [];
var speed = 1;

const player = {
    x: 200,
    y: 0,
    width: 50,
    height: 50,
    speed: 5,
};

// Function to place character on screen
const placeCharacter = () => {
    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--pixel-size`));

    const held_direction = held_directions[0];
    if (held_direction) {
        const nextPosition = utils.nextPosition(player.x, player.y, held_direction);

        // Check if the new position is a valid move (not blocked by a wall)
        if (wall.canMoveTo(nextPosition.x / 16, nextPosition.y / 16)) {
            if (held_direction === directions.right) { x += speed; }
            if (held_direction === directions.left) { x -= speed; }
            if (held_direction === directions.down) { y += speed; }
            if (held_direction === directions.up) { y -= speed; }
        } else {
            console.log('Blocked by wall');
        }

        character.setAttribute("facing", held_direction);
    }
    character.setAttribute("walking", held_direction ? "true" : "false");

    var camera_left = pixelSize * 110;
    var camera_top = pixelSize * 42;

    // Apply camera transformation for the map and character
    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0 )`;
    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0 )`;

    // Check if the player is stepping on an event tile
}

const step = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        step();
    });
}
step();

const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
};

const keys = {
    38: directions.up,    // Arrow Up
    37: directions.left,   // Arrow Left
    39: directions.right,  // Arrow Right
    40: directions.down,   // Arrow Down
    27: 'escape'           // Escape key
};

document.addEventListener("keydown", (e) => {
    var dir = keys[e.which];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir);
    }
    if (keys[e.keyCode] === 'escape') {
        openMenu();    
}});

document.addEventListener("keyup", (e) => {
    var dir = keys[e.which]; 
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1);
    }
});

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate camera offsets based on player position
    var cameraOffsetX = x * parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--pixel-size`));
    var cameraOffsetY = y * parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--pixel-size`));

    // Debugging: Log camera offsets to see if they're correct
    console.log(`Camera Offset - X: ${cameraOffsetX}, Y: ${cameraOffsetY}`);

    // Draw walls with the camera offset applied
    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--pixel-size`));
    wall.drawWalls(ctx, pixelSize, cameraOffsetX, cameraOffsetY);

    if (!inBattle) {
        encounter();  // Function already defined in your game
    }

    loadingImages();
    updateHp(); // Update UI with the new enemy's HP

    // Call the next frame
    requestAnimationFrame(gameLoop);
}

gameLoop(); 
