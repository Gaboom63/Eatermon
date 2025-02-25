
const eatermonMoves = [
    // Moves for Woodle
    {
        eatermon: eatermon[0],  // Linking the move set to Woodle
        moves: [
            { name: "Leaf Slash", power: 20, type: "Grass" },
            { name: "Vine Whip", power: 25, type: "Grass" },
            { name: "Quick Attack", power: 15, type: "Normal" },
            { name: "Growth", power: 0, type: "Grass" }  // Non-damaging move that might increase stats
        ]
    },
    
    // Moves for Tomadoodle
    {
        eatermon: eatermon[1],  // Linking the move set to Tomadoodle
        moves: [
            { name: "Fireball", power: 30, type: "Fire" },
            { name: "Flame Burst", power: 35, type: "Fire" },
            { name: "Scratch", power: 10, type: "Normal" },
            { name: "Ember", power: 25, type: "Fire" }
        ]
    }
];

console.log(eatermonMoves);
