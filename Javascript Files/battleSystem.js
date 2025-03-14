let forgetButton = document.getElementById('moveText');
let finalMovesLearned = document.getElementById('finalMovesLearned'); 
let noButton = document.getElementById('moveTextNo'); 
// Restore enemy HP at the beginning of battle
function restoreEnemyHp() {
    if (hasEncounted) {
        eatermon[enemyEatermonIndex].hp = eatermon[enemyEatermonIndex].maxHp;
        enemyHpInner.style.display = 'block';
        enemyHpInner.style.width = `${eatermon[enemyEatermonIndex].maxHp}%`;
    }
}

// Update HP display
function updateHp() {
    let enemyHpText = document.getElementById('enemyHP');
    let playerHpText = document.getElementById('playerHP');
    enemyHpText.innerHTML = `<b>${eatermon[enemyEatermonIndex].name}'s HP: ${eatermon[enemyEatermonIndex].hp} / ${eatermon[enemyEatermonIndex].maxHp}</b>`;
    playerHpText.innerHTML = `<b>${eatermon[currentEatermonIndex].name}'s HP: ${eatermon[currentEatermonIndex].hp} / ${eatermon[currentEatermonIndex].maxHp }</b>`;
}

function restorePlayerHp() {
    let playerHpInner = document.getElementById('playerinnerBar');
    playerHpInner.style.width = `${eatermon[currentEatermonIndex].hp}%`; 
}

let playerTurn = true;  // Set it to true initially, so it's the player's turn at the start

// Handle player's attack with type matchups
function attackMove(eatermonIndex, moveIndex) {
    if (!playerTurn) {
        return;  // If it's not the player's turn, don't proceed with the attack
    }

    const selectedEatermon = eatermon[eatermonIndex];
    const selectedMove = eatermonMoves[eatermonIndex].moves[moveIndex];
    const enemyEatermon = eatermon[enemyEatermonIndex];
    const enemyType = enemyEatermon.type;

    // Handle type effectiveness
    const moveType = selectedMove.type;
    const typeEffectiveness = getTypeEffectiveness(moveType, enemyType);

    let modifiedPower = selectedMove.power;  // Now we're using the power from the move object

    // Handle effectiveness
    if (typeEffectiveness === 'strong') {
        modifiedPower *= 2;
    } else if (typeEffectiveness === 'weak') {
        modifiedPower *= 0.5;
    } else if (typeEffectiveness === 'noEffect') {
        modifiedPower = 0;
    }

    // If it's a Fire-type move and the enemy has an ability that negates it, set power to 0
    if (moveType === "Fire" && eatermonAbilitys[0].checkAbility(enemyEatermon) && enemyEatermon.type === "Fire") {
        modifiedPower = 0; // No damage dealt
    }

    // Apply damage to the enemy
    if (modifiedPower > 0) {
        enemyEatermon.hp -= modifiedPower;
        enemyEatermon.hp = Math.max(0, enemyEatermon.hp);  // Ensure HP doesn't go below 0
        enemyHpInner.style.width = `${(enemyEatermon.hp / enemyEatermon.maxHp) * 100}%`;
    }

    battleText.innerHTML = `${selectedEatermon.name} used ${selectedMove.name}! <br><b>${enemyEatermon.name}'s HP: ${enemyEatermon.hp}</b>`;

    // Check if the enemy is defeated
    if (enemyEatermon.hp <= 0) {
        enemyHpInner.style.width = `0%`;
        setTimeout(() => {
            battleText.innerHTML = `You Won Against ${enemyEatermon.name}!`;
            enemyHpInner.style.display = `none`;
            // Add XP to the current eatermon instead of resetting it
            const xpGained = generateXpForLevel(selectedEatermon.level);  // You can customize the amount of XP earned here
            eatermon[currentEatermonIndex].xp += 100;  // Add XP
            evolve();
            updateXpBarDisplay();  // Update the XP bar display
            checkIfXpIsFull();     // Check if it's time to level up
            if (normal) {
                setTimeout(() => {
                    battleMenuScript.style.display = 'none';
                }, 1000);
            }
        }, 1000);
        setTimeout(() => {
            inBattle = false;
        }, 3000);
    } else {
        // If the enemy is not defeated, switch to the enemy's turn
        playerTurn = false;
        setTimeout(() => {
            if (enemyEatermon.hp > 0) {
                enemyMove();  // Enemy attacks
            }
        }, 1000);
    }

    updateHp();  // Update the UI after the attack
}





// Enemy attack move
function enemyMove() {
    const enemyEatermon = eatermon[enemyEatermonIndex];
    const enemyMoves = eatermonMoves[enemyEatermonIndex].moves;
    const selectedEnemyMove = enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
    const playerEatermon = eatermon[currentEatermonIndex];
    const playerType = playerEatermon.type;

    if (playerEatermon.hp <= 0) {
        // If player is already defeated, stop enemy from attacking
        return;
    }

    let modifiedPower = selectedEnemyMove.power;

    // Check if the enemy's move is strong or weak against the player's type
    const moveType = selectedEnemyMove.type;
    const typeEffectiveness = getTypeEffectiveness(moveType, playerType);

    // Modify the power based on the type effectiveness
    if (typeEffectiveness === 'strong') {
        modifiedPower *= 2;
    } else if (typeEffectiveness === 'weak') {
        modifiedPower *= 0.5;
    } else if (typeEffectiveness === 'noEffect') {
        modifiedPower *= 0;
    }

    // Apply the modified power to the player's HP
    if (modifiedPower > 0) {
        playerEatermon.hp -= modifiedPower;
        playerEatermon.hp = Math.max(0, playerEatermon.hp);
        const playerHpInner = document.getElementById('playerinnerBar');
        playerHpInner.style.width = `${(playerEatermon.hp / playerEatermon.maxHp) * 100}%`;
    }

    // Check if player is defeated
    if (playerEatermon.hp <= 0) {
        const playerHpInner = document.getElementById('playerinnerBar');
        playerHpInner.style.width = `0%`;
        setTimeout(() => {
            playerHpInner.style.display = `none`;
            battleText.innerHTML = `You Lost Against ${enemyEatermon.name}!`;
            
        }, 1000);
        setTimeout(() => {
            inBattle = false; // End the battle if the player is dead
            battleMenuScript.style.display = 'none'; // End the battle
            alert("You Died (Debug So Reloading)");
            location.reload(); 
        }, 3000);
    }

    updateHp(); // Update HP UI after attack

    battleText.innerHTML = `${enemyEatermon.name} used ${selectedEnemyMove.name}! <br><b>${playerEatermon.name}'s HP: ${playerEatermon.hp}</b>`;

    // End the enemy's turn, and it's now the player's turn again
    playerTurn = true;
}


// Get type effectiveness between two types
function getTypeEffectiveness(attackType, defenseType) {
    //console.log(`Checking effectiveness between Attack Type: ${attackType} and Defense Type: ${defenseType}`);
    
    const attackerType = eatermonTypes.find(type => type.type === attackType);
    const defenderType = eatermonTypes.find(type => type.type === defenseType);

    if (!attackerType || !defenderType) {
        //console.log(`Invalid types! Returning neutral.`);
        return 'neutral';
    }

    // Check if the attack type has no effect on the defender's type
    if (defenderType.noEffect.includes(attackType)) {
        //console.log(`${attackType} has no effect on ${defenderType.type}`);
        return 'noEffect';  // No effect on the target
    }

    // Check if the move type is strong or weak against the defender's type
    if (attackerType.strong.includes(defenderType.type)) {
        //console.log(`${attackType} is strong against ${defenderType.type}`);
        return 'strong';  // Attack is strong
    } else if (attackerType.weak.includes(defenderType.type)) {
        //console.log(`${attackType} is weak against ${defenderType.type}`);
        return 'weak';    // Attack is weak
    }

    //console.log(`${attackType} has a neutral effect on ${defenderType.type}`);
    return 'neutral';  // Neutral effect
}
function handleLearnNewMove(eatermonIndex) {
    // Early exit if eatermonIndex is invalid
    if (eatermonIndex === undefined || eatermonIndex < 0 || eatermonIndex >= eatermonMoves.length) {
        console.error("Invalid eatermonIndex:", eatermonIndex);
        return;
    }

    console.log("eatermonIndex before array check:", eatermonIndex);

    // Ensure the eatermonIndex is not an array and is a valid index
    if (Array.isArray(eatermonIndex)) {
        eatermonIndex = eatermonIndex[0];
    }

    console.log("Corrected eatermonIndex:", eatermonIndex);

    // Validate if eatermonMoves[eatermonIndex] and its moves are properly set
    if (!eatermonMoves[eatermonIndex] || !Array.isArray(eatermonMoves[eatermonIndex].moves)) {
        console.error("Invalid eatermonMoves or moves array is missing for index:", eatermonIndex);
        console.log("eatermonMoves:", eatermonMoves);  // Log the entire eatermonMoves for debugging
        return;
    }

    const foundEatermon = eatermonLearnableMoves.find(e => e.eatermon.name === eatermon[eatermonIndex].name);
    const learnableMoves = foundEatermon?.learnableMoves;

    if (!learnableMoves) {
        console.error("No learnable moves found for this eatermon.");
        finalMovesLearned.innerHTML = ``;  // Clear any previous messages
        learnNewMoveText.innerHTML = `No Moves To Learn Right Now!`;   
        forgetButton.style.display = 'none'; 
        noButton.style.display = 'none';    
        setTimeout(() => {
            returnToNormal();
        }, 2000); 
        return;
    }

    // Get the eatermon's current level
    const eatermonLevel = eatermon[eatermonIndex].level;
    console.log(`Eatermon's current level: ${eatermonLevel}`);

    // Log the available moves for the current level
    console.log(`Available moves at level ${eatermonLevel}:`, learnableMoves[eatermonLevel]);

    // Ensure the learnableMoves array has enough levels
    if (!learnableMoves[eatermonLevel] || learnableMoves[eatermonLevel].length === 0) {
        console.log(`${eatermon[eatermonIndex].name} has no available moves to learn at level ${eatermonLevel}.`);
        finalMovesLearned.innerHTML = ``;  // Clear any previous messages
        learnNewMoveText.innerHTML = `No Moves To Learn Right Now!`;
        forgetButton.style.display = 'none';          
        noButton.style.display = 'none'; 
        setTimeout(() => {
            returnToNormal();
        }, 2000); 
        return;
    }

    const availableMovesAtLevel = learnableMoves[eatermonLevel];
    console.log(`Moves at level ${eatermonLevel}:`, availableMovesAtLevel);

    // Find a move that the eatermon doesn't already know
    const newMove = availableMovesAtLevel.find(move =>
        !eatermonMoves[eatermonIndex].moves.some(existingMove => existingMove.name === move.name)
    );

    console.log("New move found:", newMove);  // Debug the value of newMove

    // If no new move is found, handle the case where all moves are already learned
    if (!newMove) {
        console.log("Eatermon already knows all available moves at level", eatermonLevel);
        finalMovesLearned.innerHTML = ``;  // Clear any previous messages
        learnNewMoveText.innerHTML = `No Moves To Learn Right Now!`;   
        forgetButton.style.display = 'none'; 
        noButton.style.display = 'none';    
        setTimeout(() => {
            returnToNormal();
        }, 2000); 
        return;
    }

    // If newMove is valid (has a name), proceed with the move learning process
    if (typeof newMove === 'object' && newMove !== null && newMove.name) {
        console.log("New move details:", newMove);

        finalMovesLearned.innerHTML = ``;  // Clear any previous messages

        // Display the move the eatermon will learn
        const moveHolder = document.getElementById('moveLearnText');
        moveHolder.innerHTML = `${newMove.name}.`;  // Display the move name

        forgetButton.style.display = 'block';  // Make the "Forget Move?" button visible
        noButton.style.display = 'block'; 

        forgetButton.onclick = function() {
            const moveToReplaceIndex = promptForMoveReplacement(eatermonIndex, newMove.name);
            if (moveToReplaceIndex !== null) {
                const oldMove = eatermonMoves[eatermonIndex].moves[moveToReplaceIndex];
                eatermonMoves[eatermonIndex].moves[moveToReplaceIndex] = newMove;
                finalMovesLearned.innerHTML = `${eatermon[eatermonIndex].name} learned ${newMove.name} and replaced ${oldMove.name}!`;

                // Refresh the attack buttons (this might depend on your specific implementation)
                generateAttackButtons();

                // Reset back to normal view after a short delay
                setTimeout(() => {
                    returnToNormal(); 
                }, 2000);
            }
        };
    } else {
        console.error("New move is undefined or missing a name:", newMove);
    }
}



// Prompt the user to choose which move to replace
function promptForMoveReplacement(eatermonIndex, newMove) {
    const eatermonMovesList = eatermonMoves[eatermonIndex].moves;
    const moveNames = eatermonMovesList.map((move, index) => `${index + 1}: ${move.name}`).join('\n');

    // Prompt the user to choose a move to replace
    const moveToReplaceIndex = prompt(`Choose a move to replace:\n${moveNames}`);
    
    // Check if the user made a valid selection
    if (moveToReplaceIndex && !isNaN(moveToReplaceIndex) && moveToReplaceIndex >= 1 && moveToReplaceIndex <= eatermonMovesList.length) {
        const moveIndex = parseInt(moveToReplaceIndex) - 1; // Convert to 0-based index

        // Return the index of the move to replace
        return moveIndex;
    } else {
        console.log("Invalid move selection, no move replaced.");
        return null; // If no valid choice, return null
    }
}

