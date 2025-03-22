function downloadSelectedTiles() {
    // Format the data as {x: NUMBER, y: NUMBER} instead of JSON
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

// Helper Functions
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


function drawCoordinates() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(`Player X: ${playerX}, Y: ${playerY}`, canvas.width - 10, 10);
}

//Controller 
document.addEventListener('keydown', (event) => {
    if (waitingForEnter && event.key === 'Enter' && currentNPC.canTalkAgain === true && currentNPC.canBattle === true) {
        // Update the enemy index when Enter is pressed
        currentNPCEatermon = currentNPC.party;  // Set the current NPC's party (to use in battle)
        updateEatermonNpc();
        // Call a function to start the battle or show other relevant details
        npcBattle();

        // Hide the NPC text container once the battle starts or interaction ends
        document.getElementById('npcTextContainer').style.display = 'none';

        // Reset the state for waiting for Enter to false
        waitingForEnter = false;
    }
});

// Event Listeners
document.addEventListener('keydown', (e) => {
    if (npcNormal) {
        if (e.key === 'Shift') {
            isShiftPressed = true;  // Shift is being held down
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
                if (currentNPC.canBattle === false) {
                    setTimeout(() => {
                        npcNormal = true;
                    }, 1000);
                }
                break;
            case '[': // Toggle tile selection (true/false)
                tileSelectionEnabled = !tileSelectionEnabled;
                console.log(`Tile selection ${tileSelectionEnabled ? 'enabled' : 'disabled'}`);
                break;
            case ']': // Save the selected tiles to a file
                if (showGrid) {
                    downloadSelectedTiles();
                }
                break;
            case ';': // Save the selected tiles to a file
            showGrid = false; 
                break;
            case 'Escape':
                openEscapeMenu();
                break;
        }
    } else {
        // if (waitingForEnter && e.key === 'Enter' && currentNPC.canTalkAgain === true && currentNPC.canBattle === true) {
        //     updateEatermonNpc();    
        //     npcBattle();  // Start the battle with the current NPC's party
        //     waitingForEnter = true;  // Reset the flag after Enter key is pressed
        // } else if (e.key === 'Enter' && currentNPC.canTalkAgain === false) {
        //     waitingForEnter = true;  // Reset the flag after Enter key is pressed

        // }
        switch (e.key) {

            case 'Enter':
                interactWithNPC();
                if (currentNPC.canBattle === false) {
                    setTimeout(() => {
                        npcNormal = true;
                    }, 1000)
                }
                break;

            case 'Escape':
                openEscapeMenu();
                break;
        }
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;  // Shift is released
        firstTile = null;  // Reset the first tile after Shift is released
    }
    if(e.key === ';') {
        showGrid = true; 
    }
});

canvas.addEventListener('click', (e) => {
    if (!tileSelectionEnabled || !showGrid) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const tileX = Math.floor((mouseX + cameraX) / (TILE_SIZE * ZOOM_FACTOR));
    const tileY = Math.floor((mouseY + cameraY) / (TILE_SIZE * ZOOM_FACTOR));

    // If Shift is pressed, select all tiles in between
    if (isShiftPressed && firstTile) {
        const startX = Math.min(firstTile.x, tileX);
        const endX = Math.max(firstTile.x, tileX);
        const startY = Math.min(firstTile.y, tileY);
        const endY = Math.max(firstTile.y, tileY);

        // Select all tiles in between the two clicked positions
        for (let x = startX; x <= endX; x++) {
            for (let y = startY; y <= endY; y++) {
                if (!selectedTiles.some(tile => tile.x === x && tile.y === y)) {
                    selectedTiles.push({ x, y });
                }
            }
        }

        console.log(`Selected tiles between (${firstTile.x}, ${firstTile.y}) and (${tileX}, ${tileY})`);
    } else {
        // Normal click behavior (no Shift), just add the clicked tile
        if (!selectedTiles.some(tile => tile.x === tileX && tile.y === tileY)) {
            selectedTiles.push({ x: tileX, y: tileY });
        }

        // If Shift is pressed for the first time, store the first tile
        if (isShiftPressed && !firstTile) {
            firstTile = { x: tileX, y: tileY };
        }
    }

    highlightSelectedTiles();
});

// Tile Selection
canvas.addEventListener('click', (e) => {
    if (!tileSelectionEnabled || !showGrid) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const tileX = Math.floor((mouseX + cameraX) / (TILE_SIZE * ZOOM_FACTOR));
    const tileY = Math.floor((mouseY + cameraY) / (TILE_SIZE * ZOOM_FACTOR));

    highlightTile(tileX, tileY);

    if (!selectedTiles.some(tile => tile.x === tileX && tile.y === tileY)) {
        selectedTiles.push({ x: tileX, y: tileY });
    }
});

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