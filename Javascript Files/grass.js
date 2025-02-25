// Grass patch properties (base grass object)
const grass = [
    {
        x: Math.random() * (100 - 1) + 1, 
        y: Math.random() * (100 - 1) + 1,
        width: 100,
        height: 100,
        color: 'green'
    },
    {
        x: Math.random() * (100 - 1) + 1,
        y: Math.random() * (100 - 1) + 1,
        width: 100,
        height: 100,
        color: 'green'
    }
];

function drawGrass() {
    // Loop through each grass patch and draw it
    grass.forEach(grassPatch => {
        ctx.fillStyle = grassPatch.color;
        ctx.fillRect(grassPatch.x, grassPatch.y, grassPatch.width, grassPatch.height);
    });
}

console.log(grass);
