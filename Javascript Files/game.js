// game.js
// Set up canvas
 const canvas = document.getElementById('gameCanvas');
 const ctx = canvas.getContext('2d');
 let inBattle = false;

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Game loop function
function gameLoop() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw the player
    updatePlayerPosition();
    drawGrass();
    drawPlayer();
    if (!inBattle) {
        encounter();
    }    loadingImages();
    // console.log(pickNum);

    updateHp(); // Update UI with the new enemy's HP
    // battleMenu();
    // Call next frame
    requestAnimationFrame(gameLoop);
}



// Start game loop
gameLoop();


