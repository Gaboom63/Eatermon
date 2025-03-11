let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
let currentEatermonIndex = [1]; // Default to Tomadoodle, you can dynamically change this based on the encounter
let enemyEatermonIndex = 8; // Default to Woodle as the enemy
let battleText = document.getElementById('battleTextContainer');
let enemyHP = document.getElementById("enemyHP");
let enemyHpInner = document.getElementById('enemyinnerBar');
let playerHpInner = document.getElementById('playerinnerBar');

// Modified encounter function to trigger coin flip animation
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
            // consolep.innerHTML = `Hello: ${pickNum}`;
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

        // consolep.innerHTML = `Battle Time! You encountered a ${eatermon[enemyEatermonIndex].name}!`;

        // Initialize the battle
        restoreEnemyHp(); // Restore enemy HP to max
        updateHp(); // Update HP UI
        // Trigger the coin flip animation and set up the emblem
        loadingImagess(); // Load the emblems before starting the animation
        startBattleAnimation(); // Trigger the battle animation
        battleMenuScript.style.display = 'block'; // Show battle menu
    }
}

// Function to dynamically set the images of the coin sides (Player and Enemy)
function loadingImagess() {
    // Get the emblem for both the player and the enemy from the eatermon object
    const playerEmblem = eatermon[currentEatermonIndex].emblem; // Player emblem (background image for side-a)
    const enemyEmblem = eatermon[enemyEatermonIndex].emblem;   // Enemy emblem (background image for side-b)

    // Select the coin sides for both player and enemy
    const sideAPlayer = document.querySelector('#coinPlayer .side-a');
    const sideBPlayer = document.querySelector('#coinPlayer .side-b');

    const sideAEnemy = document.querySelector('#coinEnemy .side-a');
    const sideBEnemy = document.querySelector('#coinEnemy .side-b');

    // Debugging to check if images are being set
    console.log("Player Emblem:", playerEmblem);
    console.log("Enemy Emblem:", enemyEmblem);

    // Check if the elements exist
    if (sideAPlayer && sideBPlayer && sideAEnemy && sideBEnemy) {
        // Set the player coin's sides (use player and enemy emblems)
        sideAPlayer.style.backgroundImage = `url('${enemyEmblem}')`;  // Player emblem on side-a (front side)
        sideBPlayer.style.backgroundImage = `url('${playerEmblem}')`;   // Enemy emblem on side-b (back side)

        // Set the enemy coin's sides (use enemy and player emblems)
        sideAEnemy.style.backgroundImage = `url('${playerEmblem}')`;   // Enemy emblem on side-a (front side)
        sideBEnemy.style.backgroundImage = `url('${enemyEmblem}')`;   // Player emblem on side-b (back side)
    } else {
        console.error("Coin side elements not found!");
    }
}

// Function to trigger the coin flip animation and emblem display for both coins
function startBattleAnimation() {
    const coinPlayer = document.getElementById('coinPlayer');
    const coinEnemy = document.getElementById('coinEnemy');

    // Show both coins and apply the animations at the same time
    coinPlayer.style.opacity = '1';
    coinEnemy.style.opacity = '1';

    coinPlayer.style.animation = 'coinAppear 1.5s ease-out forwards';
    coinEnemy.style.animation = 'coinAppear 1.5s ease-out forwards';

    // Randomly decide whether each coin lands heads or tails
    const flipSidePlayer = Math.random() < 0.5 ? 'heads' : 'tails';
    const flipSideEnemy = Math.random() < 0.5 ? 'heads' : 'tails';

    coinPlayer.classList.add(flipSidePlayer);
    coinEnemy.classList.add(flipSideEnemy);

    // After the coin flip animations end, start the shrinking and fading
    coinPlayer.addEventListener('animationend', () => {
        coinPlayer.style.animation = 'shrinkCoin 1.5s ease-out forwards';
        coinPlayer.style.opacity = '0';
    });
    coinEnemy.addEventListener('animationend', () => {
        coinEnemy.style.animation = 'shrinkCoin 1.5s ease-out forwards';
        coinEnemy.style.opacity = '0';
    });

    // After coins finish shrinking, show emblems
    setTimeout(() => {
        showEmblems();
        battleMenuOptions.style.display = 'block';
    }, 2000); // Match this time to the coin shrinking duration
}

// Show player and enemy emblems with a subtle reveal animation
function showEmblems() {
    const playerEmblem = document.getElementById('emblem');
    const enemyEmblem = document.getElementById('enemyEmblem');

    playerEmblem.classList.add("show");
    enemyEmblem.classList.add("show");
}
