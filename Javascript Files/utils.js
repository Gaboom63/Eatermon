let targetCameraX = 0;
let targetCameraY = 0;
const CAMERA_SMOOTHNESS = 0.1; // Controls how smooth the camera movement is (0 = instant, 1 = no movement)
// Function to download selected tiles as a file
function downloadSelectedTiles() {
    let dataStr = '';
    selectedTiles.forEach(tile => {
        dataStr += `{x: ${tile.x}, y: ${tile.y}},\n`;
    });

    const blob = new Blob([dataStr], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'selectedTiles.txt';
    link.click();
}

// Helper function to get tile data from the map
function getTileData(mapWidth, mapHeight) {
    const tileMap = [];
    
    for (let y = 0; y < mapHeight; y++) {
        const row = [];
        for (let x = 0; x < mapWidth; x++) {
            const imageData = ctx.getImageData(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            const color = imageData.data;
            row.push(color[0] === 0 && color[1] === 255 && color[2] === 0 ? 1 : 0);
        }
        tileMap.push(row);
    }
    console.log(mapWidth);
    console.log(mapHeight); 
    return tileMap;
}

// Function to draw player coordinates on the canvas
function drawCoordinates() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(`Player X: ${playerX}, Y: ${playerY}`, canvas.width - 10, 10);
}

// Handle keydown events
document.addEventListener('keydown', (event) => {
    if (waitingForEnter && event.key === 'Enter' && currentNPC.canTalkAgain && currentNPC.canBattle) {
        currentNPCEatermon = currentNPC.party;
        updateEatermonNpc();
        hideNpcText(); // Hide the text before battle
        npcBattle();
        waitingForEnter = false;
        // npcNormal = true;
    } else if (waitingForEnter && event.key === 'Enter' && !currentNPC.canBattle) { // Hide after last message after battle.
        hideNpcText();
        waitingForEnter = false;
        npcNormal = true;
    }

    if (npcNormal && !inBattle) { // Only handle player movement if not in battle
        handlePlayerMovement(event);
    } else if (!inBattle) { // Only handle npc interaction when not in battle
        handleNPCInteraction(event);
    }
});

// Handle keyup events to stop movement
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;
        firstTile = null;
    }
    if (e.key === ';') {
        showGrid = true;
    }

    // Stop movement when arrow keys are released
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        stopMoving();
    }
});



let isMoving = false;
let movementInterval;
let frameCounter = 0;
const TOTAL_FRAMES = 4; // 4 images per row in the sprite sheet
const MOVE_SPEED = 1; // Pixels per movement
const MOVE_INTERVAL = 90; // Milliseconds between movements (for consistent movement speed)

function startMoving(dx, dy, direction) {
    if (isMoving) return; // If already moving, do not start another interval
    isMoving = true;
    movementInterval = setInterval(() => {
        movePlayer(dx, dy);
        updatePlayerSprite(direction); // Update sprite when moving
    }, MOVE_INTERVAL);
}

function stopMoving() {
    isMoving = false;
    clearInterval(movementInterval);
}

function updatePlayerSprite(direction) {
    frameCounter = (frameCounter + 1) % TOTAL_FRAMES; // Cycle through frames 0-3

    // Update the currentFrameX depending on the direction and frameCounter
    switch (direction) {
        case 'up':
            currentFrameX = frameCounter;
            currentFrameY = 2; // Assuming row 2 is up
            break;
        case 'down':
            currentFrameX = frameCounter;
            currentFrameY = 0; // Assuming row 0 is down
            break;
        case 'left':
            currentFrameX = frameCounter;
            currentFrameY = 3; // Assuming row 3 is left
            break;
        case 'right':
            currentFrameX = frameCounter;
            currentFrameY = 1; // Assuming row 1 is right
            break;
    }
}


// Handle player movement
function handlePlayerMovement(e) {
    if (e.key === 'Shift') {
        isShiftPressed = true;
    }

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            startMoving(0, -MOVE_SPEED, 'up');
            break;
        case 'ArrowDown':
        case 's':
            startMoving(0, MOVE_SPEED, 'down');
            break;
        case 'ArrowLeft':
        case 'a':
            startMoving(-MOVE_SPEED, 0, 'left');
            break;
        case 'ArrowRight':
        case 'd':
            startMoving(MOVE_SPEED, 0, 'right');
            break;
        case 'Enter':
            interactWithNPC();
            if (!currentNPC.canBattle) {
                setTimeout(() => { npcNormal = true; hideNpcText() }, 1000);
            }
            break;
        case '[':
            toggleTileSelection();
            break;
        case ']':
            if (showGrid) downloadSelectedTiles();
            break;
        case ';':
            showGrid = false;
            break;
        case 'Escape':
            openEscapeMenu();
            break;
    }
}



// Handle NPC interaction
function handleNPCInteraction(e) {
    if (inBattle) return; // Prevent interaction during battle
    switch (e.key) {
        case 'Enter':
            interactWithNPC();
            if (!currentNPC.canBattle) {
                setTimeout(() => { npcNormal = true; hideNpcText(); }, 1000);

            }
            break;

        case 'Escape':
            openEscapeMenu();
            break;
    }
}





// Toggle tile selection on/off
function toggleTileSelection() {
    tileSelectionEnabled = !tileSelectionEnabled;
    console.log(`Tile selection ${tileSelectionEnabled ? 'enabled' : 'disabled'}`);
}

// Handle keyup events
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;
        firstTile = null;
    }
    if (e.key === ';') {
        showGrid = true;
    }
});

// Handle canvas click events for tile selection
canvas.addEventListener('click', (e) => {
    if (!tileSelectionEnabled || !showGrid) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const tileX = Math.floor((mouseX + cameraX) / (TILE_SIZE * ZOOM_FACTOR));
    const tileY = Math.floor((mouseY + cameraY) / (TILE_SIZE * ZOOM_FACTOR));

    // Handle tile selection and highlight tiles
    handleTileSelection(tileX, tileY);
});

// Handle tile selection logic
function handleTileSelection(tileX, tileY) {
    if (isShiftPressed && firstTile) {
        const startX = Math.min(firstTile.x, tileX);
        const endX = Math.max(firstTile.x, tileX);
        const startY = Math.min(firstTile.y, tileY);
        const endY = Math.max(firstTile.y, tileY);

        // Add all tiles in the selected range to the selectedTiles array
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (!selectedTiles.some(tile => tile.x === x && tile.y === y)) {
                    selectedTiles.push({ x, y });
                }
            }
        }
    } else {
        // Add single tile to selectedTiles array
        if (!selectedTiles.some(tile => tile.x === tileX && tile.y === tileY)) {
            selectedTiles.push({ x: tileX, y: tileY });
        }

        // Store the first tile if Shift is pressed
        if (isShiftPressed && !firstTile) {
            firstTile = { x: tileX, y: tileY };
        }
    }

    // Call highlight function to show selected tiles
    highlightSelectedTiles();
}


// Highlight the selected tile and all selected tiles
// Highlight the selected tiles
function highlightSelectedTiles() {
    // Redraw selected tiles on top of the map elements
    selectedTiles.forEach(tile => {
        // Highlight each selected tile in yellow
        ctx.strokeStyle = 'yellow'; // Tile border color
        ctx.lineWidth = 2;
        ctx.strokeRect(
            tile.x * TILE_SIZE * ZOOM_FACTOR - cameraX,
            tile.y * TILE_SIZE * ZOOM_FACTOR - cameraY,
            TILE_SIZE * ZOOM_FACTOR,
            TILE_SIZE * ZOOM_FACTOR
        );
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)'; // Tile fill color
        ctx.fillRect(
            tile.x * TILE_SIZE * ZOOM_FACTOR - cameraX,
            tile.y * TILE_SIZE * ZOOM_FACTOR - cameraY,
            TILE_SIZE * ZOOM_FACTOR,
            TILE_SIZE * ZOOM_FACTOR
        );
    });
}


function cutSceneUp() {
    movePlayer(0, -1, 'up');
}
function cutSceneDown() {
    movePlayer(0, 1, 'down');
}
function cutSceneLeft() {
    movePlayer(-1, 0, 'left');
}
function cutSceneRight() {
    movePlayer(1, 0, 'right');
}

function delayedMovePlayer(x, y, direction, delay) {
    setTimeout(() => {
        movePlayer(x, y, direction);
    }, delay);
}

let cutScene = [
    [
        { action: 'move', direction: 'right', x: 1, y: 0, multiplier: 9 }, 
    ]
];

// Function to play the entire cutscene, including multiple sequences, with delays and multipliers
function playCutScene() {
    // Set npcNormal to false to indicate the cutscene is active
    npcNormal = false;
    // console.log("Cutscene started, npcNormal is now", npcNormal);

    let delay = 0;  // Initial delay

    for (let sequence of cutScene) {
        for (let step of sequence) {
            if (step.action === 'move') {
                // Apply the multiplier to repeat the action multiple times
                for (let i = 0; i < step.multiplier; i++) {
                    delayedMovePlayer(step.x, step.y, step.direction, delay);
                    delay += 500; // Delay between each move (500ms for each move)
                }
            }
        }
    }

    setTimeout(() => {
        npcNormal = true;
        console.log("Cutscene finished, npcNormal is now", npcNormal);
    }, delay);
}

function eventSpaceLogic() {
    let map = currentMap.id; 
    
    // Iterate over all event spaces in the current map
    for (let i = 0; i < maps[map].eventSpace.length; i++) {
        let event = maps[map].eventSpace[i];
        
        // Check if player is at the current event space coordinates
        if (playerX === event.x && playerY === event.y) {
            // Trigger the cutscene
            playCutScene();
            
            return; // Exit after the first match is found to avoid unnecessary checks
        }
    }
}
