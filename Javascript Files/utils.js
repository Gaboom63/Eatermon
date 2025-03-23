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
        npcNormal = true;
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




// Handle player movement
function handlePlayerMovement(e) {
    if (e.key === 'Shift') {
        isShiftPressed = true;
    }

    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            currentFrameY = 2;
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':
            currentFrameY = 0;
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':
            currentFrameY = 3;
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':
            currentFrameY = 1;
            movePlayer(1, 0);
            break;
        case 'Enter':
            interactWithNPC();
            if (!currentNPC.canBattle) {
                setTimeout(() => { npcNormal = true; hideNpcText()}, 1000);
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

    handleTileSelection(tileX, tileY);
});

// Handle tile selection logic
function handleTileSelection(tileX, tileY) {
    if (isShiftPressed && firstTile) {
        const startX = Math.min(firstTile.x, tileX);
        const endX = Math.max(firstTile.x, tileX);
        const startY = Math.min(firstTile.y, tileY);
        const endY = Math.max(firstTile.y, tileY);

        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (!selectedTiles.some(tile => tile.x === x && tile.y === y)) {
                    selectedTiles.push({ x, y });
                }
            }
        }
    } else {
        if (!selectedTiles.some(tile => tile.x === tileX && tile.y === tileY)) {
            selectedTiles.push({ x: tileX, y: tileY });
        }

        if (isShiftPressed && !firstTile) {
            firstTile = { x: tileX, y: tileY };
        }
    }

    highlightSelectedTiles();
}

// Highlight the selected tile and all selected tiles
function highlightTile(x, y) {
    drawMap();
    selectedTiles.forEach(tile => {
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 2;
        ctx.strokeRect(tile.x * TILE_SIZE * ZOOM_FACTOR - cameraX, tile.y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
        ctx.fillRect(tile.x * TILE_SIZE * ZOOM_FACTOR - cameraX, tile.y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.strokeRect(x * TILE_SIZE * ZOOM_FACTOR - cameraX, y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
    ctx.fillRect(x * TILE_SIZE * ZOOM_FACTOR - cameraX, y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);

    drawPlayer();
    drawCoordinates();
}
