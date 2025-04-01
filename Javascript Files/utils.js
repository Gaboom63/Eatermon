
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


// Toggle tile selection on/off
function toggleTileSelection() {
    tileSelectionEnabled = !tileSelectionEnabled;
    console.log(`Tile selection ${tileSelectionEnabled ? 'enabled' : 'disabled'}`);
}

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

let cutScenes = [
    [
        { action: 'move', direction: 'right', x: 1, y: 0, multiplier: 10 }, 
    ],
    [
        { action: 'move', direction: 'down', x: 0, y: 1, multiplier: 8 }, 
        { action: 'move', direction: 'left', x: -1, y: 0, multiplier: 11 }, 
        { action: 'move', direction: 'up', x: 0, y: 0, multiplier: 1 }, 
    ],
    [
        { action: 'move', direction: 'left', x: -1, y: 0, multiplier: 3 },
        { action: 'move', direction: 'down', x: 0, y: 1, multiplier: 11 }, 
    ],
    [
        { action: 'move', direction: 'down', x: 0, y: 1, multiplier: 2 },
        { action: 'move', direction: 'right', x: 1, y: 0, multiplier: 3},
        { action: 'move', direction: 'up', x: 0, y: -1, multiplier: 1},


    ]
];


let currentCutScene = 0;

// Function to play the entire cutscene, including multiple sequences, with delays and multipliers
function playCutScene(index) {
    if (index < 0 || index >= cutScenes.length) {
        console.log("Invalid cutscene index.");
        return;
    }

    // Set npcNormal to false to indicate cutscene is active
    npcNormal = false;
    console.log("Cutscene started, npcNormal is now", npcNormal);

    let delay = 0;  // Initial delay

    // Get the selected cutscene sequence by index
    let cutscene = cutScenes[index];

    // Loop through each step in the cutscene (no need for a second loop over 'sequence')
    for (let step of cutscene) {
        if (step.action === 'move') {
            // Apply the multiplier to repeat the action multiple times
            for (let i = 0; i < step.multiplier; i++) {
                delayedMovePlayer(step.x, step.y, step.direction, delay);
                delay += 500; // Delay between each move (500ms for each move)
            }
        } else if (step.action === 'face') {
            // Apply the multiplier to repeat the action multiple times
            for (let i = 0; i < step.multiplier; i++) {
                delayedMovePlayer(step.x, step.y, step.direction, delay);
                delay += 500; // Delay between each move (500ms for each move)
            }
        }
    }

    setTimeout(() => {
        if(maps[currentMap.id].id === 2, playerX === 9 && playerY === 12) {
            momMessageDownstairs(); 
            showNpcText();
            setTimeout(() => {
                showNpcText();
            }, 1000); 
        } else {
            npcNormal = true;
            console.log("Cutscene finished, npcNormal is now", npcNormal);    
        }

    }, delay);
}

// Function to change the current cutscene
function setCutScene(index) {
    currentCutScene = index;
    playCutScene(currentCutScene);
}

// Example to use:
// setCutScene(0);  // Plays cutscene 1
// setCutScene(1);  // Plays cutscene 2
// setCutScene(0);  // Play the first cutscene

function eventSpaceLogic() {
    let map = currentMap.id; 
    // Iterate over all event spaces in the current map
    for (let i = 0; i < maps[map].eventSpace.length; i++) {
        let event = maps[map].eventSpace[i];
        
        // Check if player is at the current event space coordinates
        if (playerX === event.x && playerY === event.y && currentMap.id === 1) {
            stopMoving(); 
            setCutScene(0);
            return; 
        } else if (playerX === event.x && playerY === event.y && currentMap.id === 2) {
            npcNormal = false;  
            normal = false;
            momMessageDownstairs();
            return; 
        }
    }
}

