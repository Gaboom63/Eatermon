// player.js

const player = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    speed: 5,
    color: 'darkcyan'
    
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
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}
