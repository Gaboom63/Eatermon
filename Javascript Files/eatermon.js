const enemyImg = document.getElementById("eatermonEnemy");
const playerImg = document.getElementById("eatermonPlayer");
const emblem = document.getElementById("emblem"); 
const enemyEmblem = document.getElementById("enemyEmblem");
const eatermon = [
    {
        type: eatermonTypes[2].type, 
        id: 0,
        name: "Woodle",
        hp: 90,
        maxHp: 90,
        attack: 10,
        src: "images/woodle.png",
        canFlee: false
    },
    {
        type: eatermonTypes[0].type, 
        id: 1,
        name: "Tomadoodle",
        hp: 100,
        maxHp: 100,
        attack: 30,
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
        attack: 30,
        src: "images/druewl.png",
        canFlee: false
    },
    {
        type: eatermonTypes[3].type, 
        id: 3,
        name: "Flopper",
        hp: 130, 
        maxHp: 130,
        attack: 40, 
        src: "images/Flopper.png",
        canFlee: false
    }, 
    {
        type: eatermonTypes[0].type, 
        id: 4, 
        name: "Poporlation",
        hp: 120, 
        maxHp: 120, 
        src: "images/Poporlation.png",
        canFlee: false,
        abilities: ["Heat Resist"],  // Woodle has Heat Resist
    },
    {
        id: 5, 
        name: "BagOh",
        hp: 100, 
        maxHp: 100, 
        src: "images/BagOh.png",
        canFlee: false,
    },
    {
        id: 6, 
        name: "Coreange",
        hp: 70, 
        maxHp: 70, 
        src: "images/Coreange.png",
        canFlee: false,
    },
    {
        id: 7, 
        name: "PanCook",
        hp: 90, 
        maxHp: 90, 
        src: "images/PanCoook.png",
        canFlee: false,
    },
    {
        id: 8, 
        name: "ChrisP",
        hp: 135, 
        maxHp: 135, 
        src: "images/ChrisP.png",
        canFlee: false,
    },
    {
        type: eatermonTypes[0].type, 
        id: 9,
        name: "Protcluker",
        hp: 200, 
        maxHp: 200, 
        src: "images/Protcluker.png",
        canFlee: false,
        emblem: "images/emblems/fireEmblem.png",
    },
]

console.log(eatermon);


function loadingImages() {

    enemyImg.src = eatermon[enemyEatermonIndex].src;  // Enemy is dynamically selected
    playerImg.src = eatermon[currentEatermonIndex].src; // Player is Tomadoodle
    emblem.src = eatermon[currentEatermonIndex].emblem;
    enemyEmblem.src = eatermon[enemyEatermonIndex].emblem; 
}

//  loadingImages(); 

function showType() {
    
}