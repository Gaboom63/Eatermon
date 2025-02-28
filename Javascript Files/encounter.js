let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
let currentEatermonIndex = 1; // Default to Tomadoodle, you can dynamically change this based on the encounter
let enemyEatermonIndex = 0; // Default to Woodle as the enemy
let battleText = document.getElementById('battleTextContainer');
let enemyHP = document.getElementById("enemyHP");
let enemyHpInner = document.getElementById('enemyinnerBar');
let playerHpInner = document.getElementById('playerinnerBar')

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

