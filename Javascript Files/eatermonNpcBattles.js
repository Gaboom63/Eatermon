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

let npc = [
    {
        name: "George",
        message: "Yo! Lets Battle!",
        wonMessage: "Hahahaha You Lose!",
        lostMessage: "WHAT How did you beat my eatermon!! Anyway... Good Job!",
        talkedToAgain: "Awh Man... Maybe Next Time I'll Bet You!",
        x: 10,
        y: 10,
        src: 'images/NPCS/George.png',
        party: npcParty[0].party,
        canBattle: true,
        canTalkAgain: true
    },
    {
        name: "Jake",
        message: "BATTLE! ME WANT BATTLE...",
        x: 15,
        y: 15,
        src: 'images/NPCS/Jake.png',
        party: npcParty[1].party,
        canBattle: true,
        canTalkAgain: true
    },
    {
        name: "Debbie",
        message: "I'm You're Mom!",
        x: 10,
        y: 15,
        src: 'images/NPCS/Debbie.png',
        party: npcParty[2].party,
        canTalkAgain: true,
    },
    {
        name: "Elijah",
        message: `Nice To Meet you! I'm Elijah, But You Can Call Me EJ! I'm What Some Would Say Your <b>Rival</b>!`,
        x: 20,
        y: 10,
        src: 'images/NPCS/Rival.png',
        party: npcParty[3].party,
        canBattle: true,
        canTalkAgain: true, 
    }
    
];

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
