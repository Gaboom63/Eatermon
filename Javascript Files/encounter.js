
let consolep = document.getElementById('console');
let hasEncounted = false;
let battleMenuScript = document.getElementById('battleMenu');
let battleMenuOptions = document.getElementById('battleOptionsMenu');
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

        // setTimeout(() => {
        //     hasEncounted = false;
        // }, 3000);
    }


}

function Attack() {
    let battleMenuAttack = document.getElementById('attack');
    let battleMenuOptions = document.getElementById('battleOptionsMenu');  // Make sure the container ID is correct.

    // Ensure we have a valid target 'eatermon'. For this example, let's use `eatermon[1]` (Tomadoodle)
    let selectedEatermon = eatermon[1]; // You can dynamically change this based on your logic

    // Access the selected eatermon's moves from the `eatermonMoves` array
    let moves = eatermonMoves.find(e => e.eatermon.name === selectedEatermon.name)?.moves;

    // If moves are not found, fall back to default buttons
    if (moves && moves.length >= 4) {
        battleMenuOptions.innerHTML =
            `
            <button id="attackButton1">${moves[0].name || 'Attack 1'}</button>
            <button id="attackButton2">${moves[1].name || 'Attack 2'}</button>
            <br>
            <br>
            <button id="attackButton3">${moves[2].name || 'Attack 3'}</button>
            <button id="attackButton4">${moves[3].name || 'Attack 4'}</button>
            <br>
            <button id="backButton" onclick="backButton()">Back</button>
            `;
    } else {
        // Fallback in case the moves are not available (for example, fewer than 4 moves)
        battleMenuOptions.innerHTML =
            `
            <button id="attackButton1">Attack 1</button>
            <button id="attackButton2">Attack 2</button>
            <br>
            <button id="attackButton3">Attack 3</button>
            <button id="attackButton4">Attack 4</button>
            <br>
            <button id="backButton" onclick="backButton()">Back</button>
            `;
    }
}

function Bag() {
    let battleMenuBag = document.getElementById('bag');
    console.log('Bag button clicked');


}
function Run() {
    let battleMenuRun = document.getElementById('run');
    console.log('Run button clicked');
    battleMenuScript.style.display = 'none';


}

function backButton() {
    battleMenuOptions.innerHTML = `
      <button id="attack" onclick="Attack()">Attack!</button> <br>
            <button id="bag" onclick="Bag()">Bag</button> <br>
            <button id="run" onclick="Run()">Run</button> <br>
    `
}