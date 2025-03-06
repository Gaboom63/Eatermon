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

// Handle player's attack with type matchups
function attackMove(eatermonIndex, moveIndex) {
    const selectedEatermon = eatermon[eatermonIndex];
    const selectedMove = eatermonMoves[eatermonIndex].moves[moveIndex];
    const enemyEatermon = eatermon[enemyEatermonIndex];
    const enemyType = enemyEatermon.type;

    if (selectedMove.name === "Fireball") {
        triggerFireballAnimation();
    }
    if (selectedMove.name === "Flame Burst") {
        triggerFireStarAnimation();
    }

    let modifiedPower = selectedMove.power;

    // Check if the move is strong or weak against the enemy type
    const moveType = selectedMove.type;
    const typeEffectiveness = getTypeEffectiveness(moveType, enemyType);

    // Modify the power based on the type effectiveness
    if (typeEffectiveness === 'strong') {
        modifiedPower *= 2;  // Double the power if the move is strong against the enemy
    } else if (typeEffectiveness === 'weak') {
        modifiedPower *= 0.5;  // Halve the power if the move is weak against the enemy
    }

    // Check if the move is Fire-type and if the enemy has Heat Resist
    if (moveType === "Fire" && eatermonAbilitys[0].checkAbility(enemyEatermon) && enemyEatermon.type === "Fire") {
        console.log(`${enemyEatermon.name} resists Fire-type damage due to Heat Resist!`);
        modifiedPower = 0; // No damage dealt
    }

    // Apply the modified power to the enemy HP
    if (modifiedPower > 0) {
        enemyEatermon.hp -= modifiedPower;
        enemyEatermon.hp = Math.max(0, enemyEatermon.hp);  // Ensure HP doesn't go below 0
        enemyHpInner.style.width = `${(enemyEatermon.hp / enemyEatermon.maxHp) * 100}%`;
    }

    // Display the attack results
    battleText.innerHTML = `${selectedEatermon.name} used ${selectedMove.name}! <br><b>${enemyEatermon.name}'s HP: ${enemyEatermon.hp}</b>`;

    // Check if enemy is defeated
    if (enemyEatermon.hp <= 0) {
        enemyHpInner.style.width = `0%`;
        setTimeout(() => {
            battleText.innerHTML = `You Won Against ${enemyEatermon.name}!`;
            enemyHpInner.style.display = `none`;
            setTimeout(() => {
                battleMenuScript.style.display = 'none'; // End the battle
            }, 1000);
        }, 1000);
        setTimeout(() => {
            inBattle = false; // Set battle to false to end the battle
        }, 3000);
    } else if (selectedEatermon.hp <= 0) { // Check if player is dead
        playerHpInner.style.width = `0%`;
        setTimeout(() => {
            battleText.innerHTML = `You Lost Against ${enemyEatermon.name}!`;
            enemyHpInner.style.display = `none`;
            setTimeout(() => {
                battleMenuScript.style.display = 'none'; // End the battle
            }, 1000);
        }, 1000);
        setTimeout(() => {
            inBattle = false;
            console.log("Player has died, exiting battle...");
        }, 3000);
    }

    // Trigger enemy's move after a delay
    if (selectedEatermon.hp > 0) { // Ensure player is still alive before enemy moves
        setTimeout(() => {
            if (enemyEatermon.hp > 0) {
                enemyMove(); // Enemy attacks
            }
        }, 1000);
    }

    updateHp(); // Update HP UI after attack
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
        modifiedPower *= 2;  // Double the power if the move is strong against the player
    } else if (typeEffectiveness === 'weak') {
        modifiedPower *= 0.5;  // Halve the power if the move is weak against the player
    }

    // Check if the move is Fire-type and if the player has Heat Resist
    if (moveType === "Fire" && eatermonAbilitys[0].checkAbility(playerEatermon) && playerEatermon.type === "Fire") {
        console.log(`${playerEatermon.name} resists Fire-type damage due to Heat Resist!`);
        modifiedPower = 0; // No damage dealt
    }

    // Apply the modified power to the player's HP
    if (modifiedPower > 0) {
        playerEatermon.hp -= modifiedPower;
        playerEatermon.hp = Math.max(0, playerEatermon.hp); // Ensure player's HP doesn't go below 0
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
            console.log("Player has died, exiting battle...");
            alert("You Died (Debug So Reloading)");
            location.reload(); 
        }, 3000);
    }

    updateHp(); // Update HP UI after attack

    battleText.innerHTML = `${enemyEatermon.name} used ${selectedEnemyMove.name}! <br><b>${playerEatermon.name}'s HP: ${playerEatermon.hp}</b>`;
}


// Get type effectiveness between two types
function getTypeEffectiveness(attackType, defenseType) {
    // Find the attacker's type and its strengths and weaknesses
    const attackerType = eatermonTypes.find(type => type.type === attackType);
    const defenderType = eatermonTypes.find(type => type.type === defenseType);

    if (!attackerType || !defenderType) {
        return 'neutral'; // If no match, return neutral
    }

    // Check if the defense type is weak or strong against the attack type
    if (attackerType.strong.includes(defenderType.type)) {
        return 'strong';  // Attack is strong
    } else if (attackerType.weak.includes(defenderType.type)) {
        return 'weak';    // Attack is weak
    }

    return 'neutral'; // No effect (neutral)
}

