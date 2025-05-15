let hideText = false;
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
    firstElijahMessageText: [
        "",
        `The professor (or my dad pretty cool huh) has been waiting for both of us since we both turned 16 today!`,
        `We should go meet him... My house is the one on the right.`
    ],
    professerInitalText: [
        "", // Will be set dynamically with playerName
        `Lets Get Elijah In Here Before We Begin...`,
        `Well Hello Elijah Perfect Timing, I want to give you and \${game.playerName} A Eatermon!`,
        `The Eatermon You Choose Really Will Affect Your Experience In This World`,
        `Please Pick Wisely!`,
        `Please Pick Wisely!`,
        `\${game.playerName}, You Should Battle Elijah! `
    ],
    elijahRouteOne: [
        "",
        `Professor Ron Told Me To Teach You How To Catch An Eatermon`,
        `Follow Me!`,
        `Follow Me!` // This index is referenced explicitly in showNextMessage
    ],
    elijahCatchMessage: [
        `Ok! Here We Go!`
    ],
    currentMessageArray: [],
    isMomMessageComplete: false,
    currentMessageHandler: null,
    cutSceneState: 0,
    isTransitioning: false,
    buttonClicked: false,
    buttonResult: "",
    buttonResultShown: false,
    waitingForEnter: false,
    routeOne: false,
    meetingProfesser: false,
    goingToElijah: false,
    inBattle: false,
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
    if (event.key === 'Enter' && !game.gettingName && !game.isTransitioning && !game.waitingForEnter && !game.buttonClicked && canPressEnter && !game.inBattle) {
        console.log("Key pressed: Enter");

        // Proceed if the button was clicked
        if (game.buttonClicked) {
            game.buttonClicked = false;  // Reset flag
            showNextMessage();  // Proceed to the next message
        } else {
            // Check if there are more messages to show
            showNextMessage();
            showNpcText();
        }
    }
}


let canPressEnter = true;
let afterMeetingProfessor = false;
let finishedInitalBattle = false;


function showNextMessage() {
    const questionOneButton = document.getElementById('questionButton1');
    const questionTwoButton = document.getElementById('questionButton2');
    const currentArray = game.currentMessageArray;

    console.log("showNextMessage called. messageIndex:", game.messageIndex, "Array length:", currentArray.length);

    // Handle fade-in scene before giving Eatermon
    if (
        currentArray === game.professerInitalText &&
        game.messageIndex === 0 &&
        canPressEnter
    ) {
        game.messageIndex++;
        canPressEnter = false;
        fadeIn();

        setTimeout(() => {
            afterMeetingProfessor = true;
            showNPC('Elijah');
            fadeOut();

            setTimeout(() => {
                showNpcText();
                showNextMessage(); // Proceed to the next message
                setTimeout(() => {
                    canPressEnter = true;
                }, 1000);
            }, 2000);
        }, 3000);
        return;
    }

    // Handle Eatermon choice buttons
    if (
        currentArray === game.professerInitalText &&
        game.messageIndex === 5
    ) {
        showQuestionButtons();
        questionOneButton.innerHTML = `I choose: Tomadoodle!`;
        questionTwoButton.innerHTML = `I choose: Woodle!`;

        // Prevent multiple event listeners
        questionOneButton.replaceWith(questionOneButton.cloneNode(true));
        questionTwoButton.replaceWith(questionTwoButton.cloneNode(true));

        document.getElementById('questionButton1').addEventListener('click', () => {
            displayResultMessage("I choose: Tomadoodle!");
        });
        document.getElementById('questionButton2').addEventListener('click', () => {
            displayResultMessage("I choose: Woodle!");
        });

        game.buttonClicked = true;
        return;
    }

    // Handle Elijah saying "Follow Me!" in route one
    if (
        currentArray === game.elijahRouteOne &&
        currentArray[game.messageIndex] === 'Follow Me!' &&
        game.routeOne
    ) {
        console.log("Route one transition at message index:", game.messageIndex);
        canPressEnter = false;

        setTimeout(() => {
            hideText = true;
            game.messageIndex++;
        }, 1000);

        setCutScene(7, () => {
            hideText = false;
            currentMap.npcs[0].x = 20;
            currentMap.npcs[0].y = 53;
            elijahCatch();
            showNpcText();
        });

        return;
    }

    // Start battle
    if (
        currentArray === game.professerInitalText &&
        currentArray[game.messageIndex] === '${game.playerName}, You Should Battle Elijah!' &&
        !finishedInitalBattle
    ) {
        game.inBattle = true;
        npcBattle();
        setTimeout(() => {
            finishedInitalBattle = true;
            npcTextContainer.style.display = 'none';
            game.routeOne = true;
            game.meetingProfesser = false;
        }, 1000);
        return;
    }

    // Show next line if any remain
    if (game.messageIndex < currentArray.length) {
        const nextMessage = currentArray[game.messageIndex];
        console.log("Before showing message:", nextMessage);
        npcP.innerHTML = nextMessage.replace('${game.playerName}', game.playerName);
        game.messageIndex++;
        console.log("After showing message. New index:", game.messageIndex);
    } else {
        // If no more messages, trigger end-of-sequence logic
        console.log("End of current array reached. Handling...");
        switch (currentArray) {
            case game.initialDreamMessages:
                handleInitialDreamMessagesComplete();
                break;
            case game.momMessageText:
                handleMomMessagesComplete();
                break;
            case game.downstairsMomMessageText:
                handleDownstairsMomMessagesComplete();
                break;
            case game.firstElijahMessageText:
                handleMeetElijahComplete();
                break;
            case game.professerInitalText:
                handleMeetProfessorComplete();
                break;
            default:
                npcP.innerHTML = "No more messages.";
        }
    }
}


function handleDownstairsMomMessagesComplete() {
    console.log("Downstairs Mom Messages Complete.");
    hideNpcText();
    npcNormal = true;
    normal = true;
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
    document.removeEventListener('keydown', game.currentMessageHandler);
    momMessageDone = true;
    initalCutScene = false; // If you want to start the next part of the game
}

function handleMomMessagesComplete() {
    console.log("Mom Messages Complete.");
    game.isTransitioning = true; // Flag transition start
    hideNpcText();
    npcNormal = true;
    normal = true;
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
    document.removeEventListener('keydown', game.currentMessageHandler);
    momMessageDone = true;
    initalCutScene = false;
    console.log('Mom Message is done: ', momMessageDone);
    console.log('initalCutScene is done: ', initalCutScene);
    game.isTransitioning = false; // Flag transition end
}


function handleInitialDreamMessagesComplete() {
    console.log("Initial Dream Messages Complete.");
    npcP.innerHTML = `I have told you all I can for now. Wake Up ${game.playerName}!`;
    hideNpcText();
    initalCutsceneName.style.display = 'none';
    game.currentMessageArray = [];
    game.messageIndex = 0;
    document.removeEventListener('keydown', game.currentMessageHandler);

    let startingOverlay = document.getElementById('startingScene');
    startingOverlay.classList.add('hidden');
    startingOverlay.addEventListener('transitionend', () => {
        startingOverlay.classList.add('hidden');
        startingOverlay.style.display = 'none';
        let npcTextContainer = document.getElementById('npcTextContainer');
        npcTextContainer.classList.remove('show');
        npcTextContainer.style.display = 'none';
        momMessage();
    });
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
    npcTextBox.focus();
    game.currentMessageArray = game.momMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
}

function elijahRouteOneMessage() {
    npcNormal = false;
    normal = false;
    game.inBattle = false;
    game.elijahRouteOne[0] = `Hey ${game.playerName}!`;
    game.messageIndex = 0;
    npcName.innerHTML = `Elijah`;
    npcP.innerHTML = game.elijahRouteOne[game.messageIndex];
    npcTextBox.focus();
    game.currentMessageArray = game.elijahRouteOne;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    // showNpcText();
}

function elijahCatch() {
    npcNormal = false;
    normal = false;
    game.messageIndex = 0;
    npcP.innerHTML = game.elijahCatchMessage[game.messageIndex];
    npcTextBox.focus();
    game.currentMessageArray = game.elijahCatchMessage;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    battleTestForCutScene();
}

function momMessageDownstairs() {
    npcNormal = false;
    normal = false;
    game.downstairsMomMessageText[0] = `Hello ${game.playerName}`;
    game.messageIndex = 0;
    npcName.innerHTML = `Mom`;
    npcP.innerHTML = game.downstairsMomMessageText[game.messageIndex];
    momMessageDone = false;
    npcTextBox.focus();
    game.currentMessageArray = game.downstairsMomMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();
    goingToElijah = true;
    console.log("Going To Elijah: ", goingToElijah); 

}

function meetingElijah() {
    let questionOneButton = document.getElementById('questionButton1');
    let questionTwoButton = document.getElementById('questionButton2');
    npcNormal = false;
    normal = false;
    game.firstElijahMessageText[0] = `Hi ${game.playerName}! I went through your mail so I know your name!`;
    game.messageIndex = 0;
    npcName.innerHTML = `Elijah`;
    npcP.innerHTML = game.firstElijahMessageText[game.messageIndex];
    npcTextBox.focus();
    game.currentMessageArray = game.firstElijahMessageText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showQuestionButtons();
    questionOneButton.innerHTML = `Why have I never met you before?`;
    questionTwoButton.innerHTML = `My Mail?`;
    game.buttonClicked = true;
    // Add event listeners to the buttons
    questionOneButton.addEventListener('click', function () {
        displayResultMessage("Why have I never met you before?");
    });

    questionTwoButton.addEventListener('click', function () {
        displayResultMessage("My Mail?");
    });

    showNpcText();
    goingToElijah = false;
}

function firstProfesser() {
    npcNormal = false;
    normal = false;
    game.professerInitalText[0] = `Well if it isn't ${game.playerName}! Happy 16th!`;
    game.messageIndex = 0;
    npcName.innerHTML = `Professor Ron`;
    npcP.innerHTML = game.professerInitalText[game.messageIndex];
    npcTextBox.focus();
    game.currentMessageArray = game.professerInitalText;
    game.currentMessageHandler = handleKeyPress;
    document.addEventListener('keydown', game.currentMessageHandler);
    showNpcText();  // Call showNpcText once
    console.log("firstProfesser called. game.messageIndex:", game.messageIndex, "game.currentMessageArray:", game.currentMessageArray);
}


function handleMeetProfessorComplete() {
    hideNpcText();
    npcNormal = true;
    normal = true;
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
    document.removeEventListener('keydown', game.currentMessageHandler);
    meetingProfesser = false;
    game.routeOne = true;
}

function handleMeetElijahComplete() {
    hideNpcText();
    npcNormal = true;
    normal = true;
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
    document.removeEventListener('keydown', game.currentMessageHandler);
    meetingElijah = false;
    meetingProfesser = true;
    setCutScene(4);
}

function displayResultMessage(buttonClicked) {
    let resultMessage = '';

    // Set flag to true once a button is clicked
    game.buttonClicked = false;

    if (buttonClicked === "Why have I never met you before?") {
        resultMessage = `Elijah: "Oh, well, I usually stay in the background and avoid meeting people directly. I guess I missed you until now!"`;
    } else if (buttonClicked === "My Mail?") {
        resultMessage = `Elijah: "I found some letters in your mailbox. Nothing too exciting, just some birthday wishes and a few coupons."`;
    } else if (buttonClicked === "I choose: Tomadoodle!") {
        eatermon[currentEatermonIndex] = eatermon[1]
        currentEatermonIndex = 1;
        currentMap.npcs[1].party = npcParty[5].party
        currentNPCEatermon = currentMap.npcs[1].party
        updateEatermonNpc();
        currentNPC = currentMap.npcs[1]
        playerParty[0] = eatermon[1]
        console.log(currentNPC);
        talkingToNPC = true;
        resultMessage = `Congratulations! You And Tomadoodle Are Going To Be Best Of Buds!`
    } else if (buttonClicked === "I choose: Woodle!") {
        eatermon[currentEatermonIndex] = eatermon[0];
        currentEatermonIndex = 0;
        currentMap.npcs[1].party = npcParty[6].party;
        currentNPCEatermon = currentMap.npcs[1].party;
        playerParty[0] = eatermon[0];
        updateEatermonNpc();
        currentNPC = currentMap.npcs[1];
        console.log(currentNPC);
        talkingToNPC = true;
        resultMessage = `Congratulations! You And Woodle Are Going To Be Best Of Buds!`;
    } else {
        console.log("Error");
    }

    // Store the result message in game.buttonResult
    game.buttonResult = resultMessage;

    // Hide the buttons after an answer is given
    hideQuestionButtons();

    // Show the result message immediately
    npcP.innerHTML = resultMessage;
    game.messageIndex++; // Increment index to skip the original question text
    game.buttonResultShown = true;  // Flag to show that a result was shown
    setTimeout(() => {
        showNextMessage();
    }, 1000);
}


function hideNpcText() {
    let npcTextContainer = document.getElementById('npcTextContainer');
    npcTextContainer.classList.remove('show');
    npcTextContainer.style.display = 'none';
}

function hideQuestionButtons() {
    let questionOneButton = document.getElementById('questionButton1');
    let questionTwoButton = document.getElementById('questionButton2');
    questionOneButton.style.display = 'none';
    questionTwoButton.style.display = 'none';

}

function showQuestionButtons() {
    let questionOneButton = document.getElementById('questionButton1');
    let questionTwoButton = document.getElementById('questionButton2');
    questionOneButton.style.display = 'block';
    questionTwoButton.style.display = 'block';

}

startScreen();

function debugNoScreen() {
    momMessageDone = true;
    game.gettingName = false    // game.meetingProfesser = true; 
    // npcNormal = true; 
}
