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
    }
]

function npcBattle() {
    eatermon[enemyEatermonIndex] = currentNPCEatermon;
    if (talkingToNPC === true) { //Set to true when done 
        inBattle = true;
        loadingImagess(); // Load the emblems before starting the animation
        restoreEnemyHp();
        updateHp();
        battleMenuScript.style.display = 'block'; // Show battle menu
        startBattleAnimation(); // Trigger the battle animation

    }
}

