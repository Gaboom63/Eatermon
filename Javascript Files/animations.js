function triggerFireballAnimation() {
    const fireball = document.getElementById('fireball');
    const player = document.getElementById('eatermonPlayer');
    const enemy = document.getElementById('eatermonEnemy');

    // Get the player's and enemy's positions
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Calculate the distance from player to enemy in both X and Y directions
    const distanceX = enemyRect.left + enemyRect.width / 2 - (playerRect.left + playerRect.width / 2);
    const distanceY = enemyRect.top + enemyRect.height / 2 - (playerRect.top + playerRect.height / 2);

    // Set the initial position of the fireball at the player's position
    fireball.style.left = `${playerRect.left + playerRect.width / 2 - 25}px`; // Center the fireball horizontally
    fireball.style.top = `${playerRect.top + playerRect.height / 2 - 25}px`;  // Center the fireball vertically

    // Show the fireball
    fireball.style.display = 'block';

    // Variables to track the fireball's movement
    let moveX = 0;
    let moveY = 0;

    // The speed of the fireball's movement
    const speed = 10; // Change this to control how fast the fireball moves

    // Animate the fireball
    const interval = setInterval(() => {
        moveX += distanceX / 50; // Divide distance to get incremental movement
        moveY += distanceY / 50;

        // Apply the new position using transform
        fireball.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // Stop the animation once the fireball reaches the enemy's position
        if (Math.abs(moveX) >= Math.abs(distanceX) && Math.abs(moveY) >= Math.abs(distanceY)) {
            clearInterval(interval);
            // Optionally hide the fireball after animation
            setTimeout(() => {
                fireball.style.display = 'none';
            }, 200);
        }
    }, 20); // Adjust the interval time to control the animation speed
}

function triggerVineWhipAnimation() {
    const vineWhip = document.getElementById('vineWhip');
    const player = document.getElementById('eatermonPlayer');
    const enemy = document.getElementById('eatermonEnemy');

    // Get the player's and enemy's positions
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Calculate the distance between enemy and player
    const distanceX = playerRect.left + playerRect.width / 2 - (enemyRect.left + enemyRect.width / 2);
    const distanceY = playerRect.top + playerRect.height / 2 - (enemyRect.top + enemyRect.height / 2);

    // Set initial position of the vine at the enemy's position
    vineWhip.style.left = `${enemyRect.left + enemyRect.width / 2 - 2}px`;
    vineWhip.style.top = `${enemyRect.top + enemyRect.height / 2 - 2}px`;

    // Set initial height to 0 (vine grows upwards first)
    vineWhip.style.height = '0px';
    vineWhip.style.display = 'block'; // Make the vine visible

    // Initial rotation (vertical direction)
    vineWhip.style.transform = 'rotate(90deg)';
    vineWhip.style.transition = 'none';

    // First grow vertically upwards
    const initialHeight = 150; // Height the vine grows upwards (can adjust)
    vineWhip.style.transition = 'height 0.5s ease-out';
    vineWhip.style.height = `${initialHeight}px`;

    // After the upward growth, animate it falling and growing toward the player
    setTimeout(() => {
        // Calculate the full distance to the player
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Animate the vine falling and growing towards the player
        vineWhip.style.transition = 'height 1s ease-out, left 1s ease-out, top 1s ease-out';
        vineWhip.style.height = `${distance}px`;
        vineWhip.style.left = `${playerRect.left + playerRect.width / 2 - vineWhip.offsetWidth / 2}px`;
        vineWhip.style.top = `${playerRect.top + playerRect.height / 2 - vineWhip.offsetHeight / 2}px`;

        // Shake effect when the vine hits the player
        setTimeout(() => {
            vineWhip.style.animation = 'vineWhipHit 0.5s ease-out';
        }, 1000); // Trigger shake after vine finishes moving

    }, 500); // Wait for the vine to grow upwards first

    // Optionally hide the vine after animation ends
    setTimeout(() => {
        vineWhip.style.display = 'none'; // Hide after the animation ends
    }, 1500); // Adjust the timeout as necessary
}


function triggerFireStarAnimation() {
    const firestar = document.getElementById('firestar');
    const player = document.getElementById('eatermonPlayer');
    const enemy = document.getElementById('eatermonEnemy');

    // Get the player's and enemy's positions
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    // Calculate the distance from player to enemy in both X and Y directions
    const distanceX = enemyRect.left + enemyRect.width / 2 - (playerRect.left + playerRect.width / 2);
    const distanceY = enemyRect.top + enemyRect.height / 2 - (playerRect.top + playerRect.height / 2);

    // Set the initial position of the fireball at the player's position
    firestar.style.left = `${playerRect.left + playerRect.width / 2 - 25}px`; // Center the fireball horizontally
    firestar.style.top = `${playerRect.top + playerRect.height / 2 - 25}px`;  // Center the fireball vertically

    // Show the fireball
    firestar.style.display = 'block';

    // Variables to track the fireball's movement
    let moveX = 0;
    let moveY = 0;

    // The speed of the fireball's movement
    const speed = 10; // Change this to control how fast the fireball moves

    // Animate the fireball
    const interval = setInterval(() => {
        moveX += distanceX / 50; // Divide distance to get incremental movement
        moveY += distanceY / 50;

        // Apply the new position using transform
        firestar.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // Stop the animation once the fireball reaches the enemy's position
        if (Math.abs(moveX) >= Math.abs(distanceX) && Math.abs(moveY) >= Math.abs(distanceY)) {
            clearInterval(interval);

            // Position the fireball exactly at the enemy's location for the explosion
            firestar.style.left = `${enemyRect.left + enemyRect.width / 2 - 25}px`;  // Center fireball at enemy
            firestar.style.top = `${enemyRect.top + enemyRect.height / 2 - 25}px`;   // Center fireball at enemy

            // Trigger explosion after fireball reaches the enemy
            firestar.style.animation = 'explosion 1s forwards';  // Trigger explosion animation
            
            // Optionally hide the fireball after animation
            setTimeout(() => {
                firestar.style.display = 'none';
                firestar.style.animation = 'none';
            }, 1000);  // Match with the duration of explosion animation
        }
    }, 20); // Adjust the interval time to control the animation speed
}


function triggerBlinkingAnimation() {
    const targetElement = document.getElementById('eatermonPlayer'); // The element you want to blink
    targetElement.classList.add('blinking');

    // Optionally, you can stop the animation after a certain time
    setTimeout(() => {
        targetElement.classList.remove('blinking');
    }, 5000); // Stop blinking after 5 seconds (adjust as needed)
}

// triggerBlinkingAnimation();