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
    }
]

console.log(eatermon);


function loadingImages() {
    const enemyImg = document.getElementById("eatermonEnemy");
    const playerImg = document.getElementById("eatermonPlayer");

    enemyImg.src = eatermon[enemyEatermonIndex].src;  // Enemy is dynamically selected
    playerImg.src = eatermon[1].src; // Player is Tomadoodle
}

//  loadingImages(); 

