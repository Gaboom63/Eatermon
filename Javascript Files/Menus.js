let items = ["Heal Potion"];
let playerParty = [];
let catching  = false; 


function backButton() {
    battleMenuOptions.innerHTML = `
        <button id="attack" onclick="Attack()">Attack!</button> <br>
        <button id="bag" onclick="Bag()">Bag</button> <br>
        <button id="run" onclick="Run()">Run</button> <br>
    `;
}

function clearMenu() {
    battleOptionsMenu.style.innerHTML = ``; 
}

function generateAttackButtons(disableButtons = false) {
    let selectedEatermon = eatermon[currentEatermonIndex];
    let moves = eatermonMoves.find(e => e.eatermon.name === selectedEatermon.name)?.moves;
    console.log(selectedEatermon)
    // Generate attack buttons based on available moves
    let attackButtonsHtml = '';

    if (moves && moves.length >= 4) {
        attackButtonsHtml = `
            <button id="attackButton1" onclick="attackMove(${currentEatermonIndex}, 0)" ${disableButtons ? 'disabled' : ''}>${moves[0].name || 'Attack 1'}</button>
            <button id="attackButton2" onclick="attackMove(${currentEatermonIndex}, 1)" ${disableButtons ? 'disabled' : ''}>${moves[1].name || 'Attack 2'}</button>
            <br><br>
            <button id="attackButton3" onclick="attackMove(${currentEatermonIndex}, 2)" ${disableButtons ? 'disabled' : ''}>${moves[2].name || 'Attack 3'}</button>
            <button id="attackButton4" onclick="attackMove(${currentEatermonIndex}, 3)" ${disableButtons ? 'disabled' : ''}>${moves[3].name || 'Attack 4'}</button>
            <br>
            <button id="backButton" onclick="backButton()" ${disableButtons ? 'disabled' : ''}>Back</button>
        `;
    } else {
        attackButtonsHtml = `
            <button id="attackButton1" onclick="attackMove(${currentEatermonIndex}, 0)" ${disableButtons ? 'disabled' : ''}>Attack 1</button>
            <button id="attackButton2" onclick="attackMove(${currentEatermonIndex}, 1)" ${disableButtons ? 'disabled' : ''}>Attack 2</button>
            <br>
            <button id="attackButton3" onclick="attackMove(${currentEatermonIndex}, 2)" ${disableButtons ? 'disabled' : ''}>Attack 3</button>
            <button id="attackButton4" onclick="attackMove(${currentEatermonIndex}, 3)" ${disableButtons ? 'disabled' : ''}>Attack 4</button>
            <br>
            <button id="backButton" onclick="backButton()" ${disableButtons ? 'disabled' : ''}>Back</button>
        `;
    }

    // Add the generated buttons to the battle menu
    battleMenuOptions.innerHTML = attackButtonsHtml;
}


function Attack() {
    generateAttackButtons();
}

function Bag() {
    battleMenuOptions.innerHTML = `
        <button id="bagItems1">Hp/Restore Items</button>
        <button id="bagItems2" onclick="loadPlates()">Plates</button>
        <br><br>
        <button id="bagItems3">Status Items</button>
        <button id="bagItems4">Battle Items</button>
        <br>
        <button id="bagItemsBack" onclick="backButton()">Back</button>
    `;
}

function Run() {
    if(npcNormal) {
        battleMenuScript.style.display = 'none';
        setTimeout(() => {
            inBattle = false;
        }, 3000);
    } else if(!npcNormal) {
        
    }
}

function loadPlates() {
    battleMenuOptions.innerHTML = `
        <button id="bagItems1" onclick="catchThatMon()">Basic Plate <img src="images/plates/blankPlate.png" id="plateImage"></img></button>
        <br>
        <button id="bagItemsBack" onclick="backButton()">Back</button>
    `;
}

const plates = [{ src: "images/plates/blankPlate.png" }];

function updateEatermonPartyInt() {
    playerParty.push(eatermon[currentEatermonIndex])
}

updateEatermonPartyInt(); 

function catchThatMon() {
    catching = true;
    //console.log("Catching started");
    enemyImg.src = plates[0].src;

    let catchChance = Math.random();

    if (catchChance > 0.5 && !isNpcEatermon) {
        caught = true;
        playerParty.push(eatermon[enemyEatermonIndex]);  // Add the caught Eatermon to the party
        battleText.innerHTML = `${eatermon[enemyEatermonIndex].name} has been added to your party!`;

        console.log("Player's Party after catching:", playerParty);  // Verify the catch

    } else if(isNpcEatermon === true) {
        caught = false;
        battleText.innerHTML = "You Can't Catch Another Persons Eatermon!";
    }   else {
        caught = false;
        battleText.innerHTML = "The capture attempt failed.";
    }

    setTimeout(() => {
        catching = false;
        //console.log("Catching reset");
    }, 1000);
}

function showSwitchMenu() {
    let switchMenuText = "Select a new Eatermon to switch in battle:\n";

    // Display all the eatermons in the player's party
    playerParty.forEach((eatermon, index) => {
        switchMenuText += `${index + 1}. ${eatermon.name} (ID: ${eatermon.id})\n`;
    });

    switchMenuText += `Enter the number of the Eatermon you want to switch to (by its position):`;

    // Get player input
    let playerChoice = parseInt(prompt(switchMenuText));
    console.log("Player choice input:", playerChoice);  // Debugging the player input

    // Check if the player input is within a valid range
    if (playerChoice >= 1 && playerChoice <= playerParty.length) {
        console.log("Valid player choice:", playerChoice);  // Debugging valid range check

        // Access the selected Eatermon from the player's party
        let selectedEatermon = playerParty[playerChoice - 1];  // Adjust to 0-based index
        console.log("Selected Eatermon from playerParty:", selectedEatermon);  // Debugging selected Eatermon

        let selectedEatermonId = selectedEatermon.id;
        console.log("Selected Eatermon ID:", selectedEatermonId);  // Debugging the selected Eatermon ID

        // Update currentEatermonIndex based on the selected Eatermon's position in the party array
        currentEatermonIndex = playerParty.findIndex(eatermon => eatermon.id === selectedEatermonId);
        console.log("Updated currentEatermonIndex:", currentEatermonIndex);  // Debugging currentEatermonIndex update

        // Update the currentEatermon ID
        currentEatermonId = selectedEatermonId;
        currentEatermonIndex = selectedEatermonId;
        console.log("Updated currentEatermonId:", currentEatermonId);  // Debugging currentEatermonId update

        // Update the battle text with the new Eatermon's name and ID
        battleText.innerHTML = `Switched to ${selectedEatermon.name} (ID: ${selectedEatermon.id})`;
        console.log("Battle text updated:", battleText.innerHTML);  // Debugging battle text update

        // Update the sprite (if applicable)
        generateAttackButtons();  // This should now reflect the new currentEatermonIndex
        console.log("Attack buttons regenerated for the correct Eatermon.");  // Debugging attack button regeneration
        console.log(eatermon[currentEatermonIndex])
    } else {
        battleText.innerHTML = "Invalid choice, no switch made.";
        console.log("Invalid choice made, no switch performed.");
    }
}




function showResultsOfMenuBag() {
    let bag = document.getElementById('escapeMenu');
    bag.innerHTML = `
        <h1>Bag Contents</h1>
        <br>
        <button class="menu-btn" onclick="showParty()">Your Party</button>
        <br>
        <button class="menu-btn" onclick="restoreItemsMenu()">Restore Items</button>
        <button class="menu-btn" id="bagItemsBack" onclick="backEsacpe()">Back</button>
    `;
}

function restoreItemsMenu() {
    let bag = document.getElementById('escapeMenu');
    
    let healingItemsHTML = items.filter(item => item.includes('Potion')).map((item, index) => {
        return `<button id="restoreItem${index}" onclick="useRestoreItem(${index})">${item}</button><br>`;
    }).join('');

    let statusItemsHTML = items.filter(item => item.includes('Antidote')).map((item, index) => {
        return `<button id="statusItem${index}" onclick="useStatusItem(${index})">${item}</button><br>`;
    }).join('');

    bag.innerHTML = `
        <h1>Restore Items</h1>
        <h2>Healing Items</h2>
        ${healingItemsHTML}
        <h2>Status Items</h2>
        ${statusItemsHTML}
        <button class="menu-btn" id="bagItemsBack" onclick="backEsacpe()">Back</button>
    `;
}

function useRestoreItem(index) {
    let selectedItem = items[index];
    let selectedEatermon = eatermon[currentEatermonIndex];

    if (selectedItem === 'Heal Potion') {
        selectedEatermon.hp = Math.min(selectedEatermon.maxHp, selectedEatermon.hp + 20);
        //console.log(`${selectedEatermon.name} healed for 20 HP!`);
        battleText.innerHTML = `${selectedEatermon.name} healed for 20 HP!`;
    }

    items.splice(index, 1);  // Remove the item after use
    restoreItemsMenu(); // Refresh the restore items menu
    updateHp();
    restorePlayerHp()
}

function useStatusItem(index) {
    let selectedItem = items[index];
    let selectedEatermon = playerParty[currentEatermonIndex];

    if (selectedItem === 'Antidote') {
        selectedEatermon.status = selectedEatermon.status === 'Poisoned' ? '' : selectedEatermon.status;
        //console.log(`${selectedEatermon.name} has been cured of poison!`);
        battleText.innerHTML = `${selectedEatermon.name} has been cured of poison!`;
    }

    items.splice(index, 1);  // Remove the item after use
    restoreItemsMenu(); // Refresh the restore items menu
}

function collectItem(item) {
    items.push(item);
    //console.log(`${item} added to your bag.`);
    battleText.innerHTML = `${item} added to your bag.`;
}

function showParty() {
    let bag = document.getElementById('escapeMenu');
    bag.innerHTML = `
        <h1>Your Eatermon Party</h1>
        <br>
        ${playerParty.map((eatermon, index) => `${index + 1}. ${eatermon.name}`).join('<br>')}
        <br>
        <button onclick="showSwitchMenu()">Switch Eatermon</button>
        <button class="menu-btn" id="bagItemsBack" onclick="backEsacpe()">Back</button>
    `;
}

function backEsacpe() {
    let escape = document.getElementById('escapeMenu');
    escape.innerHTML = `
        <div class="menu-header">
            <h2>Game Menu</h2>
        </div>
        <div class="menu-options" id="menu-options">
            <button class="menu-btn" onclick="closeEscapeMenu()"><span class="icon">&#x2190;</span> Return to Game</button>
            <button class="menu-btn" id="menuBag" onclick="showResultsOfMenuBag()"><span class="icon">&#x01F4BC;</span> Bag</button>
            <button class="menu-btn"><span class="icon">&#x1F3A5;</span> Settings</button>
            <button class="menu-btn"><span class="icon">&#x1F6AB;</span> Quit Game</button>
        </div>
   `;
}

function openEscapeMenu() {
    const escapeMenu = document.getElementById('escapeMenu');
    escapeMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEscapeMenu() {
    const escapeMenu = document.getElementById('escapeMenu');
    escapeMenu.classList.remove('active');
    document.body.style.overflow = 'hidden';
}



function battleNPC() {
    
}