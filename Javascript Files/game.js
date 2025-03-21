let inBattle = false;
let runAnimation = false; 
let closeMenu = false; 

const player = {
};

// Game loop function
function gameLoop() {

    if(firstEvolving && runAnimation === false) {
            eatermon[currentEatermonIndex].src = eatermonEvolutions[currentEatermonIndex].src
            eatermon[currentEatermonIndex].name = eatermonEvolutions[currentEatermonIndex].name    
    }
    if(finalEvolving && runAnimation === false) {
            eatermon[currentEatermonIndex].src = eatermonFinalEvolutions[currentEatermonIndex].src
            eatermon[currentEatermonIndex].name = eatermonFinalEvolutions[currentEatermonIndex].name    
    }

    drawNPC();


    if (!inBattle) {
        encounter();  // Function already defined in your game
    }

 // Check for interaction with any NPC in the npc array
function checkNPCInteraction() {
    // Iterate through all NPCs in the npc array
    npc.forEach(npc => {
        // Check if the player is within one tile of the NPC (in any direction)
        if (Math.abs(playerX - npc.x) <= 1 && Math.abs(playerY - npc.y) <= 1) {
            // If the player is near the NPC, set talkingToNPC to true
            talkingToNPC = true;
            currentNPC = npc;  // Set the current NPC to the one the player is close to
            NPCtext();  // Display the NPC's dialogue
        } else {
            // If the player is not near the NPC, set talkingToNPC to false
            if (currentNPC === npc) {
                talkingToNPC = false;
                NPCtext();  // Hide or reset the NPC's dialogue
            }
        }
    });
}

    
    if(catching) {
        enemyImg.src = plates[0].src; // Make sure this is inside the condition where the image should update
    } else {
        loadingImages();
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

