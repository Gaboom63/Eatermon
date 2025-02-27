// Grass patch properties (base grass object)
const grass = [
    {
        x: 40, 
        y: 20,
        width: 100,
        height: 100,
        color: 'green'
    },
    {
        x: 10,
        y: 20,
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
