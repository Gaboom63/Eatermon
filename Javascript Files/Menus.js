let items = []; 
let catching = false; 
let caught = true; 
function backButton() {
    battleMenuOptions.innerHTML = `
      <button id="attack" onclick="Attack()">Attack!</button> <br>
      <button id="bag" onclick="Bag()">Bag</button> <br>
      <button id="run" onclick="Run()">Run</button> <br>
    `;
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


function Attack() {
    generateAttackButtons();
}

function Bag() {
    let menuBag = document.getElementById('bag'); 
    battleMenuOptions.innerHTML = `
        <button id="bagItems1">Hp/Restore Items</button>
        <button id="bagItems2" onclick="loadPlates()">Plates</button>
        <br><br>
        <button id="bagItems3">Status Items</button>
        <button id="bagItems4">Battle Items</button>
        <br>
        <button id="bagItemsBack" onclick="backButton()">Back</button>
    `
}

function Run() {
    battleMenuScript.style.display = 'none'; // Hide battle menu to run away
    setTimeout(() => {
        inBattle = false;
    }, 3000);
}

function loadPlates() {
    battleMenuOptions.innerHTML = `
    <button id="bagItems1" onclick="catchThatMon()">Basic Place <img src="images/plates/blankPlate.png" id="plateImage"></img></button>
    <br>
    <button id="bagItemsBack" onclick="backButton()">Back</button>
    `
}

const plates = [
    {
        src: "images/plates/blankPlate.png"
    }
]

let playerParty = [];  // Array to store the player's captured Eatermon
    // // Function to get the starter Eatermon and initialize the party
// function getStarter() {
//     pickStarter = prompt(What Starter Will You Choose?
//     Woodle(1)?
//     Tomadoodle(2)?
//     Druewl(3)?
//     );

//     // Set the currentEatermonIndex based on user input
//     if (pickStarter == 1) {
//         currentEatermonIndex = 0; // Set index for Woodle
//         playerParty.push(eatermon[currentEatermonIndex]);
//     } else if (pickStarter == 2) {
//         currentEatermonIndex = 1; // Set index for Tomadoodle
//     } else if (pickStarter == 3) {
//         currentEatermonIndex = 2; // Set index for Druewl
//     } else {
//         alert(Please Put In A Valid Number!);
//         getStarter(); // Retry if invalid input
//         return; // Exit the function early
//     }

//     // Initialize the player's party with the selected Eatermon (using the index)
//     console.log("Your party has been initialized:");
//     console.log(playerParty); // Show the player's party with the selected starter
// }

// // Call the getStarter function to initialize the party
// getStarter();

playerParty.push(eatermon[currentEatermonIndex]);

// Function to catch the enemy Eatermon and add it to the player's party
// Function to catch the enemy Eatermon and add it to the player's party
function catchThatMon() {
    enemyImg.src = plates[0].src; // Show the plate image
    catching = true; // Start the catching process
    
    // Simulate a catch success rate (you can adjust this value)
    let catchChance = Math.random(); // Random number between 0 and 1

    // If the catch chance is higher than a threshold (let's say 0.5 for 50%)
    if (catchChance > 0.5) {
        caught = true;
        playerParty.push(eatermon[enemyEatermonIndex]); // Add the captured Eatermon to the player's party
        console.log(`${eatermon[enemyEatermonIndex].name} has been caught and added to your party!`);
        console.log(playerParty); // Show the player's party after catching
        
        battleText.innerHTML = `${eatermon[enemyEatermonIndex].name} has been added to your party!`;
    } else {
        caught = false;
        console.log("The capture attempt failed.");
        battleText.innerHTML = "The capture attempt failed.";
    }

    // Reset catching after a brief moment
    setTimeout(() => {
        catching = false;
    }, 1000);
}

// Function to show the switch menu and switch between Eatermon
function showSwitchMenu() {
    let switchMenuText = "Select a new Eatermon to switch in battle:\n";
    
    // Loop through the player's party and create a list of options
    playerParty.forEach((eatermon, index) => {
        switchMenuText += `${index + 1}. ${eatermon.name}\n`;
    });

    switchMenuText += `Enter the number of the Eatermon you want to switch to:`;
    
    // Simulating a switch menu using prompt for simplicity
    let playerChoice = parseInt(prompt(switchMenuText));

    // Check if the choice is valid
    if (playerChoice >= 1 && playerChoice <= playerParty.length) {
        currentEatermonIndex = playerChoice - 1; // Update the current Eatermon index
        console.log(`Switched to ${playerParty[currentEatermonIndex].name}`);
        battleText.innerHTML = `Switched to ${playerParty[currentEatermonIndex].name}`;
    } else {
        console.log("Invalid choice, no switch made.");
        battleText.innerHTML = "Invalid choice, no switch made.";
    }
}

// Function to show the player's party in the bag
function showResultsOfMenuBag() {
    let bag = document.getElementById('escapeMenu');
    bag.innerHTML = `
    <h1>Your Eatermon Party</h1>
    <br>
    ${playerParty.map((eatermon, index) => `${index + 1}. ${eatermon.name}`).join('<br>')}
    <br>
    <button onclick="showSwitchMenu()">Switch Eatermon</button> <!-- Button to switch Eatermon -->
    <button id="bagItemsBack" onclick="backEsacpe()">Back</button>
    `;
}

// Switches back to the game menu
function backEsacpe() {
    let escape = document.getElementById('escapeMenu');
    escape.innerHTML = `
     <div class="menu-header">
            <h2>Game Menu</h2>
        </div>
        <div class="menu-options" id="menu-options">
            <button class="menu-btn" onclick="closeMenu()"><span class="icon">&#x2190;</span> Return to Game</button>
            <button class="menu-btn" id="menuBag" onclick="showResultsOfMenuBag()"><span class="icon">&#x01F4BC;</span> Bag</button>
            <button class="menu-btn"><span class="icon">&#x1F3A5;</span> Settings</button>
            <button class="menu-btn""><span class="icon">&#x1F6AB;</span> Quit Game</button>
        </div>
   `;
}
