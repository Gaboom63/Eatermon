let items = []; 
let catching = false; 
let caught = null; 
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

function catchThatMon() {
    enemyImg.src = plates[0].src;
    catching = true; 
   
    if(caught === true) {

    }

    if(caught === false) {
        setTimeout(() => {
            catching = false; 
        }, 1000)    
    }
}