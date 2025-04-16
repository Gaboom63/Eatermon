const eatermonTypes =  [
    {
        id: 0, 
        type: "Fire",
        weak: ["Water"],
        strong: ["Grass", "Ice"],
        noEffect: []
    },
    {
        id: 1, 
        type: "Water",
        weak: ["Grass"],
        strong: ["Fire"],
        noEffect: []
    },
    {
        id: 2, 
        type: "Grass",
        weak: ["Fire"],
        strong: ["Water"],
        noEffect: []
    }, 
    {
        id: 3,
        type: "Ice",
        weak: ["Fire"],
        strong: ["Grass"],
        noEffect: []
    },
    {
        id: 4, 
        type: "Normal",
        weak: ["Fighting"],
        strong: [],
        noEffect: []
    },
    {
        id: 5,
        type: "Fighting",
        weak: [],
        strong: ["Normal"],
        noEffect: []
    },
    {
        id: 6, 
        type: "Poison",
        weak: [],
        strong: [], 
        noEffect: []
    },
    {
        id: 7, 
        type: "Flying",
        weak: [],
        strong: [],
        noEffect: []
    },
    {
        id: 8, 
        type: "Crisp",
        weak: ["Water", "Fire"],
        strong: ["Fighting"],
        noEffect: ["Poison"]
    },
    {
        id: 9, 
        type: "Ground",
        weak: ["Water", "Fighting", "Ice", "Grass"],
        strong: ["Flying", "Fire"],
        noEffect: []
    },
    {
        id: 10, 
        type: "Sticky",
        weak: ["Water"],
        strong: ["Ground","Flying"],
        noEffect: []
    },
    {
        id: 11,
        type: "Sweet",
        weak: ["Fire", "Sour", "Fighting"],
        strong: ["Salty", "Normal"]
    },
    {
        id: 12,
        type: "Sour",
        weak: ["Water", "Fighting", "Sour"],
        strong: ["Sweet"]
    },
    {
        id: 13,
        type: "Salty",
        weak: ["Grass", "Fighting", "Sweet"],
        strong: ["Sour"]
    },
    {
        id: 14, 
        type: "Dragon",
        weak: ["Sweet", "Ice"],
        strong: ["Sticky", "Water"]
    }
    
]

const typeColors = {
  Fire: "#FF6B6B",
  Water: "#4D9DE0",
  Grass: "#4CAF50",
  Ice: "#9EEFE5",
  Normal: "#C0C0C0",
  Fighting: "#FF8C42",
  Poison: "#AA00FF",
  Flying: "#A2D2FF",
  Crisp: "#F2C57C",
  Ground: "#A0522D",
  Sticky: "#B5E48C",
  Sweet: "#FFD6E0",
  Sour: "#FFE066",
  Salty: "#D6D6D6",
  Dragon: "#7B2CBF"
};


function getMoveButtonStyle(move) {
  const color = typeColors[move?.type] || "#DDD";
  return `background-color: ${color}; border: none; padding: 10px 16px; margin: 6px; border-radius: 10px; font-weight: bold; width: 120px;`;
}


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
*/