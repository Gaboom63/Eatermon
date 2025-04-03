// Movement and Interaction
let targetCameraX = 0;
let targetCameraY = 0;
let cameraSmoothing = 0.1; // Adjust for smoother/faster camera movement

function movePlayer(dx, dy, direction) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    // Check if the new position is within bounds and not a wall, NPC, or door
    if (newX >= 0 && newX < tileMap[0].length && 
        newY >= 0 && newY < tileMap.length &&
        !isWall(newX, newY) && 
        !isNPC(newX, newY) && 
        !isDoor(newX, newY)) {
    
        // Update player position
        playerX = newX;
        playerY = newY;

        // Calculate target camera position
        targetCameraX = Math.max(0, Math.min(playerX * TILE_SIZE * ZOOM_FACTOR - canvas.width / 2, upperImg.width * ZOOM_FACTOR - canvas.width));
        targetCameraY = Math.max(0, Math.min(playerY * TILE_SIZE * ZOOM_FACTOR - canvas.height / 2, upperImg.height * ZOOM_FACTOR - canvas.height));
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
                    let newMap = maps.find(map => map.id === destination.mapId); // Find the map by ID
    
                    if (newMap) {
                        currentMap = newMap;
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
                            targetCameraX = Math.max(0, Math.min(playerX * TILE_SIZE * ZOOM_FACTOR - canvas.width / 2, upperImg.width * ZOOM_FACTOR - canvas.width));
                            targetCameraY = Math.max(0, Math.min(playerY * TILE_SIZE * ZOOM_FACTOR - canvas.height / 2, upperImg.height * ZOOM_FACTOR - canvas.height));
    
                            // Redraw everything after the teleportation
                            drawMap();
                            drawPlayer();
                            drawCoordinates();
                            updatePlayerSprite(direction);
                            if (game.currentMessageArray === game.momMessageText) {
                                npcNormal = true;
                                setTimeout(() => {
                                    npcNormal = false;
                                }, 1000);
                                console.log("isMomMessageActive (Downstairs Transition)");
                                setCutScene(1);
                            } else if(goingToElijah) {
                                setCutScene(3);
                            } else {
                                npcNormal = true;
                            }
                        }, 50);  // Adjust timing if necessary to match map loading duration
                    } else {
                        console.error("Map with mapId:", destination.mapId, "not found.");
                    }
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

function updateCamera() {
    // Smooth camera movement using lerp
    cameraX += (targetCameraX - cameraX) * cameraSmoothing;
    cameraY += (targetCameraY - cameraY) * cameraSmoothing;

    const mapWidth = MAP_WIDTH * TILE_SIZE * ZOOM_FACTOR;
    const mapHeight = MAP_HEIGHT * TILE_SIZE * ZOOM_FACTOR;

    // Corrected camera boundary logic
    cameraX = Math.max(0, Math.min(cameraX, mapWidth - canvas.width));
    cameraY = Math.max(0, Math.min(cameraY, mapHeight - canvas.height));
}

