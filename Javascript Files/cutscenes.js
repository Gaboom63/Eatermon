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
        "",
        `You Should Come Downstairs!`,
    ],
    downstairsMomMessageText: [
        "",
        `Some kid named Elijah is outside waiting for you. You Should Go See Him!`,

    ],
    currentMessageArray: [],
    isMomMessageComplete: false,
    currentMessageHandler: null, // Function to handle key press
    cutSceneState: 0, // 0: initial, 1: downstairs
    isTransitioning: false, // New flag to prevent multiple transitions during an active one
};

let momMessageDone = false;

function startScreen() {
    let startingOverlay = document.getElementById('startingScene');
    startingOverlay.style.display = `block`;
    startingOverlay.style.backgroundColor = 'black';
    npcNormal = false;
    normal = false;

    npcName.innerHTML = `Dream Warden`;
    npcP.innerHTML = game.initialDreamMessages[game.messageIndex];
    npcTextBox.style.display = 'block';
    npcTextBox.innerHTML = `Please enter your name below:`;
    initalCutsceneName.style.display = 'block';
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
    if (event.key === 'Enter' && !game.gettingName && !game.isTransitioning) {
        console.log("Key pressed: Enter"); // Log key press
        showNextMessage();
    }
}

function showNextMessage() {
    const currentArray = game.currentMessageArray;

    // Log the current state
    console.log("Current Message Array:", currentArray);
    console.log("Current Message Index:", game.messageIndex);

    // Check if we still have messages to show
    if (game.messageIndex < currentArray.length) {
        npcP.innerHTML = currentArray[game.messageIndex];
        console.log("Showing message:", currentArray[game.messageIndex]);
        game.messageIndex++;  // Increment after showing the message
        console.log("Updated Message Index:", game.messageIndex);
    } else {
        console.log("No more messages in this array.");
        // Handle the completion of messages
        if (currentArray === game.initialDreamMessages) {
            handleInitialDreamMessagesComplete();
        } else if (currentArray === game.downstairsMomMessageText) {
            handleDownstairsMomMessagesComplete();
        } else if (currentArray === game.momMessageText) {
            handleMomMessagesComplete();
        } else if(currentArray != game.momMessageText) {
            npcP.innerHTML = currentArray[game.messageIndex];
        }
    }
}



function handleDownstairsMomMessagesComplete() {
    console.log("Downstairs Mom Messages Complete.");
    setTimeout(() => {
        hideNpcText();
        npcNormal = true;
        normal = true;
        let npcTextContainer = document.getElementById('npcTextContainer');
        npcTextContainer.classList.remove('show');
        npcTextContainer.style.display = 'none';
        document.removeEventListener('keydown', game.currentMessageHandler);
        momMessageDone = true;
        goingToElijah = false;
        initalCutScene = false; // If you want to start the next part of the game
    }, 2000); // Delay to ensure the final message is visible before transition
}

function handleMomMessagesComplete() {
    console.log("Mom Messages Complete.");
    game.isTransitioning = true; // Flag transition start
    setTimeout(() => {
        hideNpcText();
        npcNormal = true;
        normal = true;
        let npcTextContainer = document.getElementById('npcTextContainer');
        npcTextContainer.classList.remove('show');
        npcTextContainer.style.display = 'none';
        document.removeEventListener('keydown', game.currentMessageHandler);
        momMessageDone = true;
        initalCutScene = false;
        game.isTransitioning = false; // Flag transition end
    }, 2000);
}


function handleInitialDreamMessagesComplete() {
    console.log("Initial Dream Messages Complete.");
    npcP.innerHTML = `I have told you all I can for now. Wake Up ${game.playerName}!`;
    setTimeout(() => {
        hideNpcText();
        initalCutsceneName.style.display = 'none';
        game.currentMessageArray = [];
        game.messageIndex = 0;
        document.removeEventListener('keydown', game.currentMessageHandler);

        let startingOverlay = document.getElementById('startingScene');
        startingOverlay.classList.add('fadeOut');
        startingOverlay.addEventListener('transitionend', () => {
            startingOverlay.classList.add('hidden');
            startingOverlay.style.display = 'none';
            let npcTextContainer = document.getElementById('npcTextContainer');
            npcTextContainer.classList.remove('show');
            npcTextContainer.style.display = 'none';
            momMessage();
        });
    }, 2000);
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
    npcNormal = false;
    normal = false;
    game.momMessageText[0] = `Good Morning ${game.playerName}! Happy Birthday!`;
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.momMessageText[game.messageIndex];
    console.log("Displaying first mom message:", game.momMessageText[game.messageIndex]);
    npcTextBox.focus();
    game.currentMessageArray = game.momMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
}

function momMessageDownstairs() {
    npcNormal = false;
    normal = false;
    game.downstairsMomMessageText[0] = `Hello ${game.playerName}`;
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.downstairsMomMessageText[game.messageIndex];
    console.log("Displaying first downstairs mom message:", game.downstairsMomMessageText[game.messageIndex]);
    momMessageDone = false;
    npcTextBox.focus();
    game.currentMessageArray = game.downstairsMomMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
    goingToElijah = true;
}

function hideNpcText() {
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
}


startScreen();
