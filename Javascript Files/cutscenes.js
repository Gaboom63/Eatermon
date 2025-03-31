let game = {
    messageIndex: 0,
    gettingName: true,
    playerName: "",
    initialDreamMessages: [
        "Welcome to the world of Eatermon. What is your name?",
        "This is a very different world from the world you know. In your world many people eat food, and it is how they survive.",
        "Here food is not a necessity and due to a weird paradox universe food is alive.",
        `Instead they are creatures we investigate and use for fun. We call those creatures <b>Eatermons</b>.`,
        `What story awaits you? Let's find out!`
    ],
    momMessageText: [
        "", // Placeholder for dynamic name insertion
        `You Should Come Downstairs!`,
    ],
    downstairsMomMessageText: [
        `Hello`,
    ],
    currentMessageArray: [],
    isMomMessageComplete: false,
    currentMessageHandler: null, // Function to handle key press
    cutSceneState: 0, // 0: initial, 1: downstairs
};

function startScreen() {
    let startingOverlay = document.getElementById('startingScene');
    startingOverlay.style.display = `block`;
    startingOverlay.style.backgroundColor = 'black';

    npcName.innerHTML = `Dream Warden`;
    npcP.innerHTML = game.initialDreamMessages[game.messageIndex];
    npcTextBox.style.display = 'block';
    npcTextBox.innerHTML = `Please enter your name below:`;
    initalCutsceneName.style.display = 'block';
    npcNormal = false;
    normal = false;
    initalCutScene = true;

    let floatingZs = document.createElement('div');
    floatingZs.classList.add('floating-zs');
    startingOverlay.appendChild(floatingZs);

    for (let i = 0; i < 4; i++) {
        let z = document.createElement('span');
        z.classList.add('z');
        z.innerHTML = 'Z';
        floatingZs.appendChild(z);
    }

    npcTextBox.focus();
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    game.currentMessageArray = game.initialDreamMessages;
    showNpcText();
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !game.gettingName) {
        showNextMessage();
    }
}

function showNextMessage() {
    game.messageIndex++;
    if (game.messageIndex < game.currentMessageArray.length) {
        npcP.innerHTML = game.currentMessageArray[game.messageIndex];
    } else {
        if (game.currentMessageArray === game.initialDreamMessages) {
            npcP.innerHTML = `I have told you all I can for now. Wake Up ${game.playerName}!`;
            setTimeout(() => {
                hideNpcText();
                npcNormal = true;
                normal = true;
                initalCutScene = false;
                document.removeEventListener('keydown', game.currentMessageHandler);
                requestAnimationFrame(() => { // Ensure overlay exists before hiding
                    let startingOverlay = document.getElementById('startingScene');
                    startingOverlay.classList.add('hidden');
                    startingOverlay.style.display = 'none'; 
                    momMessage();
                });
            }, 2000);
        } else if (game.currentMessageArray === game.momMessageText) {
            game.isMomMessageComplete = true;
            setTimeout(() => {
                hideNpcText();
                npcNormal = true; // Added this line
                normal = true; // Added this line
                let npcTextContainer = document.getElementById('npcTextContainer');
                npcTextContainer.classList.remove('show');
                npcTextContainer.style.display = 'none';
                document.removeEventListener('keydown', game.currentMessageHandler);
                // momMessageDownstairs(); //Removed from here. Called by map transition.
            }, 2000);
        } else if (game.currentMessageArray === game.downstairsMomMessageText) {
            game.isMomMessageComplete = true;
            setTimeout(() => {
                hideNpcText();
                npcNormal = true; // Added this line
                normal = true; // Added this line
                let npcTextContainer = document.getElementById('npcTextContainer');
                npcTextContainer.classList.remove('show');
                npcTextContainer.style.display = 'none';
                document.removeEventListener('keydown', game.currentMessageHandler);
                setCutScene(1);
            }, 2000);
        }
    }
}

function submitName() {
    game.playerName = npcTextBox.value.trim();
    if (game.playerName !== '') {
        npcP.innerHTML = `Welcome, ${game.playerName}, to the world of Eatermon!`;
        npcTextBox.style.display = 'none';
        initalCutsceneName.style.display = 'none';
        game.messageIndex = 0;
        game.gettingName = false;
    } else {
        npcTextBox.innerHTML = `Please enter a valid name.`;
    }
}

function momMessage() {
    game.momMessageText[0] = `Good Morning ${game.playerName}! Happy Birthday!`;
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.momMessageText[game.messageIndex];
    npcNormal = false;
    normal = false;
    npcTextBox.focus();
    game.currentMessageArray = game.momMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
}

//Function to trigger map transition and mom message
function triggerMapTransition(){
  momMessageDownstairs();
}

function momMessageDownstairs() {
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.downstairsMomMessageText[game.messageIndex];
    npcNormal = false;
    normal = false;
    npcTextBox.focus();
    game.currentMessageArray = game.downstairsMomMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
}

function hideNpcText() {
    npcTextBox.style.display = 'none';
}

startScreen();