const eatermonTypes =  [
    {
        type: "Fire",
        weak: ["Water"],
        strong: ["Grass", "Ice"],
        noEffect: []
    },
    {
        type: "Water",
        weak: ["Grass"],
        strong: ["Fire"],
        noEffect: []
    },
    {
        type: "Grass",
        weak: ["Fire"],
        strong: ["Water"],
        noEffect: []
    }, 
    {
        type: "Ice",
        weak: ["Fire"],
        strong: ["Grass"],
        noEffect: []
    },
    {
        type: "Normal",
        weak: ["Fighting"],
        strong: [],
        noEffect: []
    },
    {
        type: "Fighting",
        weak: [],
        strong: ["Normal"],
        noEffect: []
    },
    {
        type: "Poison",
        weak: [],
        strong: [],
        noEffect: []
    },
    {
        type: "Flying",
        weak: [],
        strong: [],
        noEffect: []
    },
    {
        type: "Crisp",
        weak: ["Water", "Fire"],
        strong: ["Fighting"],
        noEffect: ["Poison"]
    },
]


