// overworld.js

// Define event tiles
const eventTiles = [
    { x: 5, y: 5, event: () => triggerEvent("You've stepped on a special tile!") },
    { x: 10, y: 10, event: () => triggerEvent("A wild Eatermon appears!") },
    // Add more event tiles as needed
];

// Function to trigger events
function triggerEvent(message) {
    console.log(message);  // Log message to the console
}

// Function to check if player is on an event tile
function checkForEvent(playerX, playerY) {
    eventTiles.forEach(eventTile => {
        // Calculate player position and compare with eventTile positions
        if (Math.floor(playerX / 32) === eventTile.x && Math.floor(playerY / 32) === eventTile.y) {
            eventTile.event();  // Trigger event when player is on the event tile
        }
    });
}

// Function to create the event markers (HTML elements)
function createEventMarkers() {
    const mapContainer = document.querySelector('.map');  // Get the map container
    eventTiles.forEach(eventTile => {
        // Create a new div for each event marker
        const marker = document.createElement('div');
        marker.classList.add('event-marker');  // Add a class for styling

        // Set the position based on the map coordinates (fixed)
        const pixelSize = 32;  // Adjust based on your map's scale
        marker.style.position = 'absolute';
        marker.style.left = `${eventTile.x * pixelSize}px`;
        marker.style.top = `${eventTile.y * pixelSize}px`;
        marker.style.zIndex = 1; // Ensure the marker is on top of the map background, but below player

        // Append the marker to the map container
        mapContainer.appendChild(marker);
    });
}

window.addEventListener('load', () => {
    createEventMarkers();  // Call the function to create markers when the page is loaded
});
