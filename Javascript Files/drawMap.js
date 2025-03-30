// Constants and Initial Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const TILE_SIZE = 16;  // Tile size
const spriteSheetCols = 4;
const spriteSheetRows = 4;
let currentFrameX = 0;
let currentFrameY = 0;
let scaleFactor = 1;
let cameraX = 0;
let cameraY = 0;
let showGrid = true; // Toggle grid visibility
let talkingToNPC = false;
let currentNPC = 0;
let currentNPCEatermon;
let waitingForEnter = true;
let npcNormal = true;
let npcText = document.getElementById('npcP');
let selectedTiles = []; // For selected tiles
let tileSelectionEnabled = false;
let isShiftPressed = false;  // Track if the Shift key is pressed
let firstTile = null;  // Store the first tile clicked when Shift is pressed
let initalCutScene = false;
let currentMap = maps[0];
let tileMap = maps[1].id;
let playerX = currentMap.startingXY.x;
let playerY = currentMap.startingXY.y;
let ZOOM_FACTOR = currentMap.zoom;  // Zoom factor
const spriteWidth = TILE_SIZE * ZOOM_FACTOR * 0.5;
const spriteHeight = TILE_SIZE * ZOOM_FACTOR * 0.5;
let npcName = document.getElementById('npcName');
let npcP = document.getElementById('npcP');
let npcTextBox = document.getElementById('npcTextBox'); 
let initalCutsceneName = document.getElementById('initalCutsceneName');
let playerName = ''; // This will store the player's name
let scaledSize = TILE_SIZE * ZOOM_FACTOR * 3;


const mainPlayer = document.getElementById("player");
const upperImg = new Image();
const lowerImg = new Image();
const mainplayerImg = new Image();
upperImg.src = currentMap.upperSRC;
lowerImg.src = currentMap.lowerSRC;
mainplayerImg.src = 'images/player.png';

function drawDoors() {
    currentMap.doors.forEach(door => {
        const doorX = door.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const doorY = door.y * TILE_SIZE * ZOOM_FACTOR - cameraY;

        let doorColor = 'yellow';
        if (door.doorDestinationGroup1) {
            doorColor = 'blue';
        } else if (door.doorDestinationGroup2) {
            doorColor = 'green';
        }
        
        ctx.fillStyle = doorColor;
        ctx.fillRect(doorX, doorY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}


function isDoor(x, y) {
    return currentMap.doors.some(door => door.x === x && door.y === y);
}

function drawLake() {
    ctx.fillStyle = 'blue';
    currentMap.lakes.forEach(lake => {
        const lakeX = lake.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const lakeY = lake.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(lakeX, lakeY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

upperImg.onload = () => {
    const mapWidth = Math.floor(upperImg.width / TILE_SIZE);
    const mapHeight = Math.floor(upperImg.height / TILE_SIZE);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    tileMap = getTileData(mapWidth, mapHeight);
    console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);
    drawMap();
    drawPlayer();
    drawCoordinates();
};

lowerImg.onload = () => {
    const mapWidth = Math.floor(lowerImg.width / TILE_SIZE);
    const mapHeight = Math.floor(lowerImg.height / TILE_SIZE);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    tileMap = getTileData(mapWidth, mapHeight);
    console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);
    drawMap();
    drawPlayer();
    drawCoordinates();
    movePlayer(0,0);
    movePlayer(0,0);
};

let MAP_WIDTH = currentMap.mapWidth;
let MAP_HEIGHT = currentMap.mapHeight;

function updateCamera() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const playerScreenX = playerX * TILE_SIZE * ZOOM_FACTOR;
    const playerScreenY = playerY * TILE_SIZE * ZOOM_FACTOR;

    cameraX = playerScreenX - centerX;
    cameraY = playerScreenY - centerY;

    const mapWidth = MAP_WIDTH * TILE_SIZE * ZOOM_FACTOR;
    const mapHeight = MAP_HEIGHT * TILE_SIZE * ZOOM_FACTOR;

    // Corrected camera boundary logic
    cameraX = Math.max(0, Math.min(cameraX, mapWidth - canvas.width));
    cameraY = Math.max(0, Math.min(cameraY, mapHeight - canvas.height));
}

function drawMap() {
    MAP_WIDTH = currentMap.mapWidth;
    MAP_HEIGHT = currentMap.mapHeight;
    updateCamera();

    ctx.drawImage(
        lowerImg,
        cameraX / ZOOM_FACTOR,
        cameraY / ZOOM_FACTOR,
        canvas.width / ZOOM_FACTOR,
        canvas.height / ZOOM_FACTOR,
        0, 0,
        canvas.width,
        canvas.height
    );

    if (showGrid) {
        drawGrid();
        drawDoors();
        drawWalls();
        drawGreenSquares();
        drawLake();
        eventSpaces();
    }

    drawNPC();    // Draw NPCs BEFORE the player

    drawPlayer(); // Player is drawn AFTER NPCs

    ctx.drawImage(
        upperImg,
        cameraX / ZOOM_FACTOR,
        cameraY / ZOOM_FACTOR,
        canvas.width / ZOOM_FACTOR,
        canvas.height / ZOOM_FACTOR,
        0, 0,
        canvas.width,
        canvas.height
    );
}


function drawPlayer() {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
        mainplayerImg,
        currentFrameX * spriteWidth,
        currentFrameY * spriteHeight,
        spriteWidth, spriteHeight,
        Math.floor(playerX * TILE_SIZE * ZOOM_FACTOR - cameraX + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2),
        Math.floor(playerY * TILE_SIZE * ZOOM_FACTOR - cameraY + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2),
        Math.floor(scaledSize),
        Math.floor(scaledSize)
    );
}

function drawWalls() {
    ctx.fillStyle = 'red';
    currentMap.walls.forEach(wall => {
        const wallX = wall.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const wallY = wall.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(wallX, wallY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}
function eventSpaces() {
    ctx.fillStyle = 'blue';
    currentMap.eventSpace.forEach(eventSpace => {
        const eventSpaceX = eventSpace.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const eventSpaceY = eventSpace.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(eventSpaceX, eventSpaceY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

function drawGreenSquares() {
    ctx.fillStyle = 'green';

    currentMap.grass.forEach(grass => {
        const grassX = grass.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const grassY = grass.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(grassX, grassY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
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

let npcImages = {};

currentMap.npcs.forEach(npc => {
    const img = new Image();
    img.src = npc.src;
    npcImages[npc.name] = img;
});



function isWall(x, y) {
    return currentMap.walls.some(wall => wall.x === x && wall.y === y);
}

function showNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.add('show');
}

let messageIndex = 0;

let intialDreamMessages = [
    "Welcome to the world of Eatermon. What is your name?",
    "This is a very different world from the world you know. In your world many people eat food, and it is how they survive.",
    "Here food is not a necessity and due to a weird paradox universe food is alive.",
    `Instead they are creatures we investigate and use for fun. We call those creatures <b>Eatermons</b>.`,
    `What story awaits you? Let's find out!`
];

let gettingName = true; 
function startScreen() {
    let startingOverlay = document.getElementById('startingScene'); 
    startingOverlay.style.display = `block`;
    startingOverlay.style.backgroundColor = 'black'; 
    
    npcName.innerHTML = `Dream Warden`;
    npcP.innerHTML = intialDreamMessages[messageIndex];
    npcTextBox.style.display = 'block'; 
    npcTextBox.innerHTML = `Please enter your name below:`;
    initalCutsceneName.style.display = 'block'; 
    npcNormal = false; 
    normal = false;     
    initalCutScene = true;

    let floatingZs = document.createElement('div');
    floatingZs.classList.add('floating-zs');
    startingOverlay.appendChild(floatingZs);

    for (let i = 0; i < 4; i++) {
        let z = document.createElement('span');
        z.classList.add('z');
        z.innerHTML = 'Z'; 
        floatingZs.appendChild(z);
    }

    npcTextBox.focus();
    document.addEventListener('keydown', handleKeyPress);
    
    showNpcText();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !gettingName) {
        showNextMessage();
    }
}

function showNextMessage() {
    let startingOverlay = document.getElementById('startingScene'); 
    messageIndex++;
    if (messageIndex < intialDreamMessages.length) {
        npcP.innerHTML = intialDreamMessages[messageIndex];
    } else {
        npcP.innerHTML = `I have told you all I can for now. Wake Up ${playerName}!`;
        setTimeout(() => {
            hideNpcText(); 
            npcNormal = true; 
            normal = true;     
            initalCutScene = false;
            startingOverlay.classList.add('hidden');
        }, 2000);
    }
}

function submitName() {
    playerName = npcTextBox.value.trim();
    if (playerName !== '') {
        npcP.innerHTML = `Welcome, ${playerName}, to the world of Eatermon!`;
        npcTextBox.style.display = 'none';
        initalCutsceneName.style.display = 'none';
        messageIndex = 0;
        gettingName = false; 
    } else {
        npcTextBox.innerHTML = `Please enter a valid name.`;
    }
}

function NPCtext() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    let npcName = document.getElementById('npcName');

    if (currentNPC) {
        showNpcText();
        if (currentNPC.canTalkAgain) {
            npcName.innerHTML = `${currentNPC.name} Says: `;
            npcText.innerHTML = `${currentNPC.message}`;
            waitingForEnter = true;
        } else {
            npcName.innerHTML = `${currentNPC.name} Says: `;
            npcText.innerHTML = `${currentNPC.talkedToAgain}`;
            setTimeout(() => {
                npcNormal = true;
                waitingForEnter = false;
                hideNpcText();
            }, 1000);
            waitingForEnter = true;
        }
    }
}
function interactWithNPC() {
    // console.log(`Player Position: (${Math.floor(playerX)}, ${Math.floor(playerY)})`);

    const npcAtPlayerPosition = currentMap.npcs.find(npc => {
        const npcWidth = Math.ceil(3); // Adjust based on NPC sprite size
        const npcHeight = Math.ceil(3);

        // console.log(`Checking NPC: ${npc.name} at (${Math.floor(npc.x)}, ${Math.floor(npc.y)})`);

        for (let offsetX = 0; offsetX < npcWidth; offsetX++) {
            for (let offsetY = 0; offsetY < npcHeight; offsetY++) {
                let checkX = Math.floor(npc.x) + offsetX;
                let checkY = Math.floor(npc.y) + offsetY;
                
                // console.log(`Checking tile: (${checkX}, ${checkY})`);

                if (checkX === Math.floor(playerX) && checkY === Math.floor(playerY)) {
                    // console.log(`Match found! NPC ${npc.name} detected.`);
                    return true;
                }
            }
        }
        return false;
    });

    if (npcAtPlayerPosition) {
        console.log('Interacting with NPC:', npcAtPlayerPosition.name);
        talkingToNPC = true;
        currentNPC = npcAtPlayerPosition;
        NPCtext();
        npcNormal = false;
    } else {
        console.log(' No NPC found at player position');
    }
}



function hideNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
}

function showNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.style.display = 'block';
    npcTextContainer.classList.add('show');
}

function loadMap(mapData) {
    currentMap = mapData;
    upperImg.src = mapData.upperSRC;
    lowerImg.src = mapData.lowerSRC;
    ZOOM_FACTOR = mapData.zoom;
    playerX = mapData.startingXY.x;
    playerY = mapData.startingXY.y;
    MAP_WIDTH = mapData.mapWidth;
    MAP_HEIGHT = mapData.mapHeight;

    console.log("Loading map:", currentMap.id, "ZOOM_FACTOR:", ZOOM_FACTOR);

    Promise.all([
        new Promise(resolve => upperImg.onload = resolve),
        new Promise(resolve => lowerImg.onload = resolve)
    ]).then(() => {
        const mapWidth = Math.floor(upperImg.width / TILE_SIZE);
        const mapHeight = Math.floor(lowerImg.height / TILE_SIZE);
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        tileMap = getTileData(mapWidth, mapHeight);
        console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);

        let npcImagePromises = currentMap.npcs.map(npc => {
            return new Promise(resolve => {
                const img = new Image();
                img.src = npc.src;
                img.onload = () => {
                    npcImages[npc.name] = img;
                    resolve();
                };
                img.onerror = () => {
                    console.error("error loading npc image: ", npc.src);
                    resolve();
                };
            });
        });

        Promise.all(npcImagePromises).then(() => {
            console.log("NPC Images:", npcImages);
            console.log("Current Map npcs:", currentMap.npcs);

            // Use requestAnimationFrame to ensure rendering is complete
            requestAnimationFrame(() => {
                drawMap();
                drawPlayer();
                // drawNPC();
                drawCoordinates();
            });
        });
    });
}
function drawNPC() {
    currentMap.npcs.forEach(npc => {
        const npcImage = npcImages[npc.name];
        if (npcImage) {
            const scaledSize = TILE_SIZE * ZOOM_FACTOR * 2.5;
            const npcX = npc.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
            const npcY = npc.y * TILE_SIZE * ZOOM_FACTOR - cameraY;

            ctx.drawImage(npcImage, npcX + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2, npcY + (TILE_SIZE * ZOOM_FACTOR - scaledSize) / 2, scaledSize, scaledSize);
        }
    });
}

let shrinkFactor = 0.7; // Example: shrink to 75% of original size

function drawPlayer() {
    ctx.imageSmoothingEnabled = false;

    // Calculate the new scaled size
    let currentScaledSize = scaledSize * shrinkFactor;

    ctx.drawImage(
        mainplayerImg,
        currentFrameX * spriteWidth,
        currentFrameY * spriteHeight,
        spriteWidth, spriteHeight,
        Math.floor(playerX * TILE_SIZE * ZOOM_FACTOR - cameraX + (TILE_SIZE * ZOOM_FACTOR - currentScaledSize) / 2),
        Math.floor(playerY * TILE_SIZE * ZOOM_FACTOR - cameraY + (TILE_SIZE * ZOOM_FACTOR - currentScaledSize) / 2),
        Math.floor(currentScaledSize),
        Math.floor(currentScaledSize)
    );
}

// To shrink the player, update the shrinkFactor or scaledSize variable.
// Example:
function shrinkPlayer() {
    shrinkFactor = 0.5; // Shrink to 50%
}

function resetPlayerSize() {
    shrinkFactor = 1; // back to 100%
}



function isNPC(x, y) {
    return currentMap.npcs.some(npc => {
        const npcWidth = Math.ceil(2); // Approximate width in tiles
        const npcHeight = Math.ceil(2); // Approximate height in tiles

        for (let offsetX = 0; offsetX < npcWidth; offsetX++) {
            for (let offsetY = 0; offsetY < npcHeight; offsetY++) {
                if (Math.floor(npc.x) + offsetX === Math.floor(x) && 
                    Math.floor(npc.y) + offsetY === Math.floor(y)) {
                    return true;
                }
            }
        }
        return false;
    });
}
