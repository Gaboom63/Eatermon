// player.js

const player = {
    x: 200,
    y: 0,
    width: 50,
    height: 50,
    speed: 5,
    // color: 'darkcyan',
    src: 'images/player.png'
};

// Assuming you have an image element with id "Player" in your HTML
const playerImage = new Image();
playerImage.src = player.src;  // Set the player's image source

// You might want to wait for the image to load before drawing
playerImage.onload = function() {
    // Once the image is loaded, you can call the drawing function
    drawPlayer();
};

// Function to update player's position
function updatePlayerPosition() {
    if (keys.up) player.y -= player.speed;
    if (keys.down) player.y += player.speed;
    if (keys.left) player.x -= player.speed;
    if (keys.right) player.x += player.speed;

    // Prevent player from going out of bounds
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

// Function to draw player on canvas
function drawPlayer() {
    // Draw the background or player color if needed
    // ctx.fillStyle = player.color;
    // ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw the player's image
    if (playerImage.complete) {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
    }
}
