let npcEatermon = eatermon[0];
let isNpcEatermon = false; 
let npcParty = [
    {
        id: 0, 
        party: eatermon[9],
    },
    {
        id: 1, 
        party: eatermon[3],
    },
    {
        //Debbie
        id: 2, 
    },
    {
        id: 3, 
        party: eatermon[0],
    },
    {
        id: 4, 
        party: eatermon[15], //Abby
    }
]

function updateEatermonNpc() {
    eatermon[enemyEatermonIndex] = currentNPCEatermon;
    enemyEatermonIndex = eatermon[enemyEatermonIndex].id;
    enemyMoves = eatermonMoves[enemyEatermonIndex].moves;
}

function npcBattle() {
    if (talkingToNPC === true) {
        inBattle = true;
        isNpcEatermon = true;
        document.getElementById('npcTextContainer').style.display = 'none'; //Force Hide before anything else.
        loadingImagess();
        restoreEnemyHp();
        updateHp();
        updateEatermonNpc();
        battleMenuScript.style.display = 'block';
        setTimeout(() => {
            startBattleAnimation();
        }, 10);
    }
}
