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
let levelUpMenu = false;
let moveTextButton = document.getElementById('moveText');
let moveTextNoButton = document.getElementById('moveTextNo');
let battleOptionsMenu = document.getElementById('battleOptionsMenu');

const eatermon = [
    {
        type: eatermonTypes[2].type,
        id: 0,
        name: "Woodle",
        hp: 90,
        maxHp: 90,
        attack: eatermonStats[0].attack,
        defense: eatermonStats[0].defense,
        speed: eatermonStats[0].speed,
        xp: eatermonExp[0].xp,
        maxXp: 100,
        level: eatermonExp[0].level,
        src: "images/Eatermons/woodle.png",
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
        level: eatermonExp[1].level,
        xp: eatermonExp[1].xp,
        maxXp: eatermonExp[1].maxXp,
        src: "images/Eatermons/tomadoodle.png",
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
        xp: eatermonExp[2].xp,
        maxXp: eatermonExp[2].maxXp,
        level: eatermonExp[2].level,
        src: "images/Eatermons/druewl.png",
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
        level: eatermonExp[3].level,
        src: "images/Eatermons/Flopper.png",
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
        level: eatermonExp[4].level,
        src: "images/Eatermons/Poporlation.png",
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
        level: eatermonExp[5].level,
        src: "images/Eatermons/BagOh.png",
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
        level: eatermonExp[6].level,
        src: "images/Eatermons/Coreange.png",
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
        level: eatermonExp[7].level,
        src: "images/Eatermons/PanCoook.png",
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
        level: eatermonExp[8].level,
        maxHp: 135,
        src: "images/Eatermons/ChrisP.png",
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
        level: eatermonExp[9].level,
        src: "images/Eatermons/Protcluker.png",
        canFlee: false,
        emblem: "images/emblems/fireEmblem.png",
    },
    {
        type: eatermonTypes[5],
        id: 10,
        name: "Hhocolate",
        hp: 110,
        maxHp: 110,
        attack: eatermonStats[10].attack,
        defense: eatermonStats[10].defense,
        speed: eatermonStats[10].speed,
        src: "images/Eatermons/Hhocolate.png",
        xp: eatermonExp[10].xp,
        level: eatermonExp[10].level,
        maxXp: 100,
        canFlee: false,
        emblem: "images/emblems/fightingEmblem.png",
    },
    {
        type: eatermonTypes[1],
        id: 11,
        name: "Pastmala",
        hp: 110,
        maxHp: 110,
        attack: eatermonStats[11].attack,
        defense: eatermonStats[11].defense,
        speed: eatermonStats[11].speed,
        src: "images/Eatermons/Pastmala.png",
        xp: eatermonExp[11].xp,
        level: eatermonExp[11].level,
        maxXp: 100,
        canFlee: false,
        emblem: "images/emblems/waterEmblem.png",
    },
    {
        type: eatermonTypes[4],
        id: 12,
        name: "WaffItOff",
        hp: 120,
        maxHp: 120,
        attack: eatermonStats[12].attack,
        defense: eatermonStats[12].defense,
        speed: eatermonStats[12].speed,
        src: "images/Eatermons/WaffItOff.png",
        xp: eatermonExp[12].xp,
        level: eatermonExp[12].level,
        maxXp: 100,
        canFlee: false,
        emblem: "images/emblems/normalEmblem.png",
    },
    {
        type: eatermonTypes[4],
        id: 13,
        name: "Meaty Malt",
        hp: 100,
        maxHp: 100,
        attack: eatermonStats[13].attack,
        defense: eatermonStats[13].defense,
        speed: eatermonStats[13].speed,
        src: "images/Eatermons/Meaty Malt.png",
        xp: eatermonExp[13].xp,
        level: eatermonExp[13].level,
        maxXp: 100,
        canFlee: false,
        emblem: "images/emblems/normalEmblem.png",
    },
    {
        type: eatermonTypes[5],
        id: 14,
        name: "Bannano",
        hp: 80,
        maxHp: 80,
        attack: eatermonStats[14].attack,
        defense: eatermonStats[14].defense,
        speed: eatermonStats[14].speed,
        src: "images/Eatermons/Bannano.png",
        xp: eatermonExp[14].xp,
        level: eatermonExp[14].level,
        maxXp: 50,
        canFlee: false,
        emblem: "images/emblems/normalEmblem.png",
    },
    {
        type: eatermonTypes[9],
        id: 15, 
        name: "Hank",
        hp: 100,
        maxHp: 100, 
        src: "images/Eatermons/Hank.png",
        attack: eatermonStats[15].attack,
        defense: eatermonStats[15].defense,
        speed: eatermonStats[15].speed,
        xp: eatermonExp[15].xp,
        level: eatermonExp[15].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/groundEmblem.png" 
    }, 
    {
        type: eatermonTypes[10],
        id: 16, 
        name: "Jammin",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[16].attack,
        defense: eatermonStats[16].defense,
        speed: eatermonStats[16].speed,
        src: "images/Eatermons/Jammin.png",
        xp: eatermonExp[16].xp,
        level: eatermonExp[16].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/stickyEmblem.png" 
    },
    {
        type: eatermonTypes[11],
        id: 17, 
        name: "Hardcore Corn",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[17].attack,
        defense: eatermonStats[17].defense,
        speed: eatermonStats[17].speed,
        src: "images/Eatermons/Hardcore Corn.png",
        xp: eatermonExp[17].xp,
        level: eatermonExp[17].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/sweetEmblem.png" 
    },
    {
        type: eatermonTypes[1],
        id: 18, 
        name: "Barry The Berry",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[18].attack,
        defense: eatermonStats[18].defense,
        speed: eatermonStats[18].speed,
        src: "images/Eatermons/Barry The Berry.png",
        xp: eatermonExp[18].xp,
        level: eatermonExp[18].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/waterEmblem.png" 
    },
    {
        type: eatermonTypes[3],
        id: 19, 
        name: "Sir Pit",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[19].attack,
        defense: eatermonStats[19].defense,
        speed: eatermonStats[19].speed,
        src: "images/Eatermons/Sir Pit.png",
        xp: eatermonExp[19].xp,
        level: eatermonExp[19].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/grassEmblem.png" 
    },
    {
        type: eatermonTypes[11],
        id: 20, 
        name: "March Mad-Muffin",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[20].attack,
        defense: eatermonStats[20].defense,
        speed: eatermonStats[20].speed,
        src: "images/Eatermons/March Mad-Muffin.png",
        xp: eatermonExp[20].xp,
        level: eatermonExp[20].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/sweetEmblem.png" 
    },
    {
        type: eatermonTypes[11],
        id: 21, 
        name: "Sober",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[21].attack,
        defense: eatermonStats[21].defense,
        speed: eatermonStats[21].speed,
        src: "images/Eatermons/Sober.png",
        xp: eatermonExp[21].xp,
        level: eatermonExp[21].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/sweetEmblem.png" 
    },
    {
        type: eatermonTypes[12],
        id: 22, 
        name: "Purple Trips",
        hp: 100,
        maxHp: 100,
        attack: eatermonStats[22].attack,
        defense: eatermonStats[22].defense,
        speed: eatermonStats[22].speed,
        src: "images/Eatermons/Purple Trips.png",
        xp: eatermonExp[22].xp,
        level: eatermonExp[22].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/sourEmblem.png" 
    },
    {
        type: eatermonTypes[4],
        id: 23, 
        name: "Ban Blast",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[23].attack,
        defense: eatermonStats[23].defense,
        speed: eatermonStats[23].speed,
        src: "images/Eatermons/Ban Blast.png",
        xp: eatermonExp[23].xp,
        level: eatermonExp[23].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/normalEmblem.png" 
    },
    {
        type: eatermonTypes[0],
        id: 24, 
        name: "Legal Pot",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[24].attack,
        defense: eatermonStats[24].defense,
        speed: eatermonStats[24].speed,
        src: "images/Eatermons/LegalPot.png",
        xp: eatermonExp[24].xp,
        level: eatermonExp[24].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/fireEmblem.png" 
    },
    {
        type: eatermonTypes[14],
        id: 25, 
        name: "Chivy",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[25].attack,
        defense: eatermonStats[25].defense,
        speed: eatermonStats[25].speed,
        src: "images/Eatermons/Chivy.png",
        xp: eatermonExp[25].xp,
        level: eatermonExp[25].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/dragonEmblem.png" 
    },
    {
        type: eatermonTypes[14],
        id: 26, 
        name: "Chivester",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[26].attack,
        defense: eatermonStats[26].defense,
        speed: eatermonStats[26].speed,
        src: "images/Eatermons/Chivester.png",
        xp: eatermonExp[26].xp,
        level: eatermonExp[26].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/dragonEmblem.png" 
    },
    {
        type: eatermonTypes[14],
        id: 27, 
        name: "Voladorio",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[27].attack,
        defense: eatermonStats[27].defense,
        speed: eatermonStats[27].speed,
        src: "images/Eatermons/Voladorio.png",
        xp: eatermonExp[27].xp,
        level: eatermonExp[27].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/dragonEmblem.png" 
    },
    {
        type: eatermonTypes[2],
        id: 28, 
        name: "C. Lanatus",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[28].attack,
        defense: eatermonStats[28].defense,
        speed: eatermonStats[28].speed,
        src: "images/Eatermons/C. lanatus.png",
        xp: eatermonExp[28].xp,
        level: eatermonExp[28].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/grassEmblem.png" 
    },
    {
        type: eatermonTypes[1],
        id: 29, 
        name: "Calamares",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[29].attack,
        defense: eatermonStats[29].defense,
        speed: eatermonStats[29].speed,
        src: "images/Eatermons/Calamares.png",
        xp: eatermonExp[29].xp,
        level: eatermonExp[29].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/waterEmblem.png" 
    },
    {
        type: eatermonTypes[11],
        id: 30, 
        name: "Calamars",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[30].attack,
        defense: eatermonStats[30].defense,
        speed: eatermonStats[30].speed,
        src: "images/Eatermons/Calamars.png",
        xp: eatermonExp[30].xp,
        level: eatermonExp[30].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/sweetEmblem.png" 
    },
    {
        type: eatermonTypes[13],
        id: 31, 
        name: "Kalamar",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[31].attack,
        defense: eatermonStats[31].defense,
        speed: eatermonStats[31].speed,
        src: "images/Eatermons/Kalamar.png",
        xp: eatermonExp[31].xp,
        level: eatermonExp[31].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/saltyEmblem.png" 
    },
]
/*
    * Fire - id[0]
    * Water - id[1]
    * Grass - id[2]
    * Ice - id[3]
    * Normal - id[4]
    * Fighting - id[5]
    * Poison - id[6]
    * Flying - id[7]
    * Crisp - id[8]
    * Ground - id[9]
    * Sticky - id[10]
    * Sweet - id[11]
    * Sour - id[12]
    * Salty - id[13]
    * Dragin - id [14] 
    * Template: { name: "", power: , type: eatermonTypes[].type},
*/
 /**
     * {
        type: eatermonTypes[#],
        id: #, 
        name: "",
        hp: 100,
        maxHp: 100, 
        attack: eatermonStats[#].attack,
        defense: eatermonStats[#].defense,
        speed: eatermonStats[#].speed,
        src: "images/Eatermons/.png",
        xp: eatermonExp[#].xp,
        level: eatermonExp[#].level,
        maxXp: 100, 
        canFlee: false, 
        emblem: "images/emblems/.png" 
    },
     */

let eatermonForEachRoute = [
    [
        //Route One
        eatermon[20],
        eatermon[21]
    ],
]

const eventEatermon = [
    {
        type: eatermonTypes[4],
        id: 12,
        name: "WaffItOff",
        hp: 30,
        maxHp: 30,
        src: "images/Eatermons/WaffItOff.png",
        xp: eatermonExp[11].xp,
        level: eatermonExp[11].level,
        maxXp: 100,
        canFlee: false,
        emblem: "images/emblems/normalEmblem.png",
    }, 
]


function loadingImages() {
  if(teachingCatching) {
            playerImg.src = eatermon[currentEatermonIndex].src; // Player is Tomadoodle
            emblem.src = eatermon[currentEatermonIndex].emblem;
            enemyImg.src = eventEatermon[0].src;  // Enemy is dynamically selected
            enemyEmblem.src = eventEatermon[0].emblem;
    } else {
     enemyImg.src = eatermon[enemyEatermonIndex].src;  // Enemy is dynamically selected
     playerImg.src = eatermon[currentEatermonIndex].src; // Player is Tomadoodle
     emblem.src = eatermon[currentEatermonIndex].emblem;
     enemyEmblem.src = eatermon[enemyEatermonIndex].emblem;   
    }

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
    if(eatermon[currentEatermonIndex].hp > 100) {
        let xpProgressGreen = document.getElementById('xpProgress');
        xpProgressGreen.style.width = `90%`; 
    }
    if (eatermon[currentEatermonIndex].xp >= eatermon[currentEatermonIndex].maxHp) {
        normal = false;

        // Level up logic
        eatermon[currentEatermonIndex].level = eatermon[currentEatermonIndex].level + 1;
        eatermon[currentEatermonIndex].xp = 0;
        eatermon[currentEatermonIndex].maxXp = eatermon[currentEatermonIndex].maxXp + eatermon[currentEatermonIndex].maxXp / 5;
        eatermon[currentEatermonIndex].maxHp = eatermon[currentEatermonIndex].maxHp + 10;
        eatermon[currentEatermonIndex].hp = eatermon[currentEatermonIndex].hp + 10;


        // Update the move learning text
        // learnNewMoveText.innerHTML = `You can learn a new move!`;
        evolve();


        if(!firstEvolving && !levelUpMenu) {
            levelDiv.style.display = 'block'; 
            eatermonLevelUpText.innerHTML = `${eatermonEvolutions[currentEatermonIndex].name} Leveled Up To: ${eatermon[currentEatermonIndex].level}!`;
            eatermonPtext.innerHTML = `${eatermonEvolutions[currentEatermonIndex].name} Wants To Learn:`;

        } else if (firstEvolving && levelUpMenu) {
            moveTextNoButton.setAttribute('disabled', true);
            moveTextButton.setAttribute('disabled', true);
            levelDiv.style.display = 'block';
            eatermonLevelUpText.innerHTML = `${eatermon[currentEatermonIndex].name} Evolved To ${eatermonEvolutions[currentEatermonIndex].name}!`;

            generateAttackButtons(true);

            
        }
        // Show level up UI
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

