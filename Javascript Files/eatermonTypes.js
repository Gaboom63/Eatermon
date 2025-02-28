const eatermonTypes =  [
    {
        type: "Fire",
        weak: ["Water"],
        strong: ["Grass", "Ice"]
    },
    {
        type: "Water",
        weak: ["Grass"],
        strong: ["Fire"]
    },
    {
        type: "Grass",
        weak: ["Fire"],
        strong: ["Water"]
    }, 
    {
        type: "Ice",
        weak: ["Fire"],
        strong: ["Grass"]
    },
    {
        type: "Normal",
        weak: ["Fighting"],
        strong: []
    },
    {
        type: "Fighting",
        weak: [],
        strong: ["Normal"]
    },
    {
        type: "Poison",
        weak: [],
        strong: []
    },
    {
        type: "Flying",
        weak: [],
        strong: []
    }
]


