let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
let currentEatermonIndex = 1; // Default to Tomadoodle, you can dynamically change this based on the encounter
let enemyEatermonIndex = 0; // Default to Woodle as the enemy
let battleText = document.getElementById('battleTextContainer');
let enemyHP = document.getElementById("enemyHP");
let enemyHpInner = document.getElementById('enemyinnerBar');

// Restore enemy HP at the beginning of battle
function restoreEnemyHp() {
    if (hasEncounted) {
        eatermon[enemyEatermonIndex].hp = eatermon[enemyEatermonIndex].maxHp;
        enemyHpInner.style.display = 'block';
        enemyHpInner.style.width = `${eatermon[enemyEatermonIndex].maxHp}%`;
    }
}

// Handle encounters when the player enters certain areas
function encounter() {
    // For each grass area, check if player is inside
    for (let i = 0; i < grass.length; i++) {
        let pickNum = Math.random() * (10000 - 1) + 1;
        const currentGrass = grass[i];

        if (
            player.x >= currentGrass.x &&  // Player's left edge is to the right of grass left edge
            player.x + player.width <= currentGrass.x + currentGrass.width && // Player's right edge is to the left of grass right edge
            player.y >= currentGrass.y &&  // Player's top edge is below grass top edge
            player.y + player.height <= currentGrass.y + currentGrass.height &&  // Player's bottom edge is above grass bottom edge
            pickNum < 50 && !inBattle // 10% encounter chance
        ) {
            consolep.innerHTML = `Hello: ${pickNum}`;
            hasEncounted = true;
            inBattle = true;
            break; // If we encounter, exit the loop
        }
    }

    if (inBattle) {  // If an encounter happened, proceed to battle
        // Select a random enemy Eatermon
        do {
            enemyEatermonIndex = Math.floor(Math.random() * eatermon.length);
        } while (enemyEatermonIndex === currentEatermonIndex); // Ensure it's not the same as the player's

        consolep.innerHTML = `Battle Time! You encountered a ${eatermon[enemyEatermonIndex].name}!`;
        
        // Initialize the battle
        restoreEnemyHp(); // Restore enemy HP to max
        updateHp(); // Update HP UI
        battleMenuScript.style.display = 'block'; // Show battle menu
    }
}

// Generate attack buttons based on the player's moves
function generateAttackButtons() {
    let selectedEatermon = eatermon[currentEatermonIndex];
    let moves = eatermonMoves.find(e => e.eatermon.name === selectedEatermon.name)?.moves;

    if (moves && moves.length >= 4) {
        battleMenuOptions.innerHTML = `
            <button id="attackButton1" onclick="attackMove(${currentEatermonIndex}, 0)">${moves[0].name || 'Attack 1'}</button>
            <button id="attackButton2" onclick="attackMove(${currentEatermonIndex}, 1)">${moves[1].name || 'Attack 2'}</button>
            <br><br>
            <button id="attackButton3" onclick="attackMove(${currentEatermonIndex}, 2)">${moves[2].name || 'Attack 3'}</button>
            <button id="attackButton4" onclick="attackMove(${currentEatermonIndex}, 3)">${moves[3].name || 'Attack 4'}</button>
            <br>
            <button id="backButton" onclick="backButton()">Back</button>
        `;
    } else {
        // Fallback in case the moves are not available (for example, fewer than 4 moves)
        battleMenuOptions.innerHTML = `
            <button id="attackButton1" onclick="attackMove(${currentEatermonIndex}, 0)">Attack 1</button>
            <button id="attackButton2" onclick="attackMove(${currentEatermonIndex}, 1)">Attack 2</button>
            <br>
            <button id="attackButton3" onclick="attackMove(${currentEatermonIndex}, 2)">Attack 3</button>
            <button id="attackButton4" onclick="attackMove(${currentEatermonIndex}, 3)">Attack 4</button>
            <br>
            <button id="backButton" onclick="backButton()">Back</button>
        `;
    }
}

// Update HP display
function updateHp() {
    let enemyHpText = document.getElementById('enemyHP');
    let playerHpText = document.getElementById('playerHP');
    enemyHpText.innerHTML = `<b>${eatermon[enemyEatermonIndex].name}'s HP: ${eatermon[enemyEatermonIndex].hp} / ${eatermon[enemyEatermonIndex].maxHp}</b>`;
    playerHpText.innerHTML = `<b>${eatermon[currentEatermonIndex].name}'s HP: ${eatermon[currentEatermonIndex].hp} / ${eatermon[currentEatermonIndex].maxHp}</b>`;
}

// Handle player's attack with type matchups
// Handle player's attack with type matchups
function attackMove(eatermonIndex, moveIndex) {
    const selectedEatermon = eatermon[eatermonIndex];
    const selectedMove = eatermonMoves[eatermonIndex].moves[moveIndex];
    const enemyEatermon = eatermon[enemyEatermonIndex];
    const enemyType = enemyEatermon.type;

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

    // Apply the modified power to the enemy HP
    if (modifiedPower > 0) {
        enemyEatermon.hp -= modifiedPower;
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
            inBattle = false;
        }, 3000);
    }

    // Trigger enemy's move after a delay
    setTimeout(() => {
        if (enemyEatermon.hp > 0) {
            enemyMove(); // Enemy attacks
        }
    }, 1000);

    updateHp(); // Update HP UI after attack
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


// Simulate enemy's random move
// Simulate enemy's random move with type matchups
function enemyMove() {
    const enemyEatermon = eatermon[enemyEatermonIndex];
    const enemyMoves = eatermonMoves[enemyEatermonIndex].moves;
    const selectedEnemyMove = enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
    const playerEatermon = eatermon[currentEatermonIndex];
    const playerType = playerEatermon.type;

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

    // Apply the modified power to the player's HP
    if (modifiedPower > 0) {
        playerEatermon.hp -= modifiedPower;
        const playerHpInner = document.getElementById('playerinnerBar');
        playerHpInner.style.width = `${(playerEatermon.hp / playerEatermon.maxHp) * 100}%`;
    }

    // Check if player is defeated
    if (playerEatermon.hp <= 0) {
        const playerHpInner = document.getElementById('playerinnerBar');
        playerHpInner.style.width = `0%`;
        setTimeout(() => {
            playerHpInner.style.display = `none`;
        }, 1000);
    }

    updateHp(); // Update HP UI after attack

    battleText.innerHTML = `${enemyEatermon.name} used ${selectedEnemyMove.name}! <br><b>${playerEatermon.name}'s HP: ${playerEatermon.hp}</b>`;
}


function backButton() {
    battleMenuOptions.innerHTML = `
      <button id="attack" onclick="Attack()">Attack!</button> <br>
      <button id="bag" onclick="Bag()">Bag</button> <br>
      <button id="run" onclick="Run()">Run</button> <br>
    `;
}

function Attack() {
    generateAttackButtons();
}

function Run() {
    battleMenuScript.style.display = 'none'; // Hide battle menu to run away
    setTimeout(() => {
        inBattle = false;
    }, 3000);
}
