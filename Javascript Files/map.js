const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const TILE_SIZE = 16;  // Size of one tile (16x16)
const ZOOM_FACTOR = 3;  // Zoom in factor (e.g., 2 for 2x zoom, 1 for normal size)

const img = new Image();
img.src = 'images/maps/officalTESTmap.png';

let tileMap = [];
let cameraX = 0;
let cameraY = 0;

let showGrid = true; // Toggle grid visibility (true = show grid, false = hide grid)
let currentNPC = 0;
let talkingToNPC = false;
let playerX = 10;
let playerY = 10;


const walls = [
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    { x: 5, y: 8 },
    { x: 26, y: 20 },
    { x: 27, y: 20 },
    { x: 27, y: 21 },
    { x: 26, y: 21 },
];

let tileSelectionEnabled = false; // Toggle tile selection on/off
let selectedTiles = []; // Array to hold selected tile coordinates

img.onload = () => {
    const mapWidth = Math.floor(img.width / TILE_SIZE);
    const mapHeight = Math.floor(img.height / TILE_SIZE);

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    tileMap = getTileData(mapWidth, mapHeight);

    console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);

    drawMap();
    drawPlayer();
    drawCoordinates();
};

function drawPlayer() {
    ctx.fillStyle = 'red';  // Color for the player
    ctx.fillRect(playerX * TILE_SIZE * ZOOM_FACTOR - cameraX, playerY * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
}

function getTileData(mapWidth, mapHeight) {
    const tileMap = [];

    for (let y = 0; y < mapHeight; y++) {
        const row = [];
        for (let x = 0; x < mapWidth; x++) {
            const imageData = ctx.getImageData(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            const color = imageData.data;

            if (color[0] === 0 && color[1] === 255 && color[2] === 0) {
                row.push(1);
            } else {
                row.push(0);
            }
        }
        tileMap.push(row);
    }

    return tileMap;
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        img,
        cameraX / ZOOM_FACTOR, cameraY / ZOOM_FACTOR,
        canvas.width / ZOOM_FACTOR, canvas.height / ZOOM_FACTOR,
        0, 0,
        canvas.width, canvas.height
    );

    if (showGrid) {
        drawGrid();
        drawWalls();
        drawGreenSquares();
    }
    drawNPC();
}

function drawGreenSquares() {
    ctx.fillStyle = 'green';

    greenSquares.forEach(square => {
        const squareX = square.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const squareY = square.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(squareX, squareY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

let npc = [
    {
        name: "Tod",
        message: "Hello!",
        x: 10,
        y: 10,
        canTalkAgain: false
    },
    {
        name: "Blodoof",
        message: "Bloted? Me too...",
        x: 15,
        y: 15, 
        canTalkAgain: false
    }
]

let npcX = npc[currentNPC].x;
let npcY = npc[currentNPC].y;


function NPCtext() {
    let npcText = document.getElementById('npcP');
    let npcTextContainer = document.getElementById('npcTextContainer');
    let npcName = document.getElementById('npcName');

    // Check if the player is interacting with an NPC
    const currentNPC = npc.find(n => n.x === playerX && n.y === playerY); 

    if (currentNPC) {
        talkingToNPC = true;
        npcName.innerHTML = `${currentNPC.name} Says: `;
        npcText.innerHTML = `${currentNPC.message}`;

        // Optionally update the NPC's state to prevent immediate re-interaction
        if (currentNPC.canTalkAgain) {
            currentNPC.canTalkAgain = false;  // Disable talking again for this NPC
            // Set a timer or another mechanism to allow talking again after some time (if desired)
        }
    } else {
        talkingToNPC = false;
        npcTextContainer.style.display = 'none'; // Hide the dialogue box
    }

    // Show the NPC dialogue box when talking to an NPC
    if (talkingToNPC) {
        npcTextContainer.style.display = 'block';
    }
}




function drawNPC() {
    // Draw all NPCs on the map
    npc.forEach(npc => {
        ctx.fillStyle = 'purple';
        const npcX = npc.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const npcY = npc.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(npcX, npcY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

function checkNPCInteraction() {
    npc.forEach(npc => {
        if (playerX === npc.x && playerY === npc.y && npc.canTalkAgain) {
            talkingToNPC = true;
            currentNPC = npc;
            NPCtext(); // Show NPC text when the player is at NPC's tile
        } else if (playerX !== npc.x || playerY !== npc.y) {
            talkingToNPC = false;
            npcTextContainer.style.display = 'none';
        }
    });
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

function drawCoordinates() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';

    ctx.fillText(`Player X: ${playerX}, Y: ${playerY}`, canvas.width - 10, 10);
}

function isWall(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    if (tileMap.length === 0) {
        console.log('Tile map is not yet ready.');
        return;
    }

    if (newX >= 0 && newX < tileMap[0].length && newY >= 0 && newY < tileMap.length && !isWall(newX, newY)) {
        playerX = newX;
        playerY = newY;

        cameraX = Math.max(0, Math.min(cameraX + dx * TILE_SIZE * ZOOM_FACTOR, img.width * ZOOM_FACTOR - canvas.width));
        cameraY = Math.max(0, Math.min(cameraY + dy * TILE_SIZE * ZOOM_FACTOR, img.height * ZOOM_FACTOR - canvas.height));

        // Check for NPC interaction each time the player moves
        checkNPCInteraction();

        drawMap();
        drawPlayer();
        drawCoordinates();
    }
}



// Function to download selected tiles as a text file
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

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':  // WASD control for up
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
        case 's':  // WASD control for down
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
        case 'a':  // WASD control for left
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
        case 'd':  // WASD control for right
            movePlayer(1, 0);
            break;
        case '[': // Toggle tile selection (true/false)
            tileSelectionEnabled = !tileSelectionEnabled;
            console.log(`Tile selection ${tileSelectionEnabled ? 'enabled' : 'disabled'}`);
            break;
        case ']': // Save the selected tiles to a file
            downloadSelectedTiles();
            break;
        case 'Escape':
            openEscapeMenu();
            break;
    }
});

// Add an NPC text function that checks if the player is near any NPCs
function checkNPCProximity() {
    npc.forEach(npc => {
        if (playerX === npc.x && playerY === npc.y) {
            // Optionally, you can also allow toggling to prevent over-clicking on NPCs
            if (!npc.canTalkAgain) {
                npc.message = "I've already spoken to you!";
            } else {
                npc.message = "Hello, welcome!";
            }
            npcText(); // Update the dialogue box with the NPC's message
        }
    });
}



// Add this to your existing code

canvas.addEventListener('click', (e) => {
    if (!tileSelectionEnabled || !showGrid) return;

    // Get mouse position relative to the canvas
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Convert the mouse position to tile coordinates
    const tileX = Math.floor((mouseX + cameraX) / (TILE_SIZE * ZOOM_FACTOR));
    const tileY = Math.floor((mouseY + cameraY) / (TILE_SIZE * ZOOM_FACTOR));

    // Highlight the selected tile
    highlightTile(tileX, tileY);

    // Add the tile to selected tiles array (if not already added)
    if (!selectedTiles.some(tile => tile.x === tileX && tile.y === tileY)) {
        selectedTiles.push({ x: tileX, y: tileY });
    }
});

// Function to highlight the selected tiles
function highlightTile(x, y) {
    drawMap(); // Redraw the map first

    // Highlight all selected tiles (iterate over the selected tiles array)
    selectedTiles.forEach(tile => {
        ctx.strokeStyle = 'yellow';  // Highlight color
        ctx.lineWidth = 2;
        ctx.strokeRect(tile.x * TILE_SIZE * ZOOM_FACTOR - cameraX, tile.y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);

        // Optionally, fill the tile with a semi-transparent color for better visibility
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
        ctx.fillRect(tile.x * TILE_SIZE * ZOOM_FACTOR - cameraX, tile.y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });

    // Highlight the most recently clicked tile with a slightly different effect
    ctx.strokeStyle = 'orange';  // You can change the color for the most recent tile if you'd like
    ctx.lineWidth = 3;
    ctx.strokeRect(x * TILE_SIZE * ZOOM_FACTOR - cameraX, y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);

    // Optionally, fill the most recently clicked tile with a semi-transparent color for visibility
    ctx.fillStyle = 'rgba(255, 165, 0, 0.3)';
    ctx.fillRect(x * TILE_SIZE * ZOOM_FACTOR - cameraX, y * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);

    drawPlayer(); // Redraw the player so it stays on top
    drawCoordinates(); // Redraw coordinates
}
