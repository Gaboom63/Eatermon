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
const spriteWidth = TILE_SIZE * ZOOM_FACTOR * 0.8;
const spriteHeight = TILE_SIZE * ZOOM_FACTOR * 0.8;
let npcName = document.getElementById('npcName');
let npcP = document.getElementById('npcP');
let npcTextBox = document.getElementById('npcTextBox'); 
let initalCutsceneName = document.getElementById('initalCutsceneName');
let playerName = ''; // This will store the player's name


const mainPlayer = document.getElementById("player");
const upperImg = new Image();
const lowerImg = new Image();
const mainplayerImg = new Image();
upperImg.src = currentMap.upperSRC;
lowerImg.src = currentMap.lowerSRC;
mainplayerImg.src = 'images/player.png';

function drawDoors() {
    // Loop through all doors in currentMap
    currentMap.doors.forEach(door => {
        const doorX = door.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const doorY = door.y * TILE_SIZE * ZOOM_FACTOR - cameraY;

        // Check if the door is part of a specific group and set its color
        let doorColor = 'yellow';  // Default color
        if (door.doorDestinationGroup1) {
            doorColor = 'blue';  // Color for Group 1 doors
        } else if (door.doorDestinationGroup2) {
            doorColor = 'green';  // Color for Group 2 doors
        }
        
        // Set the fill color based on the group
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

// Image Loading and Initialization
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
    // Clear the canvas to avoid remnants of previous frames
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the upper image (background)
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
    drawPlayer();
    drawNPC();

    // Draw the lower image (on top of the player)
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

function loadMap(mapData) {
    upperImg.src = mapData.upperSRC;
    lowerImg.src = mapData.lowerSRC;
    ZOOM_FACTOR = mapData.zoom;

    Promise.all([
        new Promise(resolve => upperImg.onload = resolve),
        new Promise(resolve => lowerImg.onload = resolve)
    ]).then(() => {
        const mapWidth = Math.floor(upperImg.width / TILE_SIZE);
        const mapHeight = Math.floor(lowerImg.height / TILE_SIZE); //Corrected line

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

    
        tileMap = getTileData(mapWidth, mapHeight);
        console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);
        drawMap();
        drawPlayer();
        drawCoordinates();
    });
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

function drawNPC() {
    currentMap.npcs.forEach(npc => {  // 'npc' instead of 'npcs'
        const npcImage = npcImages[npc.name]; // Access image using npc.name

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

// Preload NPC images
const npcImages = {};

currentMap.npcs.forEach(npc => {  // Corrected the variable name from 'npcs' to 'npc'
    const img = new Image();
    img.src = npc.src;  // Correctly reference the 'src' property of the individual NPC
    npcImages[npc.name] = img;
});


// Function to check if the position is occupied by an NPC
function isNPC(x, y) {
    return currentMap.npcs.some(npcs => npcs.x === x && npcs.y === y);
}

function isWall(x, y) {
    return currentMap.walls.some(wall => wall.x === x && wall.y === y);
}

function showNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.add('show');
}

let messageIndex = 0; // To track which message to show next

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
    
    // Set NPC Name and message
    npcName.innerHTML = `Dream Warden`;
    npcP.innerHTML = intialDreamMessages[messageIndex]; // Initial message
    npcTextBox.style.display = 'block'; 
    npcTextBox.innerHTML = `Please enter your name below:`;  // Prompt to enter the name in npcTextBox
    initalCutsceneName.style.display = 'block'; 
    npcNormal = false; 
    normal = false;     
    initalCutScene = true;

    // Create and style floating Z's (White Z's)
    let floatingZs = document.createElement('div');
    floatingZs.classList.add('floating-zs');
    startingOverlay.appendChild(floatingZs); // Add the floating Z's container to the starting overlay

    // Create individual Z's
    for (let i = 0; i < 4; i++) {
        let z = document.createElement('span');
        z.classList.add('z');
        z.innerHTML = 'Z'; 
        floatingZs.appendChild(z);
    }

    // Focus on the text box and listen for the Enter key on the whole document
    npcTextBox.focus();
    document.addEventListener('keydown', handleKeyPress);
    
    showNpcText();
}


function handleKeyPress(event) {
    // Check if the Enter key was pressed
    if (event.key === 'Enter' && !gettingName) {
        showNextMessage(); // Show the next message when Enter is pressed
    }
}

// startScreen()
function showNextMessage() {
    let startingOverlay = document.getElementById('startingScene'); 
    messageIndex++; // Move to the next message
    if (messageIndex < intialDreamMessages.length) {
        npcP.innerHTML = intialDreamMessages[messageIndex]; // Display the next message
    } else {
        npcP.innerHTML = `I have told you all I can for now. Wake Up ${playerName}!`; // If no more messages, end the conversation
        setTimeout(() => {
            hideNpcText(); 
            npcNormal = true; 
            normal = true;     
            initalCutScene = false;
            startingOverlay.classList.add('hidden'); // Add the "hidden" class to trigger fade-out
        }, 2000); // Wait for 2 seconds before hiding
    }
}


function submitName() {
    playerName = npcTextBox.value.trim(); // Get the value entered by the player
    if (playerName !== '') {
        npcP.innerHTML = `Welcome, ${playerName}, to the world of Eatermon!`; // Personalizing the npcTextBox message
        npcTextBox.style.display = 'none'; // Hide the input field after submission
        initalCutsceneName.style.display = 'none'; // Hide the submit button
        messageIndex = 0; // Reset messages after name submission
        gettingName = false; 
    } else {
        npcTextBox.innerHTML = `Please enter a valid name.`; // Error message if name is not entered
    }
}


// NPC Interaction
function NPCtext() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    let npcName = document.getElementById('npcName');

    if (currentNPC) {
        showNpcText(); // Show text when talking to the NPC.
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
                hideNpcText(); // Hide text after "Already talked"
            }, 1000);
            waitingForEnter = true;
        }
    }
}





// NPC Interaction
function interactWithNPC() {
    const npcAtPlayerPosition = currentMap.npcs.find(n => Math.abs(n.x - playerX) <= 1 && Math.abs(n.y - playerY) <= 1);
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



function hideNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
    // console.log("hideNpcText: Container hidden.");
}

// Add this function to show the npcTextContainer
function showNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.style.display = 'block';
    npcTextContainer.classList.add('show');
    // console.log("showNpcText: Container shown.");
}


//THIS IS HOW YOU START THE FIRST CUTSCENE
// startScreen()
