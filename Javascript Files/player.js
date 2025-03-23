// Movement and Interaction
function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    // Check if the new position is within bounds and not a wall, NPC, or door
    if (newX >= 0 && newX < tileMap[0].length && newY >= 0 && newY < tileMap.length &&
        !isWall(newX, newY) && !isNPC(newX, newY) && !isDoor(newX, newY)) {

        // Update player position
        playerX = newX;
        playerY = newY;

        // Update camera position
        cameraX = Math.max(0, Math.min(cameraX + dx * TILE_SIZE * ZOOM_FACTOR, upperImg.width * ZOOM_FACTOR - canvas.width));
        cameraY = Math.max(0, Math.min(cameraY + dy * TILE_SIZE * ZOOM_FACTOR, upperImg.height * ZOOM_FACTOR - canvas.height));

        // Adjust camera Y to keep the player centered within the view
        if (playerY * TILE_SIZE * ZOOM_FACTOR - cameraY < 0 || playerY * TILE_SIZE * ZOOM_FACTOR - cameraY > canvas.height) {
            cameraY = playerY * TILE_SIZE * ZOOM_FACTOR - canvas.height / 2;
        }
    }

    // Only call drawing functions after successful movement
    drawMap();
    drawPlayer();
    drawCoordinates();

    // Check if the player stepped on a door and handle map change
    if (isDoor(newX, newY)) {
        npcNormal = false; 
        fadeIn(); 
        setTimeout(() => {
            let changeMap = currentMap.id;
            // Assuming mapDoor contains the destination map
            currentMap = maps[mapDoor[changeMap].doorDestination];    
            fadeOut(); 
            upperImg.src = currentMap.upperSRC;
            lowerImg.src = currentMap.lowerSRC;    
            ZOOM_FACTOR = currentMap.zoom;
            npcNormal = true; 
        }, 3000)
        // Reload images for the new map
    setTimeout(() => {
        playerX = mapDoor[currentMap.id].x;
        playerY = mapDoor[currentMap.id].y; 
    }, 2000); 
        // Clear the canvas and draw the new map
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        upperImg.onload = lowerImg.onload = () => {
            drawMap();

        };
    }
}

// Update Player Position Style
function updatePlayerPosition() {
    mainPlayer.style.left = `${playerX}px`;
    mainPlayer.style.top = `${playerY}px`;
    mainPlayer.style.backgroundPosition = `-${currentFrameX * spriteWidth}px -${currentFrameY * spriteHeight}px`;
    mainPlayer.style.transform = `scale(${scaleFactor})`;
}
