

const tileH = 48;
const tileW = 48;

const tileRows = 10;
const tileColum = 10;

let playerX = tileW * 1;
let playerY = tileH * 8;
const playerSize = 20;
const playerSpeed = 5;


// const checkCollision = (x, y) => {
//     for (let wall of walls) {
//         if (x + playerSize > wall.x &&
//             x - playerSize < wall.x + wall.width &&
//             y + playerSize > wall.y &&
//             y - playerSize < wall.y + wall.height) {
//             return true;
//         }
//     }
//     return false;
// };

const keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});