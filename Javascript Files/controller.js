let isMoving = false;
let movementInterval;
let frameCounter = 0;
const TOTAL_FRAMES = 4; // 4 images per row in the sprite sheet
const MOVE_SPEED = 1; // Pixels per movement
const MOVE_INTERVAL = 90; // Milliseconds between movements (for consistent movement speed)
let frameUpdateCounter = 0; // Counter for sprite frame updates
const frameUpdateInterval = 3; // Adjust for slower/faster frame changes (larger = slower)


function updatePlayerSprite(direction) {
    // Directly update the frame (no need for counters)
    frameCounter = (frameCounter + 1) % TOTAL_FRAMES; // Cycle through frames

    switch (direction) {
        case 'up':
            currentFrameX = frameCounter;
            currentFrameY = 3;
            break;
        case 'down':
            currentFrameX = frameCounter;
            currentFrameY = 0;
            break;
        case 'left':
            currentFrameX = frameCounter;
            currentFrameY = 2;
            break;
        case 'right':
            currentFrameX = frameCounter;
            currentFrameY = 1;
            break;
        default:
            // Handle default case (if needed)
            break;
    }
}



// Handle player movement
function handlePlayerMovement(e) {
    if (e.key === 'Shift') {
        isShiftPressed = true;
    }

    if(normal) {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                startMoving(0, -MOVE_SPEED, 'up');
                break;
            case 'ArrowDown':
            case 's':
                startMoving(0, MOVE_SPEED, 'down');
                break;
            case 'ArrowLeft':
            case 'a':
                startMoving(-MOVE_SPEED, 0, 'left');
                break;
            case 'ArrowRight':
            case 'd':
                startMoving(MOVE_SPEED, 0, 'right');
                break;
            case 'Enter':
                interactWithNPC();
                if (!currentNPC.canBattle) {
                    setTimeout(() => { npcNormal = true; hideNpcText() }, 1000);
                }
                break;
            case '[':
                toggleTileSelection();
                break;
            case ']':
                if (showGrid) downloadSelectedTiles();
                break;
            case ';':
                showGrid = false;
                break;
            case 'Escape':
                openEscapeMenu();
                break;
        }
    }
}



// Handle NPC interaction
function handleNPCInteraction(e) {
    if (inBattle) return; // Prevent interaction during battle
    switch (e.key) {
        case 'Enter':
            interactWithNPC();
            if (!currentNPC.canBattle) {
                setTimeout(() => { npcNormal = true; hideNpcText(); }, 1000);

            }
            break;

        case 'Escape':
            openEscapeMenu();
            break;
    }
}


// Handle keyup events
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;
        firstTile = null;
    }
    if (e.key === ';') {
        showGrid = true;
    }
});

// Handle keyup events to stop movement
document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        isShiftPressed = false;
        firstTile = null;
    }
    if (e.key === ';') {
        showGrid = true;
    }

    // Stop movement when arrow keys are released
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        stopMoving();
    }
});




function startMoving(dx, dy, direction) {
    if (isMoving) return; // If already moving, do not start another interval
    isMoving = true;
    movementInterval = setInterval(() => {
        movePlayer(dx, dy, direction);  // direction should be passed here
        updatePlayerSprite(direction);  // and here as well
    }, MOVE_INTERVAL);
}

function stopMoving() {
    isMoving = false;
    clearInterval(movementInterval);
}

document.addEventListener('keydown', (event) => {
    if (waitingForEnter && event.key === 'Enter' && currentNPC.canTalkAgain && currentNPC.canBattle && !initalCutScene) {
        currentNPCEatermon = currentNPC.party;
        updateEatermonNpc();
        hideNpcText(); // Hide the text before battle
        npcBattle();
        waitingForEnter = false;
        // npcNormal = true;
    } else if (waitingForEnter && event.key === 'Enter' && !currentNPC.canBattle && !initalCutScene) { // Hide after last message after battle.
        hideNpcText();
        waitingForEnter = false;
        npcNormal = true;
    }

    if (npcNormal && !inBattle && !initalCutScene) { // Only handle player movement if not in battle
        handlePlayerMovement(event);
    } else if (!inBattle && !initalCutScene) { // Only handle npc interaction when not in battle
        handleNPCInteraction(event);
    }
});