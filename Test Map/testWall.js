const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

const tileH = 48;
const tileW = 48;

const tileRows = 10;
const tileColum = 10;

let playerX = tileW * 1;
let playerY = tileH * 1;
const playerSize = 20;
const playerSpeed = 5;

let playerImage = new Image();
playerImage.src = 'player.png'; // Replace with your sprite sheet path

let playerFrameX = 0;
let playerFrameY = 0;
const spriteWidth = 32; // Width of a single sprite frame
const spriteHeight = 32; // Height of a single sprite frame
const spriteFrames = 4; // Number of frames in a row for each direction

let playerDirection = 'down'; // Initial direction

const updateAll = () => {
    window.requestAnimationFrame(updateAll);
    drawMap();
    drawPlayer();
    handleInput();
};

window.onload = () => {
    canvas.width = tileW * tileColum;
    canvas.height = tileH * tileRows;
    window.requestAnimationFrame(updateAll);
};

class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = tileW;
        this.height = tileH;
    }
}

let walls = [];

const map = [
    2, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
];

const drawMap = () => {
    walls = [];
    for (let row = 0; row < tileRows; row++) {
        for (let col = 0; col < tileColum; col++) {
            let arrayIndex = tileRows * row + col;

            if (map[arrayIndex] === 1) {
                ctx.fillStyle = "gray";
                ctx.fillRect(tileW * col, tileH * row, tileW, tileH);
            } else if(map[arrayIndex] === 2){
                ctx.fillStyle = "green";
                ctx.fillRect(tileW * col, tileH * row, tileW, tileH);

            } else {
                ctx.fillStyle = "black";
                ctx.fillRect(tileW * col, tileH * row, tileW, tileH);
                walls.push(new Wall(tileW * col, tileH * row));
            }
        }
    }
};

const drawPlayer = () => {
    ctx.drawImage(
        playerImage,
        playerFrameX * spriteWidth,
        playerFrameY * spriteHeight,
        spriteWidth,
        spriteHeight,
        playerX - playerSize, // Adjust for center
        playerY - playerSize, // Adjust for center
        spriteWidth * (playerSize / (spriteWidth / 2)) ,
        spriteHeight * (playerSize / (spriteHeight / 2)),
        
    );
};

const handleInput = () => {
    let moving = false;
    if (keys.ArrowUp) {
        movePlayer(0, -playerSpeed);
        playerDirection = 'up';
        playerFrameY = 2;
        moving = true;
    }
    if (keys.ArrowDown) {
        movePlayer(0, playerSpeed);
        playerDirection = 'down';
        playerFrameY = 0;
        moving = true;
    }
    if (keys.ArrowLeft) {
        movePlayer(-playerSpeed, 0);
        playerDirection = 'left';
        playerFrameY = 3;
        moving = true;
    }
    if (keys.ArrowRight) {
        movePlayer(playerSpeed, 0);
        playerDirection = 'right';
        playerFrameY = 1;
        moving = true;
    }

    if (moving) {
        playerFrameX = (playerFrameX + 1) % spriteFrames;
    } else {
        playerFrameX = 0; // Reset to the first frame when not moving
    }
};

const movePlayer = (dx, dy) => {
    const newX = playerX + dx;
    const newY = playerY + dy;

    if (!checkCollision(newX, newY)) {
        playerX = newX;
        playerY = newY;
    }
};

const checkCollision = (x, y) => {
    for (let wall of walls) {
        if (x + playerSize > wall.x &&
            x - playerSize < wall.x + wall.width &&
            y + playerSize > wall.y &&
            y - playerSize < wall.y + wall.height) {
            return true;
        }
    }
    return false;
};

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});