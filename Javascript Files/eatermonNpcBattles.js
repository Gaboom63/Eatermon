let npcEatermon = eatermon[0];
let isNpcEatermon = false; 
let npcParty = [
    {
        party: eatermon[9],
    },
    {
        party: eatermon[3],
    },
    {
        //None Debbie Has No Eatermon
        party: eatermon[3],
    },
    {
        party: eatermon[0],
    }
]

function updateEatermonNpc() {
    eatermon[enemyEatermonIndex] = currentNPCEatermon;
    enemyEatermonIndex = eatermon[enemyEatermonIndex].id;
    enemyMoves = eatermonMoves[enemyEatermonIndex].moves;
}

function npcBattle() {
    if (talkingToNPC === true) { //Set to true when done 
        inBattle = true;
    isNpcEatermon = true; 
        loadingImagess(); // Load the emblems before starting the animation
        restoreEnemyHp();
        updateHp();
        updateEatermonNpc(); 
        battleMenuScript.style.display = 'block'; // Show battle menu
        startBattleAnimation(); // Trigger the battle animation

    }
}

