let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
let currentEatermonIndex = [1]; // Default to Tomadoodle, you can dynamically change this based on the encounter
let enemyEatermonIndex = 4; // Default to Woodle as the enemy
let battleText = document.getElementById('battleTextContainer');
let enemyHP = document.getElementById("enemyHP");
let enemyHpInner = document.getElementById('enemyinnerBar');
let playerHpInner = document.getElementById('playerinnerBar');

// Modified encounter function to trigger coin flip animation
const encounter = () => {
    // Check if the player is on a green square
    const playerTileX = Math.floor(playerX);
    const playerTileY = Math.floor(playerY);

    // Look for green square overlap (event tiles)
    const greenSquare = greenSquares.find(square => square.x === playerTileX && square.y === playerTileY);
    if (greenSquare) {
        let pickNum = Math.random() * (50000 - 1) + 1; // Random number for encounter chance

        // Check if the encounter chance is met and if the player isn't already in a battle
        if (pickNum < 50 && !inBattle) {
            hasEncounted = true;
            inBattle = true;

            // List of encountered Eatermons indexes (could be stored globally or in localStorage if persistent)
            let encounteredEatermons = [];

            // Randomly choose an enemy Eatermon, ensuring it hasn't been encountered before
            do {
                enemyEatermonIndex = Math.floor(Math.random() * eatermon.length);
            } while (enemyEatermonIndex === currentEatermonIndex || encounteredEatermons.includes(enemyEatermonIndex));

            // Add the enemy Eatermon index to the list of encountered Eatermons
            encounteredEatermons.push(enemyEatermonIndex);

            // Initialize the battle state
            restoreEnemyHp();
            updateHp();

            // Trigger the coin flip animation and set up the emblem
            loadingImagess(); // Load the emblems before starting the animation
            startBattleAnimation(); // Trigger the battle animation

            battleMenuScript.style.display = 'block'; // Show battle menu
        }
    }
};




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
    //console.log("Player Emblem:", playerEmblem);
    //console.log("Enemy Emblem:", enemyEmblem);

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
