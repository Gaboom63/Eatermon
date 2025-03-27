
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
                    npcNormal = true;
                } else {
                    console.error("No valid destination found in the door's destinations.");
                }
            } else {
                console.error("No matching door found at coordinates:", newX, newY);
            }
        }, 3000);

        setTimeout(() => {
            console.log("Reloading map images for new map.");
            let door = currentMap.doors.find(d => d.x === newX && d.y === newY);
            if (door) {
                let destination = door.destinations.find(dest => dest.mapId !== currentMap.id);
                if (destination) {
                    playerX = destination.x;
                    playerY = destination.y;
                    movePlayer(0, 0);
                    startMoving(MOVE_SPEED, 0, 'right');
                    setTimeout(() => {
                        stopMoving();
                    }, 1200);
                }
            } else {
                console.error("No matching door found for the current map:", currentMap.id);
            }
        }, 2000);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }
}


// Update Player Position Style
function updatePlayerPosition() {
    mainPlayer.style.left = `${playerX}px`;
    mainPlayer.style.top = `${playerY}px`;
    mainPlayer.style.backgroundPosition = `-${currentFrameX * spriteWidth}px -${currentFrameY * spriteHeight}px`;
    mainPlayer.style.transform = `scale(${scaleFactor})`;
}
