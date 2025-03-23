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
