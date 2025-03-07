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

    // Debugging logs
    console.log(`Attacking with move: ${selectedMove.name}`);
    console.log(`Player Eatermon Type: ${selectedEatermon.type}`);
    console.log(`Enemy Eatermon Type: ${enemyEatermon.type}`);

    // Debug: Check move type and effectiveness
    const moveType = selectedMove.type;
    const typeEffectiveness = getTypeEffectiveness(moveType, enemyType);
    console.log(`Move Type: ${moveType}, Enemy Type: ${enemyType}, Effectiveness: ${typeEffectiveness}`);

    // Check if the move is Fireball
    if (selectedMove.name === "Fireball") {
        triggerFireballAnimation();
    }
    if (selectedMove.name === "Flame Burst") {
        triggerFireStarAnimation();
    }

    let modifiedPower = selectedMove.power;

    // Handle effectiveness
    if (typeEffectiveness === 'strong') {
        console.log("Effectiveness: Strong, doubling power");
        modifiedPower *= 2;  // Double the power if the move is strong
    } else if (typeEffectiveness === 'weak') {
        console.log("Effectiveness: Weak, halving power");
        modifiedPower *= 0.5;  // Halve the power if the move is weak
    } else if (typeEffectiveness === 'noEffect') {
        console.log("Effectiveness: No effect, setting power to 0");
        modifiedPower = 0;  // No effect, set power to 0
    }

    // Check if the move is Fire-type and if the enemy has Heat Resist
    if (moveType === "Fire" && eatermonAbilitys[0].checkAbility(enemyEatermon) && enemyEatermon.type === "Fire") {
        console.log(`${enemyEatermon.name} resists Fire-type damage due to Heat Resist!`);
        modifiedPower = 0; // No damage dealt
    }

    // Apply the modified power to the enemy HP (only if there's damage)
    if (modifiedPower > 0) {
        console.log(`Dealing ${modifiedPower} damage to ${enemyEatermon.name}`);
        enemyEatermon.hp -= modifiedPower;
        enemyEatermon.hp = Math.max(0, enemyEatermon.hp);
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
    } else if (typeEffectiveness === 'noEffect') {
        modifiedPower *= 0;  // Halve the power if the move is weak against the player
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
    console.log(`Checking effectiveness between Attack Type: ${attackType} and Defense Type: ${defenseType}`);
    
    const attackerType = eatermonTypes.find(type => type.type === attackType);
    const defenderType = eatermonTypes.find(type => type.type === defenseType);

    if (!attackerType || !defenderType) {
        console.log(`Invalid types! Returning neutral.`);
        return 'neutral';
    }

    // Check if the attack type has no effect on the defender's type
    if (defenderType.noEffect.includes(attackType)) {
        console.log(`${attackType} has no effect on ${defenderType.type}`);
        return 'noEffect';  // No effect on the target
    }

    // Check if the move type is strong or weak against the defender's type
    if (attackerType.strong.includes(defenderType.type)) {
        console.log(`${attackType} is strong against ${defenderType.type}`);
        return 'strong';  // Attack is strong
    } else if (attackerType.weak.includes(defenderType.type)) {
        console.log(`${attackType} is weak against ${defenderType.type}`);
        return 'weak';    // Attack is weak
    }

    console.log(`${attackType} has a neutral effect on ${defenderType.type}`);
    return 'neutral';  // Neutral effect
}






