let eatermonMoves = [
    {
        eatermon: eatermon[0], // Woodle
        moves: [
            { name: "Leaf Slash", power: 20, type: eatermonTypes[2].type },
            { name: "Vine Whip", power: 25, type: eatermonTypes[2].type },
            { name: "Quick Attack", power: 15, type: eatermonTypes[4].type },
            { name: "Growth", power: 0, heal: 10, type: eatermonTypes[2].type }
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
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Tears", power: 40, type: "Fire" },
            { name: "Tears", power: 40, type: "Fire" },
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
    {
        eatermon: eatermon[10], // ChocolateBar
            moves: [
                { name: "Crunch", power: 50, type: eatermonTypes[8].type }, // Crisp
                { name: "Crisp Fury", power: 80, type: eatermonTypes[8].type }, // Crisp
                { name: "Fry", power: 60, type: eatermonTypes[1].type }, // Fire
                { name: "Chip Toss", power: 40, type: eatermonTypes[7].type }, // Flying
            ]
    },
    {
        eatermon: eatermon[11],
        moves: [
            { name: "Macaroni Bash", power: 65, type: eatermonTypes[3].type }, // Fighting-type move
            { name: "Ravioli Return", power: 55, type: eatermonTypes[4].type }, // Normal-type move
            { name: "Baked Ziti", power: 90, type: eatermonTypes[0].type }, // Fire-type move (baked in the oven)
            { name: "Fusilli Twist", power: 50, type: eatermonTypes[1].type }, // Water-type move (spinning in water)
        ]
    
    },
    {
        eatermon: eatermon[12],
        moves: [
            { name: "Crumb Storm", power: 50, type: eatermonTypes[4].type }, // Normal-type move (cookie crumbs flying around)
            { name: "Sweet Crumble", power: 65, type: eatermonTypes[5].type }, // Fairy-type move (the sweet magic of cookies)
            { name: "Choco Chip Attack", power: 75, type: eatermonTypes[8].type }, // Crisp-type (chocolate chip shards flying out)
            { name: "Half-Baked Blast", power: 85, type: eatermonTypes[0].type }, // Fire-type move (still half-baked, fiery energy)    
        ]
    },
    {
        eatermon: eatermon[13],
        moves: [
            { name: "Melted Surge", power: 60, type: eatermonTypes[2].type }, // Water-type move (melting, smooth wave of chocolate)
            { name: "Shake Up", power: 55, type: eatermonTypes[3].type }, // Electric-type move (vibrations of the shake)
            { name: "Fudge Rush", power: 40, type: eatermonTypes[1].type }, // Ice-type move (fudgy ice cream rush)
            { name: "Choco Blizzard", power: 50, type: eatermonTypes[6].type }, // Ice-type move (chocolate snowstorm)
        ]
    },
    {
        eatermon: eatermon[14],
        moves: [
            { name: "Peel Slam", power: 60, type: eatermonTypes[2].type }, // Water-type move (melting, smooth wave of chocolate)
            { name: "Split 'n' Smash", power: 55, type: eatermonTypes[3].type }, // Electric-type move (vibrations of the shake)
            { name: "Banana Peel Barrage", power: 40, type: eatermonTypes[1].type }, // Ice-type move (fudgy ice cream rush)
            { name: "Peel Armor", power: 0, defense: 10, type: eatermonTypes[6].type }, // Ice-type move (chocolate snowstorm)
        ]
    },
    {
        eatermon: eatermon[15],
        moves: [
            { name: "Hot Potato", power: 30, type: eatermonTypes[0].type},
            { name: "Soften", heal: 30, defense: -10, type: eatermonTypes[4].type},
            { name: "Potato Explosion", power: 60, type: eatermonTypes[0].type},
            { name: "Po-Pow", power: 40, type: eatermonTypes[7].type}
        ]
    },
    {
        eatermon: eatermon[16],
        moves: [
            { name: "Knife Wipe", power: 20, type: eatermonTypes[11].type},
            { name: "Jammin Out", power: 40, heal: 10, type: eatermonTypes[11].type},
            { name: "Lid Throw", power: 45, type: eatermonTypes[5].type},
            { name: "Jelly Goon", power: 60, type: eatermonTypes[11].type},
        ]
    },
     {
        eatermon: eatermon[17],
        moves: [
            { name: "Kernel Puff", power: 40, type: eatermonTypes[2].type},
            { name: "Corn Lob", power: 40, type: eatermonTypes[11].type}, //Add Chance Of Paralysis later 
            { name: "Cornhub", power: 60, type: eatermonTypes[0].type},
            { name: "Shuck 'n Blast", power: 40, type: eatermonTypes[2].type},
        ]
    },
    {
        eatermon: eatermon[18],
        moves: [
            { name: "Blue Burst", power: 50, type: eatermonTypes[1].type},
            { name: "Frozen Berry", power: 60, type: eatermonTypes[3].type}, //Add Freezing Effects Later
            { name: "Squishy Berry", power: 80, type: eatermonTypes[6].type},
            { name: "Berry Blast", power: 50, type: eatermonTypes[3].type}, //Also add CHANCE of freezing
        ]
    },
    {
        eatermon: eatermon[19],
        moves: [
            { name: "Feeling At The Pit", power: 100, type: eatermonTypes[2].type},
            { name: "Pit Scooper", power: 40, type: eatermonTypes[7].type}, //Add ability for 1-5 hit chance
            { name: "Pit o' Power", power: 50, type: eatermonTypes[9].type},
            { name: "Avacado Split", power: 40, defense: 40, type: eatermonTypes[2].type},
        ]
    }
];

/*
    * Fire - id[0]
    * Water - id[1]
    * Grass - id[2]
    * Ice - id[3]
    * Normal - id[4]
    * Fighting - id[5]
    * Poison - id[6]
    * Flying - id[7]
    * Crisp - id[8]
    * Ground - id[9]
    * Sticky - id[10]
    * Sweet - id[11]
    * Sour - id[12]
    * Salty - id[13]
    * Dragin - id [14] 
    * Template: { name: "", power: , type: eatermonTypes[].type},
    *   {
        eatermon: eatermon[],
        moves: [
            { name: "", power: , type: eatermonTypes[].type},
            { name: "", power: , type: eatermonTypes[].type},
            { name: "", power: , type: eatermonTypes[].type},
            { name: "", power: , type: eatermonTypes[].type},
        ]
    }
*/

const eatermonLearnableMoves = [
    {
        eatermon: eatermon[0], // Woodle (Grass Type)
        learnableMoves: {
            1: [{ name: "Tackle", power: 10, type: eatermonTypes[2].type }],
            5: [{ name: "Quick Attack", power: 10, type: eatermonTypes[2].type }],
            7: [{ name: "Growth", power: 0, type: eatermonTypes[2].type }],
            10: [{ name: "Leaf Slash", power: 40, type: eatermonTypes[2].type }],
            15: [{ name: "Vine Whip", power: 45, type: eatermonTypes[2].type }],
            20: [{ name: "Razor Leaf", power: 55, type: eatermonTypes[2].type }],
            25: [{ name: "Nature's Blessing", power: 0, type: eatermonTypes[2].type }],
            30: [{ name: "Grassy Terrain", power: 0, type: eatermonTypes[2].type }],
            35: [{ name: "Solar Beam", power: 120, type: eatermonTypes[2].type }],
            40: [{ name: "Synthesis", power: 0, type: eatermonTypes[2].type }],
            45: [{ name: "Leech Seed", power: 0, type: eatermonTypes[2].type }],
            50: [{ name: "Wood Hammer", power: 100, type: eatermonTypes[2].type }],
            55: [{ name: "Forest's Fury", power: 80, type: eatermonTypes[2].type }],
            60: [{ name: "Earthquake", power: 100, type: eatermonTypes[3].type }],
            65: [{ name: "Giga Drain", power: 75, type: eatermonTypes[2].type }],
            70: [{ name: "Leaf Storm", power: 130, type: eatermonTypes[2].type }],
            75: [{ name: "Wood Blast", power: 90, type: eatermonTypes[2].type }],
            80: [{ name: "Acid Spray", power: 40, type: eatermonTypes[6].type }],
            85: [{ name: "Grass Knot", power: 60, type: eatermonTypes[2].type }],
            90: [{ name: "Mega Drain", power: 60, type: eatermonTypes[2].type }],
            95: [{ name: "Leaf Storm", power: 130, type: eatermonTypes[2].type }],
            100: [{ name: "Leaf Blade", power: 70, type: eatermonTypes[2].type }]
        }
    },
    {
        eatermon: eatermon[1], // Tomadoodle (Fire Type)
        learnableMoves: {
            2: [{ name: "Quick Attack", power: 10, type: eatermonTypes[4].type }],
            4: [{ name: "Heat Wave", power: 25, type: eatermonTypes[4].type }],
            10: [{ name: "Flame Burst", power: 40, type: eatermonTypes[4].type }],
            15: [{ name: "Fire Spin", power: 50, type: eatermonTypes[4].type }],
            20: [{ name: "Heat Wave", power: 60, type: eatermonTypes[4].type }],
            30: [{ name: "Ember", power: 20, type: eatermonTypes[4].type }],
            40: [{ name: "Flamethrower", power: 50, type: eatermonTypes[4].type }],
            50: [{ name: "Debug Ember", power: 100, type: eatermonTypes[4].type }],
            60: [{ name: "Lava Plume", power: 40, type: eatermonTypes[4].type }],
            70: [{ name: "Fire Punch", power: 30, type: eatermonTypes[4].type }],
            80: [{ name: "Fire Blast", power: 60, type: eatermonTypes[4].type }],
            90: [{ name: "Inferno", power: 50, type: eatermonTypes[4].type }],
            100: [{ name: "Eruption", power: 70, type: eatermonTypes[4].type }]
        }
    },
    {
        eatermon: eatermon[2], // Druewl (Water Type)
        learnableMoves: {
            1: [{ name: "Snot", power: 15, type: eatermonTypes[6].type }],
            5: [{ name: "Burp", power: 20, type: eatermonTypes[6].type }],
            10: [{ name: "Scratch", power: 10, type: eatermonTypes[6].type }],
            15: [{ name: "Drool", power: 40, type: eatermonTypes[6].type }],
            20: [{ name: "Slime Bubble", power: 25, type: eatermonTypes[6].type }],
            25: [{ name: "Gooey Trap", power: 0, type: eatermonTypes[6].type }],
            30: [{ name: "Acidic Spit", power: 30, type: eatermonTypes[6].type }],
            40: [{ name: "Slime Bomb", power: 45, type: eatermonTypes[6].type }],
            50: [{ name: "Slime Wave", power: 60, type: eatermonTypes[6].type }],
            60: [{ name: "Toxic Slime", power: 55, type: eatermonTypes[7].type }],
            70: [{ name: "Gooey Slash", power: 50, type: eatermonTypes[6].type }],
            80: [{ name: "Slime Shield", power: 0, type: eatermonTypes[6].type }],
            90: [{ name: "Bubble Barrage", power: 35, type: eatermonTypes[6].type }],
            100: [{ name: "Slime Storm", power: 75, type: eatermonTypes[6].type }]
        }
    },
    {
        eatermon: eatermon[3], // Flopper (Ice Type)
        learnableMoves: {
            1: [{ name: "Ice Spear", power: 40, type: eatermonTypes[3].type }],
            5: [{ name: "Swallow", power: 20, type: eatermonTypes[3].type }],
            10: [{ name: "Peck", power: 10, type: eatermonTypes[3].type }],
            15: [{ name: "Frostbite", power: 25, type: eatermonTypes[3].type }],
            20: [{ name: "Blizzard", power: 50, type: eatermonTypes[3].type }],
            30: [{ name: "Ice Punch", power: 40, type: eatermonTypes[3].type }],
            40: [{ name: "Icy Wind", power: 30, type: eatermonTypes[3].type }],
            50: [{ name: "Freeze Dry", power: 60, type: eatermonTypes[3].type }],
            60: [{ name: "Ice Beam", power: 55, type: eatermonTypes[3].type }],
            70: [{ name: "Avalanche", power: 70, type: eatermonTypes[3].type }],
            80: [{ name: "Frost Breath", power: 65, type: eatermonTypes[3].type }],
            90: [{ name: "Glaciate", power: 80, type: eatermonTypes[3].type }],
            100: [{ name: "Hailstorm", power: 90, type: eatermonTypes[3].type }]
        }
    },
    {
        eatermon: eatermon[4], // Poporlation (Fire Type)
        learnableMoves: {
            1: [{ name: "Tears", power: 40, type: eatermonTypes[4].type }],
            5: [{ name: "Fire Punch", power: 30, type: eatermonTypes[4].type }],
            10: [{ name: "Flare", power: 25, type: eatermonTypes[4].type }],
            20: [{ name: "Flame Burst", power: 35, type: eatermonTypes[4].type }],
            30: [{ name: "Heat Wave", power: 50, type: eatermonTypes[4].type }],
            40: [{ name: "Ember", power: 20, type: eatermonTypes[4].type }],
            50: [{ name: "Fire Spin", power: 40, type: eatermonTypes[4].type }],
            60: [{ name: "Inferno", power: 50, type: eatermonTypes[4].type }],
            70: [{ name: "Fire Blast", power: 60, type: eatermonTypes[4].type }],
            80: [{ name: "Blaze Kick", power: 45, type: eatermonTypes[4].type }],
            90: [{ name: "Eruption", power: 70, type: eatermonTypes[4].type }],
            100: [{ name: "Lava Plume", power: 80, type: eatermonTypes[4].type }]
        }
    },
    {
        eatermon: eatermon[5], // BagOh (Normal Type)
        learnableMoves: {
            1: [{ name: "Tackle", power: 10, type: eatermonTypes[0].type }],
            5: [{ name: "Quick Attack", power: 10, type: eatermonTypes[0].type }],
            10: [{ name: "Growl", power: 0, type: eatermonTypes[0].type }],
            15: [{ name: "Body Slam", power: 40, type: eatermonTypes[0].type }],
            20: [{ name: "Hyper Beam", power: 120, type: eatermonTypes[0].type }],
            30: [{ name: "Take Down", power: 45, type: eatermonTypes[0].type }],
            40: [{ name: "Quick Attack", power: 20, type: eatermonTypes[0].type }],
            50: [{ name: "Return", power: 50, type: eatermonTypes[0].type }],
            60: [{ name: "Bite", power: 40, type: eatermonTypes[0].type }],
            70: [{ name: "Crunch", power: 50, type: eatermonTypes[0].type }],
            80: [{ name: "Flail", power: 70, type: eatermonTypes[0].type }],
            90: [{ name: "Hyper Voice", power: 80, type: eatermonTypes[0].type }],
            100: [{ name: "Explosion", power: 100, type: eatermonTypes[0].type }]
        }
    },
    {
        eatermon: eatermon[6], // Coreange (Water Type)
        learnableMoves: {
            1: [{ name: "Tears", power: 40, type: "Water" }],
            5: [{ name: "Water Pulse", power: 50, type: "Water" }],
            10: [{ name: "Aqua Tail", power: 30, type: "Water" }],
            20: [{ name: "Water Gun", power: 25, type: "Water" }],
            30: [{ name: "Hydro Pump", power: 35, type: "Water" }],
            40: [{ name: "Bubble", power: 20, type: "Water" }],
            50: [{ name: "Surf", power: 40, type: "Water" }],
            60: [{ name: "Blizzard", power: 45, type: "Water" }],
            70: [{ name: "Rain Dance", power: 50, type: "Water" }],
            80: [{ name: "Whirlpool", power: 55, type: "Water" }],
            90: [{ name: "Hydro Cannon", power: 60, type: "Water" }],
            100: [{ name: "Water Spout", power: 70, type: "Water" }]
        }
    },
    {
        eatermon: eatermon[7], // PanCook (Fire Type)
        learnableMoves: {
            1: [{ name: "Tears", power: 40, type: "Fire" }],
            5: [{ name: "Lava Plume", power: 40, type: "Fire" }],
            10: [{ name: "Flame Burst", power: 35, type: "Fire" }],
            20: [{ name: "Flare", power: 25, type: "Fire" }],
            30: [{ name: "Fire Spin", power: 40, type: "Fire" }],
            40: [{ name: "Ember", power: 20, type: "Fire" }],
            50: [{ name: "Flame Kick", power: 35, type: "Fire" }],
            60: [{ name: "Blaze Kick", power: 45, type: "Fire" }],
            70: [{ name: "Inferno", power: 50, type: "Fire" }],
            80: [{ name: "Heat Wave", power: 55, type: "Fire" }],
            90: [{ name: "Fire Blast", power: 60, type: "Fire" }],
            100: [{ name: "Eruption", power: 70, type: "Fire" }]
        }
    },
    {
        eatermon: eatermon[8], // ChrisP Bacon (Fire Type)
        learnableMoves: {
            1: [{ name: "Tears", power: 40, type: "Fire" }],
            5: [{ name: "Blaze Kick", power: 45, type: "Fire" }],
            10: [{ name: "Eruption", power: 60, type: "Fire" }],
            20: [{ name: "Flame Burst", power: 35, type: "Fire" }],
            30: [{ name: "Fire Punch", power: 30, type: "Fire" }],
            40: [{ name: "Flare", power: 25, type: "Fire" }],
            50: [{ name: "Fire Blast", power: 50, type: "Fire" }],
            60: [{ name: "Heat Wave", power: 55, type: "Fire" }],
            70: [{ name: "Flame Kick", power: 45, type: "Fire" }],
            80: [{ name: "Lava Plume", power: 50, type: "Fire" }],
            90: [{ name: "Inferno", power: 60, type: "Fire" }],
            100: [{ name: "Fire Storm", power: 80, type: "Fire" }]
        }
    },
    {
        eatermon: eatermon[9], // Protcluker (Chicken Type)
        learnableMoves: {
            1: [{ name: "Flamin' Chickin", power: 40, type: "Normal" }],
            5: [{ name: "Protein Bulk", power: 20, type: "Normal" }],
            10: [{ name: "Bone Recycle", power: 10, type: "Normal" }],
            15: [{ name: "Chicken Peck", power: 15, type: "Normal" }],
            20: [{ name: "Wing Attack", power: 30, type: "Flying" }],
            25: [{ name: "Dusting", power: 20, type: "Fairy" }],
            30: [{ name: "Feather Dust", power: 30, type: "Fairy" }],
            40: [{ name: "Roast", power: 40, type: "Fire" }],
            50: [{ name: "Feather Dash", power: 40, type: "Fairy" }],
            60: [{ name: "Bone Storm", power: 50, type: "Flying" }],
            70: [{ name: "Chickin' Punch", power: 60, type: "Fairy" }],
            80: [{ name: "Wingstorm", power: 65, type: "Flying" }],
            90: [{ name: "Avian Talons", power: 70, type: "Fairy" }],
            100: [{ name: "Inferno Wing", power: 80, type: "Fire" }]
        }
    }    
]


