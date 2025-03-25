
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
        npcNormal = false;  // Set npcNormal to false to indicate the transition process.
        fadeIn();  // Fade in transition.
        console.log("Door detected, starting transition...");
    
        setTimeout(() => {
            // Find the door that the player is interacting with.
            let door = currentMap.doors.find(d => d.x === newX && d.y === newY);
            
            if (door) {
                console.log("Found door:", door);
    
                // Now we will loop through the destinations in this door.
                // Each destination has its own mapId and coordinates.
                let destination = door.destinations.find(dest => dest.mapId !== currentMap.id); // We want to find a destination with a different mapId (not the current one).
    
                if (destination) {
                    console.log("Found destination with mapId:", destination.mapId, "Coordinates:", destination.x, destination.y);
    
                    // Update currentMap based on the destination's mapId.
                    currentMap = maps[destination.mapId];  // Update to the new map based on the destination.
                    console.log("Updated currentMap to mapId:", currentMap.id);
    
                    // Reload map images for the new map.
                    fadeOut();
                    upperImg.src = currentMap.upperSRC;
                    lowerImg.src = currentMap.lowerSRC;
                    ZOOM_FACTOR = currentMap.zoom;
                    npcNormal = true;  // Set npcNormal back to true after transition.
                } else {
                    console.error("No valid destination found in the door's destinations.");
                }
            } else {
                console.error("No matching door found at coordinates:", newX, newY);
            }
        }, 3000);  // 3-second fade-in transition delay.
    
        // Reload images and move player to the correct position.
        setTimeout(() => {
            console.log("Reloading map images for new map.");
            let door = currentMap.doors.find(d => d.x === newX && d.y === newY);
            if (door) {
                let destination = door.destinations.find(dest => dest.mapId !== currentMap.id); // Match the destination with a different mapId
                if (destination) {
                    // Move player to the new map's destination coordinates
                    playerX = destination.x;
                    playerY = destination.y;
                    movePlayer(0, 0);  // Move player to the new map position.
                }
            } else {
                console.error("No matching door found for the current map:", currentMap.id);
            }
        }, 2000);  // Delay to allow the transition to complete before moving the player.
    
        // Clear the canvas and redraw the map
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        upperImg.onload = lowerImg.onload = () => {
            drawMap();  // Redraw the map after transition.
            console.log("Map redrawn after transition.");
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
