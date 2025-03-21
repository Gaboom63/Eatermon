// Constants and Initial Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const TILE_SIZE = 16;  // Tile size
const ZOOM_FACTOR = 3;  // Zoom factor
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

const mainPlayer = document.getElementById("player");
const img = new Image();
const mainplayerImg = new Image();
img.src = 'images/maps/officalTESTmap.png';
mainplayerImg.src = 'images/player.png';

// Walls and NPC data
const walls = [
    { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 7, y: 5 }, { x: 8, y: 5 },
    { x: 5, y: 6 }, { x: 5, y: 7 }, { x: 5, y: 8 },
    { x: 26, y: 20 }, { x: 27, y: 20 }, { x: 27, y: 21 }, { x: 26, y: 21 },
];

let npc = [
    { name: "Tod", message: "Hello!", x: 10, y: 10, canTalkAgain: false },
    { name: "Blodoof", message: "Bloted? Me too...", x: 15, y: 15, canTalkAgain: false }
];

let selectedTiles = []; // For selected tiles
let tileSelectionEnabled = false;

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
    }
    drawNPC();
}

function drawWalls() {
    ctx.fillStyle = 'blue';
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
        ctx.fillStyle = 'purple';
        const npcX = npc.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const npcY = npc.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(npcX, npcY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

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

        cameraX = Math.max(0, Math.min(cameraX + dx * TILE_SIZE * ZOOM_FACTOR, img.width * ZOOM_FACTOR - canvas.width));
        cameraY = Math.max(0, Math.min(cameraY + dy * TILE_SIZE * ZOOM_FACTOR, img.height * ZOOM_FACTOR - canvas.height));

        if (playerY * TILE_SIZE * ZOOM_FACTOR - cameraY < 0 || playerY * TILE_SIZE * ZOOM_FACTOR - cameraY > canvas.height) {
            cameraY = playerY * TILE_SIZE * ZOOM_FACTOR - canvas.height / 2;
        }

        checkNPCInteraction();
        drawMap();
        drawPlayer();
        drawCoordinates();
    }
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
        if (playerX === npc.x && playerY === npc.y && npc.canTalkAgain) {
            talkingToNPC = true;
            currentNPC = npc;
            NPCtext();
        } else if (playerX !== npc.x || playerY !== npc.y) {
            talkingToNPC = false;
            document.getElementById('npcTextContainer').style.display = 'none';
        }
    });
}

// NPC Interaction
function NPCtext() {
    let npcText = document.getElementById('npcP');
    let npcTextContainer = document.getElementById('npcTextContainer');
    let npcName = document.getElementById('npcName');

    if (currentNPC) {
        console.log('Showing NPC dialogue:', currentNPC.message);
        npcName.innerHTML = `${currentNPC.name} Says: `;
        npcText.innerHTML = `${currentNPC.message}`;
    }

    npcTextContainer.style.display = talkingToNPC ? 'block' : 'none';
}

// Event Listeners
document.addEventListener('keydown', (e) => {
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
            break;
    }
    updatePlayerPosition();
});

// NPC Interaction
function interactWithNPC() {
    const npcAtPlayerPosition = npc.find(n => Math.abs(n.x - playerX) <= 1 && Math.abs(n.y - playerY) <= 1);
    if (npcAtPlayerPosition) {
        console.log('Interacting with NPC:', npcAtPlayerPosition.name);
        talkingToNPC = true;
        currentNPC = npcAtPlayerPosition;
        NPCtext();
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
