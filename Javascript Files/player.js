
// Movement and Interaction
function movePlayer(dx, dy, direction) {
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
    updatePlayerSprite(direction); // Update sprite when moving

    // Check if the player stepped on a door and handle map change
    if (isDoor(newX, newY)) {
        npcNormal = false;
        fadeIn();
        console.log("Door detected, starting transition...");

        setTimeout(() => {
            let door = currentMap.doors.find(d => d.x === newX && d.y === newY);

            if (door) {
                let destination = door.destinations.find(dest => dest.mapId !== currentMap.id);

                if (destination) {
                    currentMap = maps[destination.mapId];
                    console.log("Updated currentMap to mapId:", currentMap.id);

                    fadeOut();
                    loadMap(currentMap); // Load the new map here

                    // Wait for map loading to finish before updating player position
                    setTimeout(() => {
                        // Now that the map is loaded, teleport the player to the destination
                        playerX = destination.x;
                        playerY = destination.y;

                        // Ensure player is updated in the UI (since this can sometimes lag behind)
                        updatePlayerPosition();

                        // Apply any camera adjustments needed after teleportation
                        cameraX = Math.max(0, Math.min(playerX * TILE_SIZE * ZOOM_FACTOR, upperImg.width * ZOOM_FACTOR - canvas.width));
                        cameraY = Math.max(0, Math.min(playerY * TILE_SIZE * ZOOM_FACTOR, upperImg.height * ZOOM_FACTOR - canvas.height));

                        // Reposition the camera if the player is not within the view
                        if (playerY * TILE_SIZE * ZOOM_FACTOR - cameraY < 0 || playerY * TILE_SIZE * ZOOM_FACTOR - cameraY > canvas.height) {
                            cameraY = playerY * TILE_SIZE * ZOOM_FACTOR - canvas.height / 2;
                        }

                        // Redraw everything after the teleportation
                        drawMap();
                        drawPlayer();
                        drawNPC(); 
                        drawCoordinates();
                        updatePlayerSprite(direction); // Update sprite after teleportation

                        npcNormal = true;
                    }, 50);  // Adjust timing if necessary to match map loading duration
                } else {
                    console.error("No valid destination found in the door's destinations.");
                }
            } else {
                console.error("No matching door found at coordinates:", newX, newY);
            }
        }, 3000);  // Timing before initiating the transition to ensure smooth fade
    }
}



// Update Player Position Style
function updatePlayerPosition() {
    mainPlayer.style.left = `${playerX}px`;
    mainPlayer.style.top = `${playerY}px`;
    mainPlayer.style.backgroundPosition = `-${currentFrameX * spriteWidth}px -${currentFrameY * spriteHeight}px`;
    mainPlayer.style.transform = `scale(${scaleFactor})`;
}
