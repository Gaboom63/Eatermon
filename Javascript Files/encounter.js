let consolep = document.getElementById('console');
let hasEncounted = false;

function encounter() {
    let pickNum = Math.random() * (500 - 1) + 1;

    // Loop through all grass patches to check for encounter
    for (let i = 0; i < grass.length; i++) {
        const currentGrass = grass[i];

        // Check if the player is on top of the current grass patch
        if (
            player.x >= currentGrass.x && 
            player.x <= currentGrass.x + currentGrass.width && 
            player.y >= currentGrass.y && // Player's y must be at or above the grass patch
            player.y <= currentGrass.y + currentGrass.height && // Player's y must be within the vertical bounds of the grass
            !hasEncounted
        ) {
            consolep.innerHTML = `${pickNum}`;
            break; // Exit the loop if an encounter is found
        }
    }

    // Random chance for a battle encounter
    if (pickNum < 5 && !hasEncounted) {
        let battleMenuScript = document.getElementById('battleMenu'); 
        hasEncounted = true;
        consolep.innerHTML = `Battle Time!`;
        battleMenuScript.style.display = 'block'; 
        
        // setTimeout(() => {
        //     hasEncounted = false;
        // }, 3000);
    }

   
}

function battleMenu() {
    let battleMenuAttack = document.getElementById('attack');
    let battleMenuBag = document.getElementById('bag');
    let battleMenuRun = document.getElementById('run');

    if(battleMenuAttack.onclick) {
        console.log("Attack");

    }

    if(battleMenuBag.onclick) {
        console.log("Bag");

    }

    if(battleMenuRun.onclick) {
        console.log("Run");
    };
   

}