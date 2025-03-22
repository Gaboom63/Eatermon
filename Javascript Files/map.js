// Constants and Initial Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const TILE_SIZE = 16;  // Tile size
const ZOOM_FACTOR = 4;  // Zoom factor
const spriteWidth = 32;
const spriteHeight = 32;
const spriteSheetCols = 4;
const spriteSheetRows = 4;
let currentFrameX = 0;
let currentFrameY = 0;
let scaleFactor = 1;
let tileMap = [];
let cameraX = 0;
let cameraY = 0;
let showGrid = true; // Toggle grid visibility
let talkingToNPC = false;
let playerX = 7;
let playerY = 2;
let currentNPC = 0;
let currentNPCEatermon;
let waitingForEnter = false;
let npcNormal = true;
let npcText = document.getElementById('npcP');

const mainPlayer = document.getElementById("player");
const img = new Image();
const mainplayerImg = new Image();
img.src = 'images/maps/startingMap.png';
mainplayerImg.src = 'images/player.png';

// Walls and NPC data
const walls = [
    { x: 21, y: 26 },
    { x: 21, y: 27 },
    { x: 21, y: 16 },
    { x: 21, y: 17 },
    { x: 21, y: 18 },
    { x: 21, y: 19 },
    { x: 21, y: 20 },
    { x: 21, y: 21 },
    { x: 21, y: 22 },
    { x: 21, y: 23 },
    { x: 21, y: 24 },
    { x: 21, y: 25 },
    { x: 22, y: 16 },
    { x: 22, y: 17 },
    { x: 22, y: 18 },
    { x: 22, y: 19 },
    { x: 22, y: 20 },
    { x: 22, y: 21 },
    { x: 22, y: 22 },
    { x: 22, y: 23 },
    { x: 22, y: 24 },
    { x: 22, y: 25 },
    { x: 22, y: 26 },
    { x: 23, y: 16 },
    { x: 23, y: 17 },
    { x: 23, y: 18 },
    { x: 23, y: 19 },
    { x: 23, y: 20 },
    { x: 23, y: 21 },
    { x: 23, y: 22 },
    { x: 23, y: 23 },
    { x: 23, y: 24 },
    { x: 23, y: 25 },
    { x: 23, y: 26 },
    { x: 24, y: 16 },
    { x: 24, y: 17 },
    { x: 24, y: 18 },
    { x: 24, y: 19 },
    { x: 24, y: 20 },
    { x: 24, y: 21 },
    { x: 24, y: 22 },
    { x: 24, y: 23 },
    { x: 24, y: 24 },
    { x: 24, y: 25 },
    { x: 24, y: 26 },
    { x: 25, y: 16 },
    { x: 25, y: 17 },
    { x: 25, y: 18 },
    { x: 25, y: 19 },
    { x: 25, y: 20 },
    { x: 25, y: 21 },
    { x: 25, y: 22 },
    { x: 25, y: 23 },
    { x: 25, y: 24 },
    { x: 25, y: 25 },
    { x: 25, y: 26 },
    { x: 26, y: 16 },
    { x: 26, y: 17 },
    { x: 26, y: 18 },
    { x: 26, y: 19 },
    { x: 26, y: 20 },
    { x: 26, y: 21 },
    { x: 26, y: 22 },
    { x: 26, y: 23 },
    { x: 26, y: 24 },
    { x: 26, y: 25 },
    { x: 26, y: 26 },
    { x: 27, y: 16 },
    { x: 27, y: 17 },
    { x: 27, y: 18 },
    { x: 27, y: 19 },
    { x: 27, y: 20 },
    { x: 27, y: 21 },
    { x: 27, y: 22 },
    { x: 27, y: 23 },
    { x: 27, y: 24 },
    { x: 27, y: 25 },
    { x: 27, y: 26 },
    { x: 28, y: 16 },
    { x: 28, y: 17 },
    { x: 28, y: 18 },
    { x: 28, y: 19 },
    { x: 28, y: 20 },
    { x: 28, y: 21 },
    { x: 28, y: 22 },
    { x: 28, y: 23 },
    { x: 28, y: 24 },
    { x: 28, y: 25 },
    { x: 28, y: 26 },
    { x: 29, y: 16 },
    { x: 29, y: 17 },
    { x: 29, y: 18 },
    { x: 29, y: 19 },
    { x: 29, y: 20 },
    { x: 29, y: 21 },
    { x: 29, y: 22 },
    { x: 29, y: 23 },
    { x: 29, y: 24 },
    { x: 29, y: 25 },
    { x: 29, y: 26 },
    { x: 21, y: 15 },
    { x: 22, y: 15 },
    { x: 23, y: 15 },
    { x: 24, y: 15 },
    { x: 25, y: 15 },
    { x: 26, y: 15 },
    { x: 27, y: 15 },
    { x: 28, y: 15 },
    { x: 29, y: 15 },
    { x: 22, y: 27 },
    { x: 23, y: 27 },
    { x: 24, y: 27 },
    { x: 25, y: 27 },
    { x: 26, y: 27 },
    { x: 27, y: 27 },
    { x: 28, y: 27 },
    { x: 29, y: 27 },

    { x: 9, y: 27 },
    { x: 1, y: 15 },
    { x: 1, y: 16 },
    { x: 1, y: 17 },
    { x: 1, y: 18 },
    { x: 1, y: 19 },
    { x: 1, y: 20 },
    { x: 1, y: 21 },
    { x: 1, y: 22 },
    { x: 1, y: 23 },
    { x: 1, y: 24 },
    { x: 1, y: 25 },
    { x: 1, y: 26 },
    { x: 1, y: 27 },
    { x: 2, y: 15 },
    { x: 2, y: 16 },
    { x: 2, y: 17 },
    { x: 2, y: 18 },
    { x: 2, y: 19 },
    { x: 2, y: 20 },
    { x: 2, y: 21 },
    { x: 2, y: 22 },
    { x: 2, y: 23 },
    { x: 2, y: 24 },
    { x: 2, y: 25 },
    { x: 2, y: 26 },
    { x: 2, y: 27 },
    { x: 3, y: 15 },
    { x: 3, y: 16 },
    { x: 3, y: 17 },
    { x: 3, y: 18 },
    { x: 3, y: 19 },
    { x: 3, y: 20 },
    { x: 3, y: 21 },
    { x: 3, y: 22 },
    { x: 3, y: 23 },
    { x: 3, y: 24 },
    { x: 3, y: 25 },
    { x: 3, y: 26 },
    { x: 3, y: 27 },
    { x: 4, y: 15 },
    { x: 4, y: 16 },
    { x: 4, y: 17 },
    { x: 4, y: 18 },
    { x: 4, y: 19 },
    { x: 4, y: 20 },
    { x: 4, y: 21 },
    { x: 4, y: 22 },
    { x: 4, y: 23 },
    { x: 4, y: 24 },
    { x: 4, y: 25 },
    { x: 4, y: 26 },
    { x: 4, y: 27 },
    { x: 5, y: 15 },
    { x: 5, y: 16 },
    { x: 5, y: 17 },
    { x: 5, y: 18 },
    { x: 5, y: 19 },
    { x: 5, y: 20 },
    { x: 5, y: 21 },
    { x: 5, y: 22 },
    { x: 5, y: 23 },
    { x: 5, y: 24 },
    { x: 5, y: 25 },
    { x: 5, y: 26 },
    { x: 5, y: 27 },
    { x: 6, y: 15 },
    { x: 6, y: 16 },
    { x: 6, y: 17 },
    { x: 6, y: 18 },
    { x: 6, y: 19 },
    { x: 6, y: 20 },
    { x: 6, y: 21 },
    { x: 6, y: 22 },
    { x: 6, y: 23 },
    { x: 6, y: 24 },
    { x: 6, y: 25 },
    { x: 6, y: 26 },
    { x: 6, y: 27 },
    { x: 7, y: 15 },
    { x: 7, y: 16 },
    { x: 7, y: 17 },
    { x: 7, y: 18 },
    { x: 7, y: 19 },
    { x: 7, y: 20 },
    { x: 7, y: 21 },
    { x: 7, y: 22 },
    { x: 7, y: 23 },
    { x: 7, y: 24 },
    { x: 7, y: 25 },
    { x: 7, y: 26 },
    { x: 7, y: 27 },
    { x: 8, y: 15 },
    { x: 8, y: 16 },
    { x: 8, y: 17 },
    { x: 8, y: 18 },
    { x: 8, y: 19 },
    { x: 8, y: 20 },
    { x: 8, y: 21 },
    { x: 8, y: 22 },
    { x: 8, y: 23 },
    { x: 8, y: 24 },
    { x: 8, y: 25 },
    { x: 8, y: 26 },
    { x: 8, y: 27 },
    { x: 9, y: 15 },
    { x: 9, y: 16 },
    { x: 9, y: 17 },
    { x: 9, y: 18 },
    { x: 9, y: 19 },
    { x: 9, y: 20 },
    { x: 9, y: 21 },
    { x: 9, y: 22 },
    { x: 9, y: 23 },
    { x: 9, y: 24 },
    { x: 9, y: 25 },
    { x: 9, y: 26 },
    //End Of Two Houses
];

const treasures = [
    {
        treauseType: "Chest",
        x: 9,
        y: 10,
        opened: false
    }
]

const lakes = [

]

let npc = [
    {
        name: "George",
        message: "Yo! Lets Battle!",
        wonMessage: "Hahahaha You Lose!",
        lostMessage: "WHAT How did you beat my eatermon!! Anyway... Good Job!",
        x: 10,
        y: 10,
        src: 'images/NPCS/George.png',
        party: npcParty[0].party,
        canBattle: true,
        canTalkAgain: true
    },
    {
        name: "Jake",
        message: "BATTLE! ME WANT BATTLE...",
        x: 15,
        y: 15,
        src: 'images/NPCS/Jake.png',
        party: npcParty[1].party,
        canBattle: true,
        canTalkAgain: true
    },
    {
        name: "Debbie",
        message: "I'm You're Mom!",
        x: 10,
        y: 15,
        src: 'images/NPCS/Debbie.png',
        party: npcParty[2].party,
        canBattle: false,
        canTalkAgain: true,
    },
    
    
];

let selectedTiles = []; // For selected tiles
let tileSelectionEnabled = false;
let isShiftPressed = false;  // Track if the Shift key is pressed
let firstTile = null;  // Store the first tile clicked when Shift is pressed

function drawLake() {
    ctx.fillStyle = 'blue';
    lakes.forEach(lake => {
        const lakeX = lake.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const lakeY = lake.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(lakeX, lakeY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}


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
// Image Loading and Initialization
img.onload = () => {
    const mapWidth = Math.floor(img.width / TILE_SIZE);
    const mapHeight = Math.floor(img.height / TILE_SIZE);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    tileMap = getTileData(mapWidth, mapHeight);
    console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);
    drawMap();
    drawPlayer();
    drawCoordinates();
};

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

// Drawing Functions
function drawPlayer() {
    // Ensure image smoothing is disabled
    ctx.imageSmoothingEnabled = false;

    // Scale the player sprite to a larger size while ensuring it fits within one tile (1 block)
    const scaledSize = TILE_SIZE * ZOOM_FACTOR * 3; // Scale factor > 1 to make the player larger, but keep it within one tile

    // Draw the player sprite
    ctx.drawImage(
        mainplayerImg,
        currentFrameX * spriteWidth,
        currentFrameY * spriteHeight,
        spriteWidth, spriteHeight,
        Math.floor(playerX * TILE_SIZE * ZOOM_FACTOR - cameraX + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2),  // Center the player image
        Math.floor(playerY * TILE_SIZE * ZOOM_FACTOR - cameraY + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2),  // Center the player image
        Math.floor(scaledSize), // Ensure the scaled width is an integer
        Math.floor(scaledSize)  // Ensure the scaled height is an integer
    );
}


function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, cameraX / ZOOM_FACTOR, cameraY / ZOOM_FACTOR, canvas.width / ZOOM_FACTOR, canvas.height / ZOOM_FACTOR, 0, 0, canvas.width, canvas.height);
    if (showGrid) {
        drawGrid();
        drawWalls();
        drawGreenSquares();
        drawLake();
    }
}

function drawWalls() {
    ctx.fillStyle = 'red';
    walls.forEach(wall => {
        const wallX = wall.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const wallY = wall.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(wallX, wallY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 1;
    const gridSize = TILE_SIZE * ZOOM_FACTOR;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawNPC() {
    npc.forEach(npc => {
        const npcImage = npcImages[npc.name]; // Use the preloaded image

        if (npcImage) {
            // Scale the NPC image to fit within one tile
            const scaledSize = TILE_SIZE * ZOOM_FACTOR * 2.5; // Scale factor to ensure NPC fits within the tile size

            // Calculate the position on the canvas with camera offset
            const npcX = npc.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
            const npcY = npc.y * TILE_SIZE * ZOOM_FACTOR - cameraY;

            // Draw the NPC image ensuring it's centered within the tile
            ctx.drawImage(npcImage, npcX + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2, npcY + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2, scaledSize, scaledSize);
        }
    });
}

function drawTreasure() {

}

// Preload NPC images
const npcImages = {};

npc.forEach(npc => {
    const img = new Image();
    img.src = npc.src;
    npcImages[npc.name] = img;
});


function drawCoordinates() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText(`Player X: ${playerX}, Y: ${playerY}`, canvas.width - 10, 10);
}

// Movement and Interaction
function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    // Check if the new position is within bounds and not a wall
    if (newX >= 0 && newX < tileMap[0].length && newY >= 0 && newY < tileMap.length && !isWall(newX, newY) && !isNPC(newX, newY)) {
        playerX = newX;
        playerY = newY;

        // Update the camera only if the player has moved
        cameraX = Math.max(0, Math.min(cameraX + dx * TILE_SIZE * ZOOM_FACTOR, img.width * ZOOM_FACTOR - canvas.width));
        cameraY = Math.max(0, Math.min(cameraY + dy * TILE_SIZE * ZOOM_FACTOR, img.height * ZOOM_FACTOR - canvas.height));

        // Adjust camera Y to keep the player centered if necessary
        if (playerY * TILE_SIZE * ZOOM_FACTOR - cameraY < 0 || playerY * TILE_SIZE * ZOOM_FACTOR - cameraY > canvas.height) {
            cameraY = playerY * TILE_SIZE * ZOOM_FACTOR - canvas.height / 2;
        }

        checkNPCInteraction();
    }

    // Drawing functions are only called after successful movement
    drawMap();
    drawPlayer();
    drawCoordinates();
}


// Function to check if the position is occupied by an NPC
function isNPC(x, y) {
    return npc.some(n => n.x === x && n.y === y);
}


function isWall(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}
function checkNPCInteraction() {
    npc.forEach(npc => {
        const proximity = 1;  // Interaction range
        if (Math.abs(playerX - npc.x) <= proximity && Math.abs(playerY - npc.y) <= proximity) {
            if (!waitingForEnter) {
                // When near the NPC and not waiting for Enter
                talkingToNPC = true;
                currentNPC = npc;
                currentNPCEatermon = npc.party;  // Set the current NPC's party (to use in battle)
                NPCtext();  // Show the NPC's message

                // Set to wait for Enter key to proceed
                waitingForEnter = true;
            }
        } else {
            talkingToNPC = false;
            document.getElementById('npcTextContainer').style.display = 'none';
        }
    });
}






// NPC Interaction
function NPCtext() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    let npcName = document.getElementById('npcName');

    if (currentNPC) {
        if (currentNPC.canTalkAgain && waitingForEnter) {
            npcName.innerHTML = `${currentNPC.name} Says: `;
            npcText.innerHTML = `${currentNPC.message}`;
            npcTextContainer.style.display = 'block';  // Make sure text box is visible
        } else if (!currentNPC.canTalkAgain) {
            npcName.innerHTML = `${currentNPC.name} Says: `;
            npcText.innerHTML = `We Already Talked!`;
            setTimeout(() => {
                npcNormal = true; 
            }, 1000);
            npcTextContainer.style.display = 'block'; // Show the already talked message
            waitingForEnter = true;   // Wait for Enter again after this message
        }
    }
}




// Event Listeners
document.addEventListener('keydown', (e) => {
    if (npcNormal) {
        if (e.key === 'Shift') {
            isShiftPressed = true;  // Shift is being held down
        }
        if (waitingForEnter && e.key === 'Enter' && currentNPC.canTalkAgain === true && currentNPC.canBattle === true) {
            npcBattle();  // Start the battle with the current NPC's party
            waitingForEnter = false;  // Reset the flag after Enter key is pressed
        } else if (e.key === 'Enter' && currentNPC.canTalkAgain === false) {
            waitingForEnter = false;  // Reset the flag after Enter key is pressed

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
                if(currentNPC.canBattle === false) {
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
            case 'Escape':
                openEscapeMenu();
                break;
        }
    } else {
        if (e.key === 'Shift') {
            isShiftPressed = true;  // Shift is being held down
        }
        if (waitingForEnter && e.key === 'Enter' && currentNPC.canTalkAgain === true && currentNPC.canBattle === true) {
            npcBattle();  // Start the battle with the current NPC's party
            waitingForEnter = false;  // Reset the flag after Enter key is pressed
        } else if (e.key === 'Enter' && currentNPC.canTalkAgain === false) {
            waitingForEnter = false;  // Reset the flag after Enter key is pressed

        }
        switch (e.key) {

            case 'Enter':
                interactWithNPC();
                if(currentNPC.canBattle === false) {
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


// NPC Interaction
function interactWithNPC() {
    const npcAtPlayerPosition = npc.find(n => Math.abs(n.x - playerX) <= 1 && Math.abs(n.y - playerY) <= 1);
    if (npcAtPlayerPosition) {
        console.log('Interacting with NPC:', npcAtPlayerPosition.name);
        talkingToNPC = true;
        currentNPC = npcAtPlayerPosition;
        NPCtext();
        npcNormal = false;
    } else {
        console.log('No NPC found at player position');
    }
}

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

// Update Player Position Style
function updatePlayerPosition() {
    mainPlayer.style.left = `${playerX}px`;
    mainPlayer.style.top = `${playerY}px`;
    mainPlayer.style.backgroundPosition = `-${currentFrameX * spriteWidth}px -${currentFrameY * spriteHeight}px`;
    mainPlayer.style.transform = `scale(${scaleFactor})`;
}

function drawGreenSquares() {
    ctx.fillStyle = 'green';

    greenSquares.forEach(square => {
        const squareX = square.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const squareY = square.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(squareX, squareY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}
