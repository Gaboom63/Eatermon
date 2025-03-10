const wall = {
    walls: [
        { x: 132, y: 114 }, // Wall at (5, 5)
        { x: 6, y: 5 }, // Wall at (6, 5)
        { x: 7, y: 5 }, // Wall at (7, 5)
        // More walls...
    ],

    // Check if a given coordinate is a wall
    isWall(x, y) {
        for (let i = 0; i < this.walls.length; i++) {
            if (this.walls[i].x === x && this.walls[i].y === y) {
                return true; // There's a wall here
            }
        }
        return false; // No wall at this position
    },

    // Prevent movement if the new position is a wall
    canMoveTo(x, y) {
        return !this.isWall(x, y);
    },

    // Draw the walls visually on the canvas
   // In wall.js, modify the drawWalls function to account for camera offset
   drawWalls(ctx, pixelSize, cameraOffsetX, cameraOffsetY) {
    ctx.fillStyle = 'red'; // Wall color
    for (let i = 0; i < this.walls.length; i++) {
        const wallX = this.walls[i].x * pixelSize - cameraOffsetX;  // Apply camera offset
        const wallY = this.walls[i].y * pixelSize - cameraOffsetY;  // Apply camera offset
        ctx.fillRect(wallX, wallY, pixelSize, pixelSize); // Draw the wall
    }
}
}