let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
let currentEatermonIndex = 1; // Default to Tomadoodle, you can dynamically change this based on the encounter
let enemyEatermonIndex = 0; // Default to Woodle as the enemy
let battleText = document.getElementById('battleTextContainer'); 
let enemyHP = document.getElementById("enemyHP"); 


function restoreEnemyHp() {
    if(hasEncounted === true) {
        const selectedEatermon = eatermon[eatermonIndex];
 
    }
}

function encounter() {
    for (let i = 0; i < grass.length; i++) {
        let pickNum = Math.random() * (500 - 1) + 1;
        const currentGrass = grass[i];

        if (
            player.x >= currentGrass.x &&  // Player's left edge is to the right of grass left edge
            player.x + player.width <= currentGrass.x + currentGrass.width && // Player's right edge is to the left of grass right edge
            player.y >= currentGrass.y &&  // Player's top edge is below grass top edge
            player.y + player.height <= currentGrass.y + currentGrass.height &&  // Player's bottom edge is above grass bottom edge
            pickNum < 50
           
        )  {
            consolep.innerHTML = `Hello: ${pickNum}`; 
        }
       
    }

    if (hasEncounted === true) {  // Ensure 10% chance here too

        // Select a random enemy Eatermon, ensuring it's not the player's Eatermon
        do {
            enemyEatermonIndex = Math.floor(Math.random() * eatermon.length);
        } while (enemyEatermonIndex === currentEatermonIndex);

        consolep.innerHTML = `Battle Time! You encountered a ${eatermon[enemyEatermonIndex].name}!`;
        
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

function updateHp() {
    let enemyHpText = document.getElementById('enemyHP');
    let playerHpText = document.getElementById('playerHP');
    enemyHpText.innerHTML = `<b> ${eatermon[enemyEatermonIndex].name}'s HP: ${eatermon[enemyEatermonIndex].hp} / ${eatermon[enemyEatermonIndex].maxHp}</b>`;
    playerHpText.innerHTML = `<b> ${eatermon[currentEatermonIndex].name}'s HP: ${eatermon[currentEatermonIndex].hp} / ${eatermon[currentEatermonIndex].maxHp}</b>`;

}


function attackMove(eatermonIndex, moveIndex) {
        const selectedEatermon = eatermon[eatermonIndex];
        const selectedMove = eatermonMoves[eatermonIndex].moves[moveIndex]; // Get the move dynamically
        let enemyHpText = document.getElementById('enemyHP');
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
                setTimeout(() => {
                    battleMenuScript.style.display = 'none';
                },1000)
            },1000);
        }
        

    console.log(`${eatermon[enemyEatermonIndex].name}'s HP: ${eatermon[enemyEatermonIndex].hp}`);
    battleText.innerHTML = `${selectedEatermon.name} used ${selectedMove.name}! <br> <b> ${eatermon[enemyEatermonIndex].name}'s HP:    ${eatermon[currentEatermonIndex].hp} </b>`;
    // After player's move, trigger enemy's move
    setTimeout(() => {
        if(eatermon[enemyEatermonIndex].hp > 0) {
            enemyMove();
        }
    }, 1000); 
    updateHp(); // Update HP UI after attack
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
        playerHp.style.width = `${eatermon[currentEatermonIndex].hp}%`;
    } 
    if(eatermon[currentEatermonIndex].hp <= 0) {
        playerHp.style.width = `0%`;
        setTimeout(() => {
            playerHp.style.display = `none`; 
        },1000);
    }

    updateHp(); // Update HP UI after attack

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



function Run() {
    battleMenuScript.style.display = 'none'
}