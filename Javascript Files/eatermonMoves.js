const eatermonMoves = [
    {
        eatermon: eatermon[0], // Woodle
        moves: [
            { name: "Leaf Slash", power: 20, type: eatermonTypes[2].type },
            { name: "Vine Whip", power: 25, type: eatermonTypes[2].type },
            { name: "Quick Attack", power: 15, type: eatermonTypes[4].type },
            { name: "Growth", power: 0, type: eatermonTypes[2].type }
        ]
    },
    {
        eatermon: eatermon[1], // Tomadoodle
        moves: [
            { name: "Fireball", power: 30, type: eatermonTypes[0].type },
            { name: "Flame Burst", power: 35, type: eatermonTypes[0].type },
            { name: "Scratch", power: 10, type: eatermonTypes[4].type },
            { name: "Debug Ember", power: 2500, type: eatermonTypes[4].type }
        ]
    },
    {
        eatermon: eatermon[2], // Tomadoodle
        moves: [
            { name: "Snot", power: 15, type: eatermonTypes[4].type },
            { name: "Burp", power: 20, type: eatermonTypes[6].type },
            { name: "Scratch", power: 10, type: eatermonTypes[4].type },
            { name: "Drool", power: 40, type: eatermonTypes[1].type }
        ]
    },
    {
        eatermon: eatermon[3], // Tomadoodle
        moves: [
            { name: "Ice Spear", power: 40, type: eatermonTypes[3].type },
            { name: "Swallow", power: 20, type: eatermonTypes[6].type },
            { name: "Peck", power: 10, type: eatermonTypes[7].type },
            // { name: "Tears", power: 40, type: "Fire" }
        ]
    },
    {
        eatermon: eatermon[4], // Tomadoodle
        moves: [
            { name: "Tears", power: 40, type: "Fire" }
        ]
    },
    {
        eatermon: eatermon[5], // Tomadoodle
        moves: [
            { name: "Tears", power: 40, type: "Fire" }
        ]
    },
    {
        eatermon: eatermon[6], // Tomadoodle
        moves: [
            { name: "Tears", power: 40, type: "Fire" }
        ]
    },
    {
        eatermon: eatermon[7], // Tomadoodle
        moves: [
            { name: "Tears", power: 40, type: "Fire" }
        ]
    },
    {
        eatermon: eatermon[8], // Tomadoodle
        moves: [
            { name: "Tears", power: 40, type: "Fire" }
        ]
    },
    {
        eatermon: eatermon[9], // Tomadoodle
            moves: [
                { name: "Flamin' Chickin", power: 40, type: eatermonTypes[0].type },
                { name: "Protien Bulk", power: 20, type: eatermonTypes[6].type },
                { name: "Bone Recycle", power: 10, type: eatermonTypes[7].type },        
            ]
    },
];

// //console.log(eatermonMoves); 


const eatermonLearnableMoves = [
    {
        eatermon: eatermon[0], // Woodle
        learnableMoves: [
            { name: "Leaf Slash", power: 20, type: eatermonTypes[2].type },
            { name: "Vine Whip", power: 25, type: eatermonTypes[2].type },
            { name: "Quick Attack", power: 15, type: eatermonTypes[4].type },
            { name: "Growth", power: 0, type: eatermonTypes[2].type },
            { name: "Tackle", power: 10, type: eatermonTypes[4].type },
            { name: "Razor Leaf", power: 40, type: eatermonTypes[2].type },
            { name: "Nature's Blessing", power: 0, type: eatermonTypes[2].type },
        ]
    },
    {
        eatermon: eatermon[1], // Tomadoodle (Fire Type)
        learnableMoves: [
            { name: "Fireball", power: 30, type: eatermonTypes[0].type },
            { name: "Flame Burst", power: 35, type: eatermonTypes[0].type },
            { name: "Scratch", power: 10, type: eatermonTypes[4].type },
            { name: "Debug Ember", power: 2500, type: eatermonTypes[4].type },
            { name: "Fire Spin", power: 20, type: eatermonTypes[0].type },
            { name: "Heat Wave", power: 45, type: eatermonTypes[0].type },
        ]
    },
    {
        eatermon: eatermon[2], // Tomadoodle (Slime Type)
        learnableMoves: [
            { name: "Snot", power: 15, type: eatermonTypes[4].type },
            { name: "Burp", power: 20, type: eatermonTypes[6].type },
            { name: "Scratch", power: 10, type: eatermonTypes[4].type },
            { name: "Drool", power: 40, type: eatermonTypes[1].type },
            { name: "Slime Bubble", power: 25, type: eatermonTypes[6].type },
            { name: "Gooey Trap", power: 0, type: eatermonTypes[6].type },
        ]
    },
    {
        eatermon: eatermon[3], // Tomadoodle (Ice Type)
        learnableMoves: [
            { name: "Ice Spear", power: 40, type: eatermonTypes[3].type },
            { name: "Swallow", power: 20, type: eatermonTypes[6].type },
            { name: "Peck", power: 10, type: eatermonTypes[7].type },
            { name: "Frostbite", power: 25, type: eatermonTypes[3].type },
            { name: "Blizzard", power: 50, type: eatermonTypes[3].type },
        ]
    },
    {
        eatermon: eatermon[4], // Tomadoodle (Fire Type)
        learnableMoves: [
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Fire Punch", power: 30, type: eatermonTypes[0].type },
            { name: "Flare", power: 25, type: eatermonTypes[0].type },
        ]
    },
    {
        eatermon: eatermon[5], // Tomadoodle (Fire Type)
        learnableMoves: [
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Flame Kick", power: 35, type: eatermonTypes[0].type },
            { name: "Ember", power: 20, type: eatermonTypes[0].type },
        ]
    },
    {
        eatermon: eatermon[6], // Tomadoodle (Fire Type)
        learnableMoves: [
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Inferno", power: 50, type: eatermonTypes[0].type },
            { name: "Fire Punch", power: 30, type: eatermonTypes[0].type },
        ]
    },
    {
        eatermon: eatermon[7], // Tomadoodle (Fire Type)
        learnableMoves: [
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Lava Plume", power: 40, type: eatermonTypes[0].type },
            { name: "Flame Burst", power: 35, type: eatermonTypes[0].type },
        ]
    },
    {
        eatermon: eatermon[8], // Tomadoodle (Fire Type)
        learnableMoves: [
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Blaze Kick", power: 45, type: eatermonTypes[0].type },
            { name: "Eruption", power: 60, type: eatermonTypes[0].type },
        ]
    },
    {
        eatermon: eatermon[9], // Tomadoodle (Chicken Type)
        learnableMoves: [
            { name: "Flamin' Chickin", power: 40, type: eatermonTypes[0].type },
            { name: "Protien Bulk", power: 20, type: eatermonTypes[6].type },
            { name: "Bone Recycle", power: 10, type: eatermonTypes[7].type },
            { name: "Chicken Peck", power: 15, type: eatermonTypes[7].type },
            { name: "Wing Attack", power: 30, type: eatermonTypes[7].type },
        ]
    }
];
