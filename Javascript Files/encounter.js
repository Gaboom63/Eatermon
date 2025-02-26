let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
let currentEatermonIndex = 1; // Default to Tomadoodle, you can dynamically change this based on the encounter
let enemyEatermonIndex = 0; // Default to Woodle as the enemy
let battleText = document.getElementById('battleTextContainer'); 


function encounter() {
    let pickNum = Math.random() * (500 - 1) + 1;

    // Loop through all grass patches to check for encounter
    for (let i = 0; i < grass.length; i++) {
        const currentGrass = grass[i];

        // Check if the player is on top of the current grass patch
        if (
            player.x >= currentGrass.x &&
            player.x <= currentGrass.x + currentGrass.width &&
            player.y >= currentGrass.y && // Player's y must be at or above the grass patch
            player.y <= currentGrass.y + currentGrass.height && // Player's y must be within the vertical bounds of the grass
            !hasEncounted
        ) {
            consolep.innerHTML = `${pickNum}`;
            break; // Exit the loop if an encounter is found
        }
    }

    // Random chance for a battle encounter
    if (pickNum < 5 && !hasEncounted) {
        hasEncounted = true;
        consolep.innerHTML = `Battle Time!`;
        battleMenuScript.style.display = 'block';
    }
}

function generateAttackButtons() {
    let selectedEatermon = eatermon[currentEatermonIndex];
    let moves = eatermonMoves.find(e => e.eatermon.name === selectedEatermon.name)?.moves;

    if (moves && moves.length >= 4) {
        battleMenuOptions.innerHTML =
            `
            <button id="attackButton1" onclick="attackMove(${currentEatermonIndex}, 0)">${moves[0].name || 'Attack 1'}</button>
            <button id="attackButton2" onclick="attackMove(${currentEatermonIndex}, 1)">${moves[1].name || 'Attack 2'}</button>
            <br>
            <br>
            <button id="attackButton3" onclick="attackMove(${currentEatermonIndex}, 2)">${moves[2].name || 'Attack 3'}</button>
            <button id="attackButton4" onclick="attackMove(${currentEatermonIndex}, 3)">${moves[3].name || 'Attack 4'}</button>
            <br>
            <button id="backButton" onclick="backButton()">Back</button>
            `;
    } else {
        // Fallback in case the moves are not available (for example, fewer than 4 moves)
        battleMenuOptions.innerHTML =
            `
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



function attackMove(eatermonIndex, moveIndex) {
        const selectedEatermon = eatermon[eatermonIndex];
        const selectedMove = eatermonMoves[eatermonIndex].moves[moveIndex]; // Get the move dynamically
        let enemyHp = document.getElementById('enemyinnerBar');
        // Apply damage to the opponent's HP (this could be changed to apply to the enemy)
        if (selectedMove.power > 0) {
            // Assuming an enemy eatermon exists and has a `hp` field
            eatermon[enemyEatermonIndex].hp -= selectedMove.power;
            enemyHp.style.width = `${eatermon[enemyEatermonIndex].hp}%`;
        } 
        if (selectedMove.name === "Fireball") {
            triggerFireballAnimation();
        }
        if (selectedMove.name === "Flame Burst") {
            triggerFireStarAnimation();
        }
        if(eatermon[enemyEatermonIndex].hp <= 0) {
            enemyHp.style.width = `0%`;
            setTimeout(() => {
                battleText.innerHTML = `You Won Against ${eatermon[enemyEatermonIndex].name}!`; 
                enemyHp.style.display = `none`; 
            },1000);
        }

    console.log(`${selectedEatermon.name} used ${selectedMove.name}!`);
    console.log(`${selectedEatermon.name}'s HP: ${selectedEatermon.hp}`);
    console.log(`${eatermon[enemyEatermonIndex].name}'s HP: ${eatermon[enemyEatermonIndex].hp}`);
    battleText.innerHTML = `${selectedEatermon.name} used ${selectedMove.name}! <br> <b> ${eatermon[enemyEatermonIndex].name}'s HP:    ${eatermon[currentEatermonIndex].hp} </b>`;

    // After player's move, trigger enemy's move
    setTimeout(() => {
        enemyMove();
    }, 1000); 
}

// Function to simulate the enemy's random move
function enemyMove() {
    const enemyEatermon = eatermon[enemyEatermonIndex];
    const enemyMoves = eatermonMoves[enemyEatermonIndex].moves;
    let playerHp = document.getElementById('playerinnerBar');

    const randomMoveIndex = Math.floor(Math.random() * enemyMoves.length);
    const selectedEnemyMove = enemyMoves[randomMoveIndex];

    if (selectedEnemyMove.name === 'Vine Whip') {
        // Trigger the Vine Whip animation
        triggerVineWhipAnimation();
    }

    if (selectedEnemyMove.power > 0) {
        eatermon[currentEatermonIndex].hp -= selectedEnemyMove.power;
        playerHp.style.width = `${eatermon[enemyEatermonIndex].hp}%`;
    } 
    if(eatermon[enemyEatermonIndex].hp <= 0) {
        playerHp.style.width = `0%`;
        setTimeout(() => {
            playerHp.style.display = `none`; 
        },1000);
    }


    battleText.innerHTML = `${enemyEatermon.name} used ${selectedEnemyMove.name}! <br> <b>${eatermon[currentEatermonIndex].name}'s HP: ${eatermon[currentEatermonIndex].hp}</b>`;
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


function triggerFireballAnimation() {
    const fireball = document.getElementById('fireball');
    const player = document.getElementById('eatermonPlayer');
    const enemy = document.getElementById('eatermonEnemy');

    // Get the player's and enemy's positions
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Calculate the distance from player to enemy in both X and Y directions
    const distanceX = enemyRect.left + enemyRect.width / 2 - (playerRect.left + playerRect.width / 2);
    const distanceY = enemyRect.top + enemyRect.height / 2 - (playerRect.top + playerRect.height / 2);

    // Set the initial position of the fireball at the player's position
    fireball.style.left = `${playerRect.left + playerRect.width / 2 - 25}px`; // Center the fireball horizontally
    fireball.style.top = `${playerRect.top + playerRect.height / 2 - 25}px`;  // Center the fireball vertically

    // Show the fireball
    fireball.style.display = 'block';

    // Variables to track the fireball's movement
    let moveX = 0;
    let moveY = 0;

    // The speed of the fireball's movement
    const speed = 10; // Change this to control how fast the fireball moves

    // Animate the fireball
    const interval = setInterval(() => {
        moveX += distanceX / 50; // Divide distance to get incremental movement
        moveY += distanceY / 50;

        // Apply the new position using transform
        fireball.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // Stop the animation once the fireball reaches the enemy's position
        if (Math.abs(moveX) >= Math.abs(distanceX) && Math.abs(moveY) >= Math.abs(distanceY)) {
            clearInterval(interval);
            // Optionally hide the fireball after animation
            setTimeout(() => {
                fireball.style.display = 'none';
            }, 200);
        }
    }, 20); // Adjust the interval time to control the animation speed
}

function triggerVineWhipAnimation() {
    const vineWhip = document.getElementById('vineWhip');
    const player = document.getElementById('eatermonPlayer');
    const enemy = document.getElementById('eatermonEnemy');

    // Get the player's and enemy's positions
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Calculate the distance between enemy and player
    const distanceX = playerRect.left + playerRect.width / 2 - (enemyRect.left + enemyRect.width / 2);
    const distanceY = playerRect.top + playerRect.height / 2 - (enemyRect.top + enemyRect.height / 2);

    // Set initial position of the vine at the enemy's position
    vineWhip.style.left = `${enemyRect.left + enemyRect.width / 2 - 2}px`;
    vineWhip.style.top = `${enemyRect.top + enemyRect.height / 2 - 2}px`;

    // Set initial height to 0 (vine grows upwards first)
    vineWhip.style.height = '0px';
    vineWhip.style.display = 'block'; // Make the vine visible

    // Initial rotation (vertical direction)
    vineWhip.style.transform = 'rotate(90deg)';
    vineWhip.style.transition = 'none';

    // First grow vertically upwards
    const initialHeight = 150; // Height the vine grows upwards (can adjust)
    vineWhip.style.transition = 'height 0.5s ease-out';
    vineWhip.style.height = `${initialHeight}px`;

    // After the upward growth, animate it falling and growing toward the player
    setTimeout(() => {
        // Calculate the full distance to the player
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Animate the vine falling and growing towards the player
        vineWhip.style.transition = 'height 1s ease-out, left 1s ease-out, top 1s ease-out';
        vineWhip.style.height = `${distance}px`;
        vineWhip.style.left = `${playerRect.left + playerRect.width / 2 - vineWhip.offsetWidth / 2}px`;
        vineWhip.style.top = `${playerRect.top + playerRect.height / 2 - vineWhip.offsetHeight / 2}px`;

        // Shake effect when the vine hits the player
        setTimeout(() => {
            vineWhip.style.animation = 'vineWhipHit 0.5s ease-out';
        }, 1000); // Trigger shake after vine finishes moving

    }, 500); // Wait for the vine to grow upwards first

    // Optionally hide the vine after animation ends
    setTimeout(() => {
        vineWhip.style.display = 'none'; // Hide after the animation ends
    }, 1500); // Adjust the timeout as necessary
}


function triggerFireStarAnimation() {
    const fireball = document.getElementById('firestar');
    const player = document.getElementById('eatermonPlayer');
    const enemy = document.getElementById('eatermonEnemy');

    // Get the player's and enemy's positions
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Calculate the distance from player to enemy in both X and Y directions
    const distanceX = enemyRect.left + enemyRect.width / 2 - (playerRect.left + playerRect.width / 2);
    const distanceY = enemyRect.top + enemyRect.height / 2 - (playerRect.top + playerRect.height / 2);

    // Set the initial position of the fireball at the player's position
    fireball.style.left = `${playerRect.left + playerRect.width / 2 - 25}px`; // Center the fireball horizontally
    fireball.style.top = `${playerRect.top + playerRect.height / 2 - 25}px`;  // Center the fireball vertically

    // Show the fireball
    fireball.style.display = 'block';

    // Variables to track the fireball's movement
    let moveX = 0;
    let moveY = 0;

    // The speed of the fireball's movement
    const speed = 10; // Change this to control how fast the fireball moves

    // Animate the fireball
    const interval = setInterval(() => {
        moveX += distanceX / 50; // Divide distance to get incremental movement
        moveY += distanceY / 50;

        // Apply the new position using transform
        fireball.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // Stop the animation once the fireball reaches the enemy's position
        if (Math.abs(moveX) >= Math.abs(distanceX) && Math.abs(moveY) >= Math.abs(distanceY)) {
            clearInterval(interval);

            // Position the fireball exactly at the enemy's location for the explosion
            fireball.style.left = `${enemyRect.left + enemyRect.width / 2 - 25}px`;  // Center fireball at enemy
            fireball.style.top = `${enemyRect.top + enemyRect.height / 2 - 25}px`;   // Center fireball at enemy

            // Trigger explosion after fireball reaches the enemy
            fireball.style.animation = 'explosion 1s forwards';  // Trigger explosion animation
            
            // Optionally hide the fireball after animation
            setTimeout(() => {
                fireball.style.display = 'none';
                fireball.style.animation = 'none';
            }, 1000);  // Match with the duration of explosion animation
        }
    }, 20); // Adjust the interval time to control the animation speed
}
