const enemyImg = document.getElementById("eatermonEnemy");
const playerImg = document.getElementById("eatermonPlayer");
const emblem = document.getElementById("emblem");
const enemyEmblem = document.getElementById("enemyEmblem");
let eatermonXpText = document.getElementById('xpText');
let eatermonXpLevel = document.getElementById('xpLevel');
let eatermonXpInnerBar = document.getElementById('xpProgress');
let eatermonLevelUpText = document.getElementById('h1Text'); 
let eatermonPtext = document.getElementById('Ptext'); 
let levelDiv = document.getElementById("textContainer");
let learnNewMoveText = document.getElementById('moveLearnText');
let normal = true; 


const eatermon = [
    {
        type: eatermonTypes[8].type,
        id: 0,
        name: "Woodle",
        hp: 90,
        maxHp: 90,
        attack: eatermonStats[0].attack,
        defense: eatermonStats[0].defense,
        speed: eatermonStats[0].speed,
        evasiveness: eatermonStats[0].evasiveness,
        xp: eatermonExp[0].xp,
        maxXp: 100,
        // deathXp: eatermonStats[0].level^3/5,
        level: eatermonExp[0].level,
        src: "images/woodle.png",
        emblem: "images/emblems/grassEmblem.png",
        canFlee: false
    },
    {
        type: eatermonTypes[0].type,
        id: 1,
        name: "Tomadoodle",
        hp: 100,
        maxHp: 100,
        attack: eatermonStats[1].attack,
        defense: eatermonStats[1].defense,
        speed: eatermonStats[1].speed,
        evasiveness: eatermonStats[1].evasiveness,
        level: eatermonExp[1].level,
        xp: eatermonExp[1].xp,
        maxXp: eatermonExp[1].maxXp,
        src: "images/tomadoodle.png",
        emblem: "images/emblems/fireEmblem.png",
        canFlee: false
    },
    {
        type: eatermonTypes[1].type,
        id: 2,
        name: "Druewl",
        hp: 105,
        maxHp: 105,
        attack: eatermonStats[2].attack,
        defense: eatermonStats[2].defense,
        speed: eatermonStats[2].speed,
        evasiveness: eatermonStats[2].evasiveness,
        xp: eatermonExp[2].xp,
        maxXp: eatermonExp[2].maxXp,
        deathXp: eatermonExp[2].level^3/5,
        src: "images/druewl.png",
        emblem: "images/emblems/waterEmblem.png",
        canFlee: false
    },
    {
        type: eatermonTypes[3].type,
        id: 3,
        name: "Flopper",
        hp: 130,
        maxHp: 130,
        attack: eatermonStats[3].attack,
        defense: eatermonStats[3].defense,
        speed: eatermonStats[3].speed,
        evasiveness: eatermonStats[3].evasiveness,
        src: "images/Flopper.png",
        emblem: "images/emblems/iceEmblem.png",
        canFlee: false
    },
    {
        type: eatermonTypes[0].type,
        id: 4,
        name: "Poporlation",
        hp: 120,
        maxHp: 120,
        attack: eatermonStats[4].attack,
        defense: eatermonStats[4].defense,
        speed: eatermonStats[4].speed,
        evasiveness: eatermonStats[4].evasiveness,
        src: "images/Poporlation.png",
        emblem: "images/emblems/fireEmblem.png",
        canFlee: false,
        abilities: ["Heat Resist"],  // Woodle has Heat Resist
    },
    {
        id: 5,
        name: "BagOh",
        hp: 100,
        maxHp: 100,
        attack: eatermonStats[5].attack,
        defense: eatermonStats[5].defense,
        speed: eatermonStats[5].speed,
        evasiveness: eatermonStats[5].evasiveness,
        src: "images/BagOh.png",
        emblem: "images/emblems/normalEmblem.png",
        canFlee: false,
    },
    {
        id: 6,
        name: "Coreange",
        hp: 70,
        maxHp: 70,
        attack: eatermonStats[6].attack,
        defense: eatermonStats[6].defense,
        speed: eatermonStats[6].speed,
        evasiveness: eatermonStats[6].evasiveness,
        src: "images/Coreange.png",
        emblem: "images/emblems/fireEmblem.png",
        canFlee: false,
    },
    {
        id: 7,
        name: "PanCook",
        hp: 90,
        maxHp: 90,
        attack: eatermonStats[7].attack,
        defense: eatermonStats[7].defense,
        speed: eatermonStats[7].speed,
        evasiveness: eatermonStats[7].evasiveness,
        src: "images/PanCoook.png",
        emblem: "images/emblems/fireEmblem.png",
        canFlee: false,
    },
    {
        type: eatermonTypes[8].type,
        id: 8,
        name: "ChrisP",
        hp: 135,
        attack: eatermonStats[8].attack,
        defense: eatermonStats[8].defense,
        speed: eatermonStats[8].speed,
        evasiveness: eatermonStats[8].evasiveness,
        maxHp: 135,
        src: "images/ChrisP.png",
        canFlee: false,
        emblem: "images/emblems/crispEmblem.png",
    },
    {
        type: eatermonTypes[0].type,
        id: 9,
        name: "Protcluker",
        hp: 200,
        maxHp: 200,
        attack: eatermonStats[9].attack,
        defense: eatermonStats[9].defense,
        speed: eatermonStats[9].speed,
        evasiveness: eatermonStats[9].evasiveness,
        src: "images/Protcluker.png",
        canFlee: false,
        emblem: "images/emblems/fireEmblem.png",
    },
]

//console.log(eatermon);


function loadingImages() {

    enemyImg.src = eatermon[enemyEatermonIndex].src;  // Enemy is dynamically selected
    playerImg.src = eatermon[currentEatermonIndex].src; // Player is Tomadoodle
    emblem.src = eatermon[currentEatermonIndex].emblem;
    enemyEmblem.src = eatermon[enemyEatermonIndex].emblem;
}

function updateXpBarDisplay() {

    eatermonXpLevel.innerHTML = `
        Level: ${eatermon[currentEatermonIndex].level}
    `
   
    if (eatermon[currentEatermonIndex].xp >= eatermon[currentEatermonIndex].maxXp) {
        eatermonXpText.innerHTML = `
        XP: ${eatermon[currentEatermonIndex].maxXp} 
        `
    } else {
        eatermonXpText.innerHTML = `
        XP: ${eatermon[currentEatermonIndex].xp} /  ${eatermon[currentEatermonIndex].maxXp} 
        `
    }
    eatermonXpInnerBar.style.width = `${eatermon[currentEatermonIndex].xp}%`
}

updateXpBarDisplay();

function checkIfXpIsFull() {
    if (eatermon[currentEatermonIndex].xp >= eatermon[currentEatermonIndex].maxHp) {
        normal = false;
        
        // Level up logic
        eatermon[currentEatermonIndex].level = eatermon[currentEatermonIndex].level + 1; 
        eatermon[currentEatermonIndex].xp = 0; 
        eatermon[currentEatermonIndex].maxXp = eatermon[currentEatermonIndex].maxXp + eatermon[currentEatermonIndex].maxXp / 5;

        // Show level up UI
        levelDiv.style.display = 'block'; 
        eatermonLevelUpText.innerHTML = `${eatermon[currentEatermonIndex].name} Leveled Up To: ${eatermon[currentEatermonIndex].level}!`;
        eatermonPtext.innerHTML = `${eatermon[currentEatermonIndex].name} Wants To Learn:`;

        // Update the move learning text
        // learnNewMoveText.innerHTML = `You can learn a new move!`;

        // Update the XP bar UI
        handleLearnNewMove(); 
        updateXpBarDisplay(); 

        // Trigger the learning of a new move (if applicable)
        handleLearnNewMove(currentEatermonIndex); // Call to handle move learning after level up
    }
}

function returnToNormal() {
    normal = true; 
    levelDiv.style.display = 'none'; 
    battleMenuScript.style.display = 'none';
}