let inBattle = false;
let runAnimation = false; 
let closeMenu = false; 

const player = {
};

// Game loop function
function gameLoop() {
    // Draw the map and the player
    drawMap();

    if(showGrid) {
        drawCoordinates();
        highlightSelectedTiles();  // Make sure this happens after drawing the map
    }
    
    if(firstEvolving && runAnimation === false) {
        eatermon[currentEatermonIndex].src = eatermonEvolutions[currentEatermonIndex].src
        eatermon[currentEatermonIndex].name = eatermonEvolutions[currentEatermonIndex].name    
    }

    if(finalEvolving && runAnimation === false) {
        eatermon[currentEatermonIndex].src = eatermonFinalEvolutions[currentEatermonIndex].src
        eatermon[currentEatermonIndex].name = eatermonFinalEvolutions[currentEatermonIndex].name    
    }

    if (!inBattle) {
        encounter();  // Function already defined in your game
    }

    
    if(catching && !isNpcEatermon) {
        enemyImg.src = plates[0].src; // Ensure the enemy image is updated as needed
    } else {
        loadingImages();  // This function might be updating player or game state
    }

    updateHp(); // Update UI with the new enemy's HP

    // Call the next frame
    requestAnimationFrame(gameLoop);
}



function evolve() {
    if(eatermon[currentEatermonIndex].level == eatermonEvolutions[currentEatermonIndex].levelRequried) {
        firstEvolving = true; 
        levelUpMenu = true; 
        triggerBlinkingAnimation(); 
        runAnimation = true; 
        setTimeout(() => {
            runAnimation = false; 
        }, 3100); 
        setTimeout(() => {
            firstEvolving = false; 
            levelUpMenu = false;  
            if(!something) {
                returnToNormal(); 
            }  
        }, 7000); 
    }
    // else if(eatermon[currentEatermonIndex].level == eatermonFinalEvolutions[currentEatermonIndex].levelRequried){
    //     firstEvolving = false;
    //     finalEvolving = true; 
    // } 
    else {
        firstEvolving = false; 
    }
    
}

gameLoop(); 

