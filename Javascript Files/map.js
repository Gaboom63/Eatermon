const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const TILE_SIZE = 16;  // Size of one tile (16x16)
const ZOOM_FACTOR = 3;  // Zoom in factor (e.g., 2 for 2x zoom, 1 for normal size)

// Load the PNG image
const img = new Image();
img.src = 'images/maps/officalTESTmap.png';

let tileMap = [];  // Initialize an empty tile map
let cameraX = 0;   // Horizontal offset of the camera
let cameraY = 0;   // Vertical offset of the camera

let showGrid = true; // Toggle grid visibility (true = show grid, false = hide grid)

// Define the walls (positions the player cannot walk through)
const walls = [
    { x: 5, y: 5 },
    { x: 6, y: 5 },
    { x: 7, y: 5 },
    { x: 8, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
    { x: 5, y: 8 },
    {x: 26, y: 20},
    {x: 27, y: 20},
    {x: 27, y: 21},
    {x: 26, y: 21},

    // Add more walls as needed...
];

// Wait for the image to load before setting up everything
img.onload = () => {
    const mapWidth = Math.floor(img.width / TILE_SIZE);  // Number of tiles horizontally
    const mapHeight = Math.floor(img.height / TILE_SIZE);  // Number of tiles vertically

    // Set the canvas size based on the zoom factor
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Generate the tile map based on the visible portion of the image
    tileMap = getTileData(mapWidth, mapHeight);  // Only generate the tile map after the image is loaded

    console.log(`Tile Map Size: ${tileMap[0].length}x${tileMap.length}`);
    
    // Start the game or move the player now that the map is available
    console.log('Image loaded, tile map is ready.');

    // Draw the initial map and player
    drawMap();
    drawPlayer();
    drawCoordinates();
};

// Extract tiles from the image
function getTileData(mapWidth, mapHeight) {
    const tileMap = [];

    for (let y = 0; y < mapHeight; y++) {
        const row = [];
        for (let x = 0; x < mapWidth; x++) {
            // Get pixel data for the current tile (16x16)
            const imageData = ctx.getImageData(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            const color = imageData.data;

            // Example: map color to tile types (green = event tile)
            if (color[0] === 0 && color[1] === 255 && color[2] === 0) {
                row.push(1);  // Event tile
            } else {
                row.push(0);  // Walkable tile
            }
        }
        tileMap.push(row);
    }

    return tileMap;
}

// Initial player position
let playerX = 10;
let playerY = 10;

// Draw the player on the canvas (scaled by zoom factor)
function drawPlayer() {
    ctx.fillStyle = 'red';  // Color for the player
    ctx.fillRect(playerX * TILE_SIZE * ZOOM_FACTOR - cameraX, playerY * TILE_SIZE * ZOOM_FACTOR - cameraY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
}

// Draw the map, zoomed in and moving the camera
function drawMap() {
    // Clear the canvas before redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the visible portion of the map, zoomed in (scaled by zoom factor)
    ctx.drawImage(
        img,
        cameraX / ZOOM_FACTOR, cameraY / ZOOM_FACTOR, // Source X, Y (to create a viewport)
        canvas.width / ZOOM_FACTOR, canvas.height / ZOOM_FACTOR, // Source Width, Height
        0, 0, // Destination X, Y
        canvas.width, canvas.height // Destination Width, Height
    );

    // Draw the walls in blue

    // Draw the grid if enabled
    if (showGrid) {
        drawGrid();
        drawWalls();
    }
}

// Draw the walls as red rectangles
function drawWalls() {
    ctx.fillStyle = 'blue'; // Set color to red

    // Loop through each wall and draw a red rectangle at the correct position
    walls.forEach(wall => {
        const wallX = wall.x * TILE_SIZE * ZOOM_FACTOR - cameraX;
        const wallY = wall.y * TILE_SIZE * ZOOM_FACTOR - cameraY;
        ctx.fillRect(wallX, wallY, TILE_SIZE * ZOOM_FACTOR, TILE_SIZE * ZOOM_FACTOR);
    });
}

// Draw the grid over the map
function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)'; // Grid line color
    ctx.lineWidth = 1;

    const gridSize = TILE_SIZE * ZOOM_FACTOR;

    // Draw vertical grid lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Draw horizontal grid lines
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Draw the player's coordinates in the top-right corner
function drawCoordinates() {
    ctx.fillStyle = 'white'; // Text color
    ctx.font = '16px Arial';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';

    // Display player coordinates in the top-right corner
    ctx.fillText(`Player X: ${playerX}, Y: ${playerY}`, canvas.width - 10, 10);
}

// Check if the player is trying to move into a wall
function isWall(x, y) {
    return walls.some(wall => wall.x === x && wall.y === y);
}

// Move player and adjust the camera
function movePlayer(dx, dy) {
    const newX = playerX + dx;
    const newY = playerY + dy;

    // Ensure tileMap is available before proceeding
    if (tileMap.length === 0) {
        console.log('Tile map is not yet ready.');
        return;  // Stop movement until tile map is loaded
    }

    // Check if the new position is valid (within bounds) and not a wall
    if (newX >= 0 && newX < tileMap[0].length && newY >= 0 && newY < tileMap.length && !isWall(newX, newY)) {
        playerX = newX;
        playerY = newY;

        // Adjust the camera position horizontally
        cameraX = Math.max(0, Math.min(cameraX + dx * TILE_SIZE * ZOOM_FACTOR, img.width * ZOOM_FACTOR - canvas.width));

        // Adjust the camera position vertically
        cameraY = Math.max(0, Math.min(cameraY + dy * TILE_SIZE * ZOOM_FACTOR, img.height * ZOOM_FACTOR - canvas.height));

        // Trigger events if on event tiles
        if (tileMap[playerY][playerX] === 1) {
            triggerEvent();
        }
    }

    // Redraw the map and player after movement
    drawMap();
    drawPlayer();
    drawCoordinates(); // Redraw the coordinates display
}

// Example of an event trigger
function triggerEvent() {
    console.log('Event triggered at position:', playerX, playerY);
    // You can trigger dialogues, battles, or any other game logic here.
}

// Listen for keyboard input after the image is loaded and the tile map is ready
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1); // Move up
            break;
        case 'ArrowDown':
            movePlayer(0, 1);  // Move down
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0); // Move left
            break;
        case 'ArrowRight':
            movePlayer(1, 0);  // Move right
            break;
    }
});
