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
    battleMenuScript.style.display = 'none';
    setTimeout(() => {
        inBattle = false;
    }, 3000);
}

function loadPlates() {
    battleMenuOptions.innerHTML = `
        <button id="bagItems1" onclick="catchThatMon()">Basic Plate <img src="images/plates/blankPlate.png" id="plateImage"></img></button>
        <br>
        <button id="bagItemsBack" onclick="backButton()">Back</button>
    `;
}

const plates = [{ src: "images/plates/blankPlate.png" }];

function catchThatMon() {
    catching = true;
    //console.log("Catching started");
    enemyImg.src = plates[0].src;

    let catchChance = Math.random();

    if (catchChance > 0.5) {
        caught = true;
        playerParty.push(eatermon[enemyEatermonIndex]);
        //console.log(`${eatermon[enemyEatermonIndex].name} has been caught!`);
        battleText.innerHTML = `${eatermon[enemyEatermonIndex].name} has been added to your party!`;
    } else {
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

    playerParty.forEach((eatermon, index) => {
        switchMenuText += `${index + 1}. ${eatermon.name}\n`;
    });

    switchMenuText += `Enter the number of the Eatermon you want to switch to:`;

    let playerChoice = parseInt(prompt(switchMenuText));

    if (playerChoice >= 1 && playerChoice <= playerParty.length) {
        currentEatermonIndex = playerChoice - 1;
        //console.log(`Switched to ${playerParty[currentEatermonIndex].name}`);
        battleText.innerHTML = `Switched to ${playerParty[currentEatermonIndex].name}`;
    } else {
        //console.log("Invalid choice, no switch made.");
        battleText.innerHTML = "Invalid choice, no switch made.";
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
    document.body.style.overflow = 'auto';
}
